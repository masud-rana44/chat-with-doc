import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import QuestionForm from "./question-form";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chats.getChatsForDocument, {
    documentId,
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 overflow-y-auto space-y-3">
        <div className="bg-slate-900 rounded p-3">
          AI: Ask any question using AI about this document below:
        </div>
        {chats?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                "bg-slate-800 text-right": chat.isHuman,
                "bg-slate-950": !chat.isHuman,
              },
              "rounded p-4 whitespace-pre-line"
            )}
          >
            {chat.isHuman ? "YOU" : "AI"}: {chat.text}
          </div>
        ))}
      </div>

      <QuestionForm documentId={documentId} />
    </div>
  );
}
