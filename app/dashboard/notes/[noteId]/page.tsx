"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Markdown from "react-markdown";
import { toast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import UpdateNote from "@/components/update-note";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import DeleteNoteButton from "@/components/delete-note-button";

export default function NoteIdPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.noteId as Id<"notes">;
  const [isCreating, setIsCreating] = React.useState(false);

  const note = useQuery(api.notes.getNote, { noteId });
  const createDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const documents = useQuery(api.documents.getDocuments);

  async function onChat() {
    if (!note || !note.title)
      return toast({
        title: "Please wait until note title is generated",
      });

    const isChatExists = documents?.find((doc) => doc.title === note.title);
    if (isChatExists) {
      return router.push(`/dashboard/documents/${isChatExists._id}?tab=chat`);
    }

    try {
      setIsCreating(true);

      // Create a text file from the content
      const fileName = `${note.title.replace(/\s+/g, "_")}.txt`;
      const file = new File([note.text], fileName, {
        type: "text/plain",
      });

      // Generate upload URL
      const url = await generateUploadUrl();

      // Upload the file
      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();

      // Create document record
      const documentId = await createDocument({
        title: note.title,
        storageId,
      });

      // Redirect to the document page
      router.push(`/dashboard/documents/${documentId}?tab=chat`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  }

  if (!note)
    return (
      <div className="flex-1 max-w-[800px]">
        <Skeleton className="h-[calc(100vh-200px)] lg:h-[calc(100vh-240px)] w-full" />
      </div>
    );

  return (
    <div className="flex-1 max-w-[800px] sm:h-[calc(100vh-200px)] lg:h-[calc(100vh-240px)] flex flex-col p-4 border space-y-8 rounded bg-slate-50 dark:bg-slate-950">
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        {note.title ? (
          <h2 className="text-2xl">{note.title}</h2>
        ) : (
          <Skeleton className="h-9 w-full" />
        )}

        <div className="flex items-center gap-2">
          <UpdateNote note={note} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  disabled={isCreating}
                  onClick={onChat}
                >
                  <MessageCircle />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DeleteNoteButton noteId={noteId} />
        </div>
      </div>

      <Markdown className="whitespace-pre-line overflow-y-auto">
        {note?.text}
      </Markdown>
    </div>
  );
}
