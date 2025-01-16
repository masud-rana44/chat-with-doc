import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDocuments = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});

export const createDocument = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    console.log(args);
    await ctx.db.insert("documents", { title: "Hello" });
  },
});
