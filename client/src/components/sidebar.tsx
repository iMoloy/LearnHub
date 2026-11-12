"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { BrandLogo } from "@/components/brand-logo";

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    color: "bg-blue-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
      </svg>
    ),
  },
  {
    label: "Course",
    href: "/courses",
    color: "bg-indigo-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
  },
  {
    label: "Certificate",
    href: "/certificates",
    color: "bg-amber-400",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="9" r="5" />
        <path d="M9.5 13.5L8 21l4-2 4 2-1.5-7.5" />
      </svg>
    ),
  },
  {
    label: "Learning progress",
    href: "/progress",
    color: "bg-blue-600",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 4 3 5-6" />
      </svg>
    ),
  },
  {
    label: "Community",
    href: "/community",
    color: "bg-rose-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Quiz",
    href: "/quiz",
    color: "bg-emerald-500",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
        <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

function NavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1 px-2.5">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-11 ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-gray-100 text-gray-900 dark:bg-neutral-900 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${item.color}`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-gray-400" aria-hidden="true">
                      ⌘
                    </span>
                  )}
                </>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div
        className={`flex items-center px-4 h-14 border-b border-gray-100 dark:border-neutral-800 ${
          collapsed ? "justify-center px-2" : ""
        }`}
      >
        <Link href="/" onClick={onNavigate} aria-label="LearnHub Home">
          <BrandLogo collapsed={collapsed} />
        </Link>
      </div>

      <nav aria-label="Main navigation" className="flex-1 py-4 overflow-y-auto">
        <Suspense
          fallback={
            <div className="px-2.5 space-y-1">
              {NAV_ITEMS.map((i) => (
                <div
                  key={i.href}
                  className="h-11 rounded-xl bg-gray-100 dark:bg-neutral-900 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <NavLinks collapsed={collapsed} onNavigate={onNavigate} />
        </Suspense>
      </nav>
    </>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed inset-y-0 left-0 bg-white dark:bg-black border-r border-gray-100 dark:border-neutral-800 z-30 transition-all duration-200 ${
          collapsed ? "w-[72px]" : "w-[220px]"
        }`}
      >
        <SidebarContent collapsed={collapsed} />

        {/* Circular collapse/expand button on sidebar edge */}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3.5 top-4 w-7 h-7 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-xs flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-200 ${
              collapsed ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
          </svg>
        </button>
      </aside>

      {/* Mobile: hamburger button */}
      <button
        type="button"
        className="md:hidden fixed top-1.5 left-4 z-50 min-h-11 min-w-11 flex items-center justify-center rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 shadow-sm text-gray-700 dark:text-gray-200"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-sidebar"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {mobileOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Mobile: overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile: drawer */}
      <aside
        id="mobile-sidebar"
        className={`md:hidden fixed inset-y-0 left-0 w-[220px] bg-white dark:bg-black border-r border-gray-100 dark:border-neutral-800 z-50 flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}
