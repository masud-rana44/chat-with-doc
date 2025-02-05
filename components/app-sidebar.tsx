"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { File, NotebookPen, Search, X } from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen, onClose } = useSidebar();

  const links = [
    { name: "Search", href: "/dashboard/search", icon: Search },
    { name: "Documents", href: "/dashboard/documents", icon: File },
    { name: "Notes", href: "/dashboard/notes", icon: NotebookPen },
  ];

  return (
    <nav
      className={cn(
        { "-translate-x-full": !isOpen, "translate-x-0": isOpen },
        "fixed top-0 h-screen bg-slate-50 dark:bg-slate-950 transition duration-300 w-[260px] px-4 py-20 lg:py-10 lg:relative lg:h-[calc(100vh-72px)] lg:translate-x-0 z-10"
      )}
    >
      <Button
        onClick={onClose}
        variant="outline"
        className="absolute lg:hidden top-4 right-4"
      >
        <X />
      </Button>

      <ul className="flex flex-col gap-2">
        {links.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <Link
              key={name}
              href={href}
              className={cn(
                pathname.includes(href) && "bg-slate-200 dark:bg-slate-900",
                "flex items-center gap-2 px-6 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded"
              )}
            >
              <Icon className="h-6 w-6" />
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
