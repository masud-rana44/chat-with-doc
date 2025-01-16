"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import {
  useMutation,
  useQuery,
} from "convex/react";
import { useState } from "react";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);
  const [text, setText] = useState("");

  return (
    <div>
      <div className="py-20 max-w-sm mx-auto space-y-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Enter Note..."
        />
        <Button onClick={() => createDocument({ title: text })}>
          Create Document
        </Button>
      </div>

      <div className="space-y-4">
        {documents?.map((doc) => (
          <p key={doc._id} className="bg-slate-700 py-6 px-20 w-full">
            {doc.title}
          </p>
        ))}
      </div>
    </div>
  );
}
