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

export default function DeleteDocumentButton({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteDocument({ documentId });
    setIsLoading(false);
    setIsOpen(false);
    toast({
      title: "Document deleted",
      description: "The document has been deleted successfully.",
      variant: "destructive",
    });
    router.push("/dashboard/documents");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={btnStyles}>
          <Trash2 className={btnIconStyles} />
          <span className="hidden lg:block">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this document?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
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
