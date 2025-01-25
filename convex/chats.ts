import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getChatsForDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) {
      return [];
    }

    return await ctx.db
      .query("chats")
      .withIndex("by_documentId_tokenIdentifier", (q) =>
        q.eq("documentId", args.documentId).eq("tokenIdentifier", userToken)
      )
      .collect();
  },
});

export const createChatRecord = mutation({
  args: {
    documentId: v.id("documents"),
    text: v.string(),
    isHuman: v.boolean(),
    tokenIdentifier: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("chats", {
      documentId: args.documentId,
      isHuman: args.isHuman,
      text: args.text,
      tokenIdentifier: args.tokenIdentifier,
    });
  },
});
