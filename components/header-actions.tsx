"use client";

import React from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Skeleton } from "./ui/skeleton";

export default function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>

      <Authenticated>
        <UserButton />
      </Authenticated>

      <AuthLoading>
        <Skeleton className="h-8 w-8 rounded-full" />
      </AuthLoading>
    </>
  );
}
