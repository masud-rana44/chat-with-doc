"use client";

import Link from "next/link";
import HeaderActions from "./header-actions";
import { ModeToggle } from "./mode-toggle";
import { useSidebar } from "./sidebar-context";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const { onOpen } = useSidebar();

  return (
    <div className="bg-slate-100 dark:bg-slate-900">
      <div className="px-6 sm:px-10 mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Button className="lg:hidden" variant="outline" onClick={onOpen}>
            <Menu />
          </Button>

          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              height={36}
              width={36}
              alt="Logo of DocuChat AI"
            />
            <h1 className="text-2xl font-medium">DocuChat</h1>
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
