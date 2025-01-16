import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import CreateDocumentForm from "./create-document-form";
import { useState } from "react";

export default function CreateDocument() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Upload Document</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over the future.
          </DialogDescription>
        </DialogHeader>

        <CreateDocumentForm onUpload={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
