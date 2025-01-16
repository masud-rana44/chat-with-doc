import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
