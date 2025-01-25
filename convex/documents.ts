import OpenAI from "openai";
import { internal } from "./_generated/api";
import { ConvexError, v } from "convex/values";
import {
  action,
  internalQuery,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
// import mammoth from "mammoth";
// import pdfParse from "pdf-parse";
// import XLSX from "xlsx";
// import pptxParser from "pptx-parser";
// import { fileTypeFromBuffer } from "file-type";
import { Id } from "./_generated/dataModel";

const modelName = "gpt-4o";
const token = process.env.GITHUB_TOKEN;
const maxTokenLength = 6000;
const endpoint = "https://models.inference.ai.azure.com";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

export async function hasAccessDocument(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) return null;

  const document = await ctx.db.get(documentId);

  if (!document || document.tokenIdentifier !== userId) return null;

  return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccessDocument(ctx, args.documentId);
  },
});

export interface FileWithMetadata extends Blob {
  fileName?: string;
  contentType?: string;
}

// export async function extractTextFromFile(
//   file: FileWithMetadata
// ): Promise<string> {
//   const fileBuffer = Buffer.from(await file.arrayBuffer());
//   const detectedFileType = await fileTypeFromBuffer(fileBuffer);
//   const fileType =
//     detectedFileType?.ext ||
//     file.contentType ||
//     file.fileName?.split(".").pop();

//   let extractedText = "";

//   try {
//     switch (fileType) {
//       // case "pdf":
//       //   const pdfData = await pdfParse(fileBuffer);
//       //   extractedText = pdfData.text;
//       //   console.log({ extractedText });
//       //   break;

//       case "docx":
//         const docxData = await mammoth.extractRawText({ buffer: fileBuffer });
//         extractedText = docxData.value;
//         break;

//       // TODO: Add support for doc

//       // case "xlsx":
//       // case "xls":
//       //   const workbook = XLSX.read(fileBuffer, { type: "buffer" });
//       //   workbook.SheetNames.forEach((sheet) => {
//       //     const rows = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet]);
//       //     extractedText += rows;
//       //   });
//       //   break;

//       // case "pptx":
//       //   const sliders = await pptxParser(fileBuffer);
//       //   sliders.forEach((slide) => {
//       //     extractedText += slide.text;
//       //   });
//       //   break;

//       case "txt":
//         extractedText = fileBuffer.toString("utf-8");

//       default:
//         throw new Error(`Unsupported file type: ${fileType}`);
//     }
//   } catch (error) {
//     console.log("Error extracting text: ", error);
//     throw new Error("Failed to extract text from the file");
//   }

//   return extractedText;
// }

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const accessObj = await hasAccessDocument(ctx, args.documentId);

    if (!accessObj) return null;

    return {
      ...accessObj.document,
      documentUrl: await ctx.storage.getUrl(accessObj.document.storageId),
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
    const accessObj = await ctx.runQuery(
      internal.documents.hasAccessToDocumentQuery,
      { documentId: args.documentId }
    );

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    const file = await ctx.storage.get(accessObj.document.storageId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    const text = await file.text();
    const truncatedText = text.slice(0, maxTokenLength);

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You area an AI Assistant specialized in analyzing text documents. Provide accurate answers based only on the provided text.",
          },
          {
            role: "user",
            content: `Here is the text document: ${truncatedText}\n\nAnswer this question: ${args.question}. If the answer isn't in the text, reply, "The answer is not provided in the text.`,
          },
        ],
        model: modelName,
        temperature: 0.3,
        max_tokens: maxTokenLength,
        top_p: 1,
      });

    // Create chat document for Human
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: accessObj.userId,
    });

    const response =
      chatCompletion.choices[0].message.content ??
      "Could not generate a response";

    // Create chat document for AI
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: accessObj.userId,
    });

    return response;
  },
});
