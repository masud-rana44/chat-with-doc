"use client";

import { ModeToggle } from "./mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Header() {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-medium">Big Brain</h1>
        </div>

        <div>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserButton />
            </div>
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
