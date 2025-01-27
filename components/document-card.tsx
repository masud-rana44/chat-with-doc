import React from "react";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { btnIconStyles } from "@/styles/styles";

export default function DocumentCard({
  document,
}: {
  document: Doc<"documents">;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1">{document.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {document.description && (
          <p className="text-muted-foreground line-clamp-3">
            {document.description}
          </p>
        )}
        {!document.description && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/documents/${document._id}`}>
            <Eye className={btnIconStyles} />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
