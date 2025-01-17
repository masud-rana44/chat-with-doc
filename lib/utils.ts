import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import XLSX from "xlsx";
import pptxParser from "pptx-parser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface UploadFile {
  arrayBuffer: () => Promise<ArrayBuffer>;
  contentType?: string;
  fileName: string;
}

export async function extractTextFromFile(file: UploadFile): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileType = file.contentType || file.fileName.split(".").pop();

  let extractedText = "";

  try {
    switch (fileType) {
      case "pdf":
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text;
        break;

      case "docx":
        const docxData = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = docxData.value;
        break;

      case "xlsx":
      case "xls":
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });
        workbook.SheetNames.forEach((sheet) => {
          const rows = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet]);
          extractedText += rows;
        });
        break;

      case "pptx":
        const sliders = await pptxParser(fileBuffer);
        sliders.forEach((slide) => {
          extractedText += slide.text;
        });
        break;
    }
  } catch {}
}
