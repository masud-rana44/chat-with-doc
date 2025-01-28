import OpenAI from "openai";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

const modelName = "gpt-4o";
const token = process.env.GITHUB_TOKEN;
const maxTokenLength = 6000;
const endpoint = "https://models.inference.ai.azure.com";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

export async function embedText(text: string) {
  const embeddings = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return embeddings.data[0].embedding;
}

export const getNotes = query({
  async handler(ctx) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) return [];

    return await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", userToken)
      )
      .order("desc")
      .collect();
  },
});

export const getNote = query({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) {
      throw new ConvexError("You must be logged in to get a note");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.tokenIdentifier !== userToken) return null;

    return note;
  },
});

export const createNote = mutation({
  args: { text: v.string() },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) {
      throw new ConvexError("You must be logged in to create a note");
    }

    const noteId = await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: userToken,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.notes.generateNoteTitleAndEmbedding,
      {
        noteId,
      }
    );

    return noteId;
  },
});

export const generateNoteTitleAndEmbedding = internalAction({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    const note = await ctx.runQuery(internal.notes.getNoteInternal, {
      noteId: args.noteId,
    });

    if (!note) {
      throw new ConvexError("Note not found.");
    }

    const truncatedText = note.text.slice(0, maxTokenLength);

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You area an AI Assistant specialized in analyzing text documents. Provide a short title under 60 characters based on the provided text document.",
          },
          {
            role: "user",
            content: `Here is the text document: ${truncatedText}`,
          },
        ],
        model: modelName,
        temperature: 0.3,
        max_tokens: maxTokenLength,
        top_p: 1,
      });

    const title = chatCompletion.choices[0].message.content ?? "Untitled";
    const embedding = await embedText(note.text.slice(0, maxTokenLength));

    await ctx.runMutation(internal.notes.updateNoteTitleAndEmbedding, {
      noteId: args.noteId,
      title: title.replace(/"/g, ""),
      embedding,
    });
  },
});

export const updateNoteTitleAndEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    title: v.string(),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, {
      title: args.title,
      embedding: args.embedding,
    });
  },
});

export const getNoteInternal = internalQuery({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    return await ctx.db.get(args.noteId);
  },
});

export const deleteNote = mutation({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) {
      throw new ConvexError("You must be logged in to delete a note.");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.tokenIdentifier !== userToken) {
      throw new ConvexError("You don't have permission to delete this node.");
    }

    await ctx.db.delete(args.noteId);
  },
});
