import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getNotes = query({
  async handler(ctx) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) return [];

    return await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", userToken)
      )
      .collect();
  },
});

export const createNote = mutation({
  args: { text: v.string() },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) throw new Error("Not authenticated");

    return await ctx.db.insert("notes", {
      text: args.text,
      tokenIdentifier: userToken,
    });
  },
});
