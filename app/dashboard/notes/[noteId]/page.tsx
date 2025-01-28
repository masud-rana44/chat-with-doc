"use client";

import React from "react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteNoteButton from "@/components/delete-note-button";

export default function NoteIdPage() {
  const params = useParams();
  const noteId = params.noteId as Id<"notes">;

  const note = useQuery(api.notes.getNote, { noteId });

  if (!note)
    return (
      <div className="flex-1 max-w-[800px]">
        <Skeleton className="h-[calc(100vh-240px)] w-full" />
      </div>
    );

  return (
    <div className="flex-1 max-w-[800px] h-[calc(100vh-240px)] flex flex-col p-4 border space-y-8 rounded bg-slate-950">
      <div className="flex justify-between gap-10">
        {note.title ? (
          <h2 className="text-2xl">{note.title}</h2>
        ) : (
          <Skeleton className="h-9 w-full" />
        )}
        <DeleteNoteButton noteId={noteId} />
      </div>

      <p className="whitespace-pre-line overflow-y-auto">{note?.text}</p>
    </div>
  );
}
