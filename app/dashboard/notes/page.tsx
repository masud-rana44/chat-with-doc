"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);

  if (notes?.length === 0) return null;

  return (
    <div className="container mx-auto px-6 sm:px-0">
      <p>Please select a note.</p>
    </div>
  );
}
