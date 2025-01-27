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
      .order("desc")
      .collect();
  },
});

export const getNote = query({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) return null;

    return ctx.db.get(args.noteId);
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

export const deleteNote = mutation({
  args: { noteId: v.id("notes") },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) return null;

    return await ctx.db.delete(args.noteId);
  },
});
