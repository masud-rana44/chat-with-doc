import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import SubmitButton from "./submit-button";
import { toast } from "@/hooks/use-toast";

export default function DeleteNoteButton({ noteId }: { noteId: Id<"notes"> }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const deleteNote = useMutation(api.notes.deleteNote);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteNote({ noteId });
    setIsLoading(false);
    setIsOpen(false);
    toast({
      title: "Note deleted",
      description: "The note has been deleted successfully.",
      variant: "destructive",
    });
    router.push("/dashboard/notes");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild className="self-end">
        <Button variant="destructive" className={btnStyles}>
          <Trash2 className={btnIconStyles} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this note?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SubmitButton
            onClick={handleDelete}
            isSubmitting={isLoading}
            submittingLabel="Deleting"
          >
            Delete
          </SubmitButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
