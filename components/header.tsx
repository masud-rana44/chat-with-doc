"use client";

import Link from "next/link";
import HeaderActions from "./header-actions";
import { ModeToggle } from "./mode-toggle";
import { useSidebar } from "./sidebar-context";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const { onOpen } = useSidebar();

  return (
    <div className="bg-slate-900">
      <div className="container px-6 sm:px-0 mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Button className="lg:hidden" variant="outline" onClick={onOpen}>
            <Menu />
          </Button>

          <Link href="/">
            <h1 className="text-2xl font-medium">DocTalk AI</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
