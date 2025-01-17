import { ConvexError, v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import OpenAI from "openai";

const modelName = "gpt-4o";
const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) return null;

    const document = await ctx.db.get(args.documentId);

    if (!document || document.tokenIdentifier !== userToken) return null;

    return {
      ...document,
      documentUrl: await ctx.storage.getUrl(document.storageId),
    };
  },
});

export const getDocuments = query({
  handler: async (ctx) => {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userToken) return [];

    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", userToken)
      )
      .collect();
  },
});

export const createDocument = mutation({
  args: { title: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userToken) throw new Error("Not authenticated");

    await ctx.db.insert("documents", {
      title: args.title,
      storageId: args.storageId,
      tokenIdentifier: userToken,
    });
  },
});

export const aksQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) throw new ConvexError("Not authenticated");

    const document = await ctx.runQuery(api.documents.getDocument, {
      documentId: args.documentId,
    });

    if (!document) throw new ConvexError("Document not found");

    const file = await ctx.storage.get(document.storageId);

    if (!file) throw new ConvexError("File not found");

    const text = await file.text();

    console.log({ text });

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [
          { role: "system", content: `Here is a text file: ${text}` },
          {
            role: "user",
            content: `Please answer the question ${args.question}`,
          },
        ],
        model: modelName,
        // temperature: 1,
        // max_tokens: 4096,
        // top_p: 1,
      });

    return chatCompletion.choices[0].message.content;
  },
});
