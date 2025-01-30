"use client";

import React, { useState } from "react";
import SearchForm from "@/components/search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { FileIcon, NotebookPen } from "lucide-react";

export default function SearchPage() {
  const [results, setResults] = useState<
    typeof api.search.searchAction._returnType
  >(() => JSON.parse(localStorage.getItem("results") || "[]"));

  return (
    <div>
      <SearchForm setResults={setResults} />

      <ul className="flex flex-col space-y-4 mt-10 h-[calc(100vh-240px)] overflow-y-auto">
        {results?.map((result) => {
          if (result.type === "note") {
            return (
              <SearchResult
                type="note"
                score={result.score}
                key={result.record._id}
                text={result.record.text}
                title={result.record.title}
                url={`/dashboard/notes/${result.record._id}`}
              />
            );
          } else {
            return (
              <SearchResult
                type="document"
                score={result.score}
                key={result.record._id}
                title={result.record.title}
                text={result.record.description || ""}
                url={`/dashboard/documents/${result.record._id}`}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

function SearchResult({
  type,
  url,
  score,
  title,
  text,
}: {
  type: "note" | "document";
  url: string;
  score: number;
  title: string | undefined;
  text: string | undefined;
}) {
  return (
    <Link href={url}>
      <li className="border rounded p-4 whitespace-pre-line cursor-pointer hover:bg-slate-900">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex space-x-2">
            <div>
              {type === "note" ? (
                <NotebookPen className="h-5 w-5" />
              ) : (
                <FileIcon className="h-5 w-5" />
              )}
            </div>
            <h4 className="line-clamp-2">{title || "Untitled"}</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Relevancy of {score.toFixed(2)}
          </p>
        </div>

        <p className="text-muted-foreground mt-4 text-sm line-clamp-3">
          {text?.slice(0, 400)}
          {text && text.length > 400 ? "..." : ""}
        </p>
      </li>
    </Link>
  );
}
