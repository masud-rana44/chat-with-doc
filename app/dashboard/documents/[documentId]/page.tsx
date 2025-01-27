"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ChatPanel from "@/components/chat-panel";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { btnIconStyles, btnStyles } from "@/styles/styles";

export default function DocumentIdPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.documentId as Id<"documents">;

  const document = useQuery(api.documents.getDocument, {
    documentId,
  });
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleDelete = async () => {
    await deleteDocument({ documentId });
    router.push("/");
  };

  if (!document)
    return (
      <div className="container mx-auto">
        <Skeleton className="h-8 w-[600px]" />

        <div className="mt-10 flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>

        <Skeleton className="mt-2 h-screen max-h-[calc(100vh-272px)] max-w-[1000px]" />
      </div>
    );

  return (
    <main className="container px-6 sm:px-0 mx-auto space-y-8 max-h-[calc(100vh-172px)]">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{document.title}</h1>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className={btnStyles}>
              <Trash2 className={btnIconStyles} />
              <span>Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this document?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                document.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

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
