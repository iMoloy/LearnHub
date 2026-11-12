"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar, type TopbarUser } from "@/components/topbar";

export function PublicShell({
  user,
  children,
}: {
  user: TopbarUser | null;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f8f9fa] dark:bg-black transition-colors">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-200 ${
          collapsed ? "md:ml-[72px]" : "md:ml-[220px]"
        }`}
      >
        <Topbar user={user} sidebarCollapsed={collapsed} />
        <main className="flex-1 p-4 sm:p-6 mt-14">{children}</main>
      </div>
    </div>
  );
}
