"use client";

import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);
  const documents = useQuery(api.documents.getDocuments);

  return (
    <div>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <button onClick={() => createDocument({ title: "Title Text" })}>
          Create Document
        </button>

        <div className="space-y-4">
          {documents?.map((doc) => (
            <p key={doc._id} className="bg-slate-700 py-6 px-20 w-full">
              {doc.title}
            </p>
          ))}
        </div>
      </Authenticated>
    </div>
  );
}
