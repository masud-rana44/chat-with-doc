import React, { useEffect, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import { btnIconStyles } from "@/styles/styles";
import { Skeleton } from "./ui/skeleton";

export default function DocumentCard({
  document,
}: {
  document: Doc<"documents">;
}) {
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsGeneratingDesc(false);
    }, 5000);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">{document.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {document.description && (
          <p className="text-muted-foreground line-clamp-3">
            {document.description}
          </p>
        )}
        {!document.description &&
          (isGeneratingDesc ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <p className="text-muted-foreground">
              Something went wrong. Description could not be generated.
            </p>
          ))}
      </CardContent>
      <CardFooter className="flex items-center space-x-2">
        <Button asChild variant="secondary">
          <Link href={`/dashboard/documents/${document._id}?tab=document`}>
            <Eye className={btnIconStyles} />
            View
          </Link>
        </Button>

        <Button asChild variant="secondary">
          <Link href={`/dashboard/documents/${document._id}?tab=chat`}>
            <MessageCircle className={btnIconStyles} />
            Chat
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
