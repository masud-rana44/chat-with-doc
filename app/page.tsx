"use client";

import DocumentCard from "@/components/document-card";
import UploadDocument from "@/components/upload-document";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <div className="container mx-auto">
      <div className="py-20 flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Documents</h1>

        <UploadDocument />
      </div>

      <div className="grid grid-cols-4 gap-8">
        {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
      </div>
    </div>
  );
}
