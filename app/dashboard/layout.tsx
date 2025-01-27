import AppSidebar from "@/components/app-sidebar";
import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />

      <main className="container mx-auto py-10">{children}</main>
    </div>
  );
}
