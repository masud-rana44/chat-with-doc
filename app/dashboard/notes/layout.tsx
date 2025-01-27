import CreateNote from "@/components/create-note";
import NoteList from "@/components/note-list";
import React, { ReactNode } from "react";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold">My Notes</h1>
        <CreateNote />
      </div>

      <div className="flex gap-20">
        <NoteList />
        <div>{children}</div>
      </div>
    </div>
  );
}
