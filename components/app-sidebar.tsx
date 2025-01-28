"use client";

import { cn } from "@/lib/utils";
import { File, NotebookPen, Search, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Search", href: "/dashboard/search", icon: Search },
    { name: "Documents", href: "/dashboard/documents", icon: File },
    { name: "Notes", href: "/dashboard/notes", icon: NotebookPen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <nav className="bg-slate-950 w-[260px] px-4 py-10 h-[calc(100vh-72px)]">
      <ul className="flex flex-col gap-2">
        {links.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <Link
              key={name}
              href={href}
              className={cn(
                pathname.includes(href) && "bg-slate-900",
                "flex items-center gap-2 px-6 py-2 hover:bg-slate-900 rounded"
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
