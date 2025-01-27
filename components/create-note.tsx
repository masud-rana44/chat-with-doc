"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import CreateNoteForm from "./create-note-form";

export default function CreateNote({
  isEmptyState,
}: {
  isEmptyState?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isEmptyState ? "outline" : "default"}
          className={btnStyles}
        >
          <Plus className={btnIconStyles} /> Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over the future.
          </DialogDescription>
        </DialogHeader>

        <CreateNoteForm onCreate={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
