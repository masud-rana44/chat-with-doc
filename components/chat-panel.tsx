import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import QuestionForm from "./question-form";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "./ui/skeleton";
import Markdown from "react-markdown";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const user = useUser();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chats = useQuery(api.chats.getChatsForDocument, {
    documentId,
  });

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 overflow-y-auto flex flex-col space-y-3">
        <div className="bg-slate-50 dark:bg-slate-950 p-3 flex gap-3">
          <span>
            <Avatar isHuman={false} imgUrl={user.user?.imageUrl} />
          </span>
          <p className="flex-1">
            Ask any question using AI about this document:
          </p>
        </div>
        {/* If not chats, added loading skeleton */}
        {!chats &&
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className={cn({
                "bg-slate-100 dark:bg-slate-800 self-end py-2 px-3 h-8 w-1/3":
                  idx % 2 == 0,
                "bg-slate-50 dark:bg-slate-950 p-4 h-32 w-full": idx % 2 == 1,
              })}
            />
          ))}

        {chats &&
          chats?.map((chat) => (
            <div
              key={chat._id}
              className={cn(
                {
                  "bg-slate-100 dark:bg-slate-800 text-right w-fit self-end py-2 px-3":
                    chat.isHuman,
                  "bg-slate-50 dark:bg-slate-950 p-4": !chat.isHuman,
                },
                "rounded whitespace-pre-line flex items-start gap-2"
              )}
            >
              {!chat.isHuman && (
                <Avatar isHuman={false} imgUrl={user.user?.imageUrl} />
              )}
              <Markdown className="flex-1">{chat.text}</Markdown>
              {chat.isHuman && <Avatar isHuman imgUrl={user.user?.imageUrl} />}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>

      <QuestionForm documentId={documentId} />
    </div>
  );
}

const Avatar = ({
  isHuman,
  imgUrl,
}: {
  isHuman: boolean;
  imgUrl: string | undefined;
}) => {
  return isHuman ? (
    <Image
      height={24}
      width={24}
      className="rounded-full"
      src={imgUrl || "/placeholder-avatar.png"}
      alt="Image of AI Avatar or User"
    />
  ) : (
    <div className="bg-slate-200 rounded-full p-1">
      <Image src="/ai-icon.png" width={20} height={20} alt="AI Icon" />
    </div>
  );
};
