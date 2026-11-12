"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { logoutAction } from "@/actions/auth";

export interface TopbarUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface TopbarProps {
  user: TopbarUser | null;
  sidebarCollapsed: boolean;
}

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("learnhub-theme", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("learnhub-theme", callback);
  };
}

function getThemeSnapshot() {
  return localStorage.getItem("learnhub_theme") === "dark";
}

function getThemeServerSnapshot() {
  return false;
}

export function Topbar({ user, sidebarCollapsed }: TopbarProps) {
  const dark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("learnhub_theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("learnhub-theme"));
  }

  const displayName = user?.name ?? "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-0 right-0 left-0 h-14 bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-800 z-20 flex items-center justify-end px-4 sm:px-6 gap-3 transition-all duration-200 ${
        sidebarCollapsed ? "md:left-[72px]" : "md:left-[220px]"
      }`}
    >
      {/* User avatar + full name */}
      <Link
        href={user ? "/admin" : "/auth"}
        className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
        title={user ? "Go to Admin Dashboard" : "Student Login / Register"}
      >
        <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-neutral-800 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
          {initial}
        </div>
        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-neutral-200">
          {displayName}
        </span>
      </Link>

      {/* Theme toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-400 ${
          dark ? "bg-neutral-700" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            dark ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      {/* Power button: logout if signed in, or login if guest */}
      {user ? (
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Sign out"
            title="Sign out"
            className="min-h-10 min-w-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
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
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </button>
        </form>
      ) : (
        <Link
          href="/auth"
          aria-label="Sign in"
          title="Sign in / Register"
          className="min-h-10 min-w-10 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
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
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </Link>
      )}
    </header>
  );
}
