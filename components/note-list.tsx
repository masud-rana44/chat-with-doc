"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CreateNote from "./create-note";

export default function NoteList() {
  const params = useParams();
  const notes = useQuery(api.notes.getNotes);

  if (!notes)
    return (
      <div className="space-y-2 min-w-[280px]">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );

  if (notes.length === 0) {
    return (
      <div className="py-12 flex flex-col justify-center items-center gap-8 w-full">
        <Image
          src="/documents.svg"
          width="200"
          height="200"
          alt="a picture of a girl holding documents"
        />
        <h2 className="text-2xl text-muted-foreground">
          You have no notes yet
        </h2>
        <CreateNote isEmptyState />
      </div>
    );
  }

  return (
    <ul className="space-y-2 w-[280px]">
      {notes.map((note) => (
        <li key={note._id}>
          <Link
            href={`/dashboard/notes/${note._id}`}
            className={cn("px-4 py-2 rounded block border line-clamp-2", {
              "border-primary-foreground bg-slate-900":
                params.noteId === note._id,
            })}
          >
            {note.text.slice(0, 50)}
            {note.text.length > 50 && "..."}
          </Link>
        </li>
      ))}
    </ul>
  );
}
