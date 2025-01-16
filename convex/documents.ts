import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
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
  args: { title: v.string(), storageId: v.string() },
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
