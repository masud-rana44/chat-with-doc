"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import ChatPanel from "@/components/chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentIdPage() {
  const params = useParams();
  const documentId = params.documentId as Id<"documents">;

  const document = useQuery(api.documents.getDocument, {
    documentId,
  });

  if (!document)
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-8 w-[600px]" />

        <div className="mt-10 flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>

        <Skeleton className="mt-2 h-[600px] w-full" />
      </div>
    );

  return (
    <main className="container mx-auto py-10 space-y-8 max-h-[calc(100vh-72px)]">
      <h1 className="text-4xl font-bold">{document.title}</h1>

      <Tabs defaultValue="document" className="max-w-[1000px]">
        <TabsList>
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="document">
          <div className="bg-gray-900 p-4 rounded flex-1 h-[700px]">
            {document.documentUrl && (
              <iframe src={document.documentUrl} className="w-full h-full" />
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="chat"
          className="bg-gray-900 rounded p-4 h-[calc(100vh-274px)]"
        >
          <ChatPanel documentId={documentId} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
