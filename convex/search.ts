import { embedText } from "./notes";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { action } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const searchAction = action({
  args: { query: v.string() },
  async handler(ctx, args) {
    const userToken = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userToken) {
      throw new ConvexError("Before search you must need to be authentication");
    }

    const embedding = await embedText(args.query);

    const notesResult = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 5,
      filter: (q) => q.eq("tokenIdentifier", userToken),
    });

    const documentsResult = await ctx.vectorSearch(
      "documents",
      "by_embedding",
      {
        vector: embedding,
        limit: 5,
        filter: (q) => q.eq("tokenIdentifier", userToken),
      }
    );

    const records: (
      | { type: "note"; score: number; record: Doc<"notes"> }
      | {
          type: "document";
          score: number;
          record: Doc<"documents">;
        }
    )[] = [];

    await Promise.all(
      notesResult.map(async (result) => {
        const note = await ctx.runQuery(api.notes.getNote, {
          noteId: result._id,
        });

        if (!note) return;

        records.push({
          type: "note",
          score: result._score,
          record: note,
        });
      })
    );

    await Promise.all(
      documentsResult.map(async (result) => {
        const document = await ctx.runQuery(api.documents.getDocument, {
          documentId: result._id,
        });

        if (!document) return;

        records.push({
          type: "document",
          score: result._score,
          record: document,
        });
      })
    );

    return records.sort((a, b) => b.score - a.score);
  },
});
