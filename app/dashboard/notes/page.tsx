"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);

  if (notes?.length === 0) return null;

  return (
    <div className="w-[800px]">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}
