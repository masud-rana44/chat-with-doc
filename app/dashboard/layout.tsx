import React, { ReactNode } from "react";
import AppSidebar from "@/components/app-sidebar";
import { useSidebar } from "@/components/sidebar-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isOpen, onClose } = useSidebar();

  return (
    <div className="flex">
      <AppSidebar />

      <main
        onClick={() => isOpen && onClose()}
        className="mx-auto flex-1 p-6 lg:p-10 2xl:px-16"
      >
        {children}
      </main>
    </div>
  );
}
