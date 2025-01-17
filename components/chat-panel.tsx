import React, { FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.aksQuestion);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const message = formData.get("message") as string;

    const result = await askQuestion({ question: message, documentId });
    console.log({ result });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="overflow-y-auto flex-1">
        <div>THis is a chat</div>
        <div>THis is a chat</div>
        <div>THis is a chat</div>
        <div>THis is a chat</div>
        <div>THis is a chat</div>
        <div>THis is a chat</div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input required className="flex-1" name="message" type="text" />
        <Button>Send</Button>
      </form>
    </div>
  );
}
