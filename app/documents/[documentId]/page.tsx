"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

export default function DocumentIdPage() {
  const params = useParams();
  const documentId = params.documentId as Id<"documents">;

  const document = useQuery(api.documents.getDocument, {
    documentId,
  });

  if (!document)
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-medium">
          You don&apos;t have access to view this document.
        </h2>
      </div>
    );

  return (
    <main className="container mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold">{document.title}</h1>

      <div className="flex gap-12">
        <div className="bg-gray-900 p-4 rounded flex-1 h-[600px]">
          {document.documentUrl && (
            <iframe src={document.documentUrl} className="w-full h-full" />
          )}
        </div>

        <div className="bg-gray-900 w-[450px]"></div>
      </div>
    </main>
  );
}
