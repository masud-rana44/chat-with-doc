import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import UploadDocumentForm from "./upload-document-form";
import { btnIconStyles, btnStyles } from "@/styles/styles";

export default function UploadDocument({
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
          <Upload className={btnIconStyles} /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over the future.
          </DialogDescription>
        </DialogHeader>

        <UploadDocumentForm
          onUpload={() => {
            setIsOpen(false);
            toast({
              title: "Document uploaded",
              description: "The document has been uploaded successfully.",
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
