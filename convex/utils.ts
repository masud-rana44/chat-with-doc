// import mammoth from "mammoth";
// import { getDocument } from "pdfjs-dist";
// // import XLSX from "xlsx";
// // import pptxParser from "pptx-parser";
// import { fileTypeFromBuffer } from "file-type";

// export interface FileWithMetadata extends Blob {
//   fileName?: string;
//   contentType?: string;
// }

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
//       case "pdf":
//         const pdfDoc = await getDocument(fileBuffer).promise;
//         for (let i = 1; i <= pdfDoc.numPages; i++) {
//           const page = await pdfDoc.getPage(i);
//           const textContent = await page.getTextContent();
//           extractedText += textContent.items
//             .map((item) => ("str" in item ? item.str : ""))
//             .join(" ");
//         }
//         break;

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
//         break;

//       default:
//         throw new Error(`Unsupported file type: ${fileType}`);
//     }
//   } catch (error) {
//     console.log("Error extracting text: ", error);
//     throw new Error("Failed to extract text from the file");
//   }

//   return extractedText;
// }
