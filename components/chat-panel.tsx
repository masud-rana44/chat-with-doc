import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import QuestionForm from "./question-form";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "./ui/skeleton";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const user = useUser();
  const chats = useQuery(api.chats.getChatsForDocument, {
    documentId,
  });

  const avatar = (isHuman: boolean) => {
    return isHuman ? (
      <Image
        height={24}
        width={24}
        className="rounded-full"
        src={user.user?.imageUrl || "/placeholder-avatar.png"}
        alt={`${user.user?.firstName} ${user.user?.lastName}`}
      />
    ) : (
      <div className="bg-slate-200 rounded-full p-1">
        <Image src="/ai-icon.png" width={20} height={20} alt="AI Icon" />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 overflow-y-auto flex flex-col space-y-3">
        <div className="bg-slate-900 p-3 flex gap-3">
          <span>{avatar(false)}</span>
          <p className="flex-1">
            Ask any question using AI about this document:
          </p>
        </div>
        {/* If not chats, added loading skeleton */}
        {!chats &&
          Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className={cn(
                {
                  "bg-slate-800 self-end py-2 px-3 h-8 ": idx % 2 == 0,
                  "bg-slate-950 p-4 h-20": idx % 2 == 1,
                },
                "w-2/3"
              )}
            />
          ))}

        {chats &&
          chats?.map((chat) => (
            <div
              key={chat._id}
              className={cn(
                {
                  "bg-slate-800 text-right w-fit self-end py-2 px-3":
                    chat.isHuman,
                  "bg-slate-950 p-4": !chat.isHuman,
                },
                "rounded whitespace-pre-line flex items-start gap-2"
              )}
            >
              {!chat.isHuman && avatar(false)}
              <span className="flex-1">{chat.text}</span>
              {chat.isHuman && avatar(true)}
            </div>
          ))}
      </div>

      <QuestionForm documentId={documentId} />
    </div>
  );
}
