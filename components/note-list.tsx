"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import CreateNote from "./create-note";
import { useQuery } from "convex/react";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";

export default function NoteList() {
  const params = useParams();
  const router = useRouter();
  const notes = useQuery(api.notes.getNotes);

  useEffect(() => {
    if (notes && notes.length > 0 && !params.noteId) {
      router.push(`/dashboard/notes/${notes[0]._id}`);
    }
  }, [notes, params.noteId, router]);

  if (!notes)
    return (
      <div className="space-y-2 min-w-[420px]">
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
    <ul className="space-y-2 w-[420px] h-[calc(100vh-300px)] overflow-y-auto">
      {notes.map((note) => (
        <li key={note._id}>
          <Link
            href={`/dashboard/notes/${note._id}`}
            className={cn("px-4 py-2 rounded block border", {
              "border-primary-foreground bg-slate-900":
                params.noteId === note._id,
            })}
          >
            <h3 className="mb-2">{note.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {note.text.slice(0, 90)}
              {note.text.length > 90 && "..."}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
