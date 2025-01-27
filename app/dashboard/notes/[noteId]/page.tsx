"use client";

import DeleteNoteButton from "@/components/delete-note-button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

export default function NoteIdPage() {
  const params = useParams();
  const noteId = params.noteId as Id<"notes">;

  const note = useQuery(api.notes.getNote, { noteId });

  if (!note)
    return (
      <div className="w-[800px]">
        <Skeleton className="h-[600px] w-full" />
      </div>
    );

  return (
    <div className="w-[800px] flex flex-col p-4 border space-y-2 rounded bg-slate-900">
      <DeleteNoteButton noteId={noteId} />

      <p className=" whitespace-pre-line">{note?.text}</p>
    </div>
  );
}
