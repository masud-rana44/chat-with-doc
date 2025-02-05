"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex pt-24 items-center flex-col gap-6 min-h-[calc(100vh-72px)]">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg max-w-2xl text-center">{error.message}</p>

      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
