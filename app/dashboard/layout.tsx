import React, { ReactNode } from "react";
import AppSidebar from "@/components/app-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />

      <main className="mx-auto flex-1 p-6 lg:p-10 2xl:px-16">{children}</main>
    </div>
  );
}
