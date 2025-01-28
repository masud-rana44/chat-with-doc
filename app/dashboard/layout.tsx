import AppSidebar from "@/components/app-sidebar";
import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />

      <main className="mx-auto flex-1 py-10 px-6 lg:px-10 2xl:px-16">
        {children}
      </main>
    </div>
  );
}
