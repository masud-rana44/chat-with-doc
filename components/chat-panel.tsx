import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import QuestionForm from "./question-form";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "./ui/skeleton";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const user = useUser();
  const router = useRouter();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<Id<"chats"> | null>(null);

  const createNote = useMutation(api.notes.createNote);
  const chats = useQuery(api.chats.getChatsForDocument, {
    documentId,
  });

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onCopyChat = async (chat: Doc<"chats">) => {
    try {
      setCopiedId(chat._id);
      await navigator.clipboard.writeText(chat.text);

      setTimeout(() => {
        setCopiedId(null);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const onAddNote = async (text: string) => {
    try {
      setIsAdding(true);
      const noteId = await createNote({
        text,
      });

      router.push(`/dashboard/notes/${noteId}`);
    } catch (error) {
      toast({
        title: "Failed to add note",
        description: "Something went wrong! Please try again later.",
        variant: "destructive",
      });
      console.error("Failed to copy: ", error);
    } finally {
      setIsAdding(false);
    }
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
                "group rounded whitespace-pre-line flex items-start gap-2 relative"
              )}
            >
              {!chat.isHuman && (
                <Avatar isHuman={false} imgUrl={user.user?.imageUrl} />
              )}
              <Markdown className="flex-1">{chat.text}</Markdown>
              {chat.isHuman && <Avatar isHuman imgUrl={user.user?.imageUrl} />}

              {!chat.isHuman &&
                chat.text !== "The answer is not provided in the text." && (
                  <div className="hidden absolute top-2 right-2 group-hover:flex items-center space-x-2">
                    <Button size="sm" onClick={() => onCopyChat(chat)}>
                      {copiedId === chat._id ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>

                    <Button
                      disabled={isAdding}
                      onClick={() => onAddNote(chat.text)}
                      size="sm"
                    >
                      {!isAdding ? "Add as Note" : "Adding..."}
                    </Button>
                  </div>
                )}
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
