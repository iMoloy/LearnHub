"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";
import type { ActionResult } from "@/types";

const initialState: ActionResult = { success: false };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-black flex flex-col justify-between p-4 sm:p-6 transition-colors">
      {/* Top bar with Back to Home button */}
      <div className="flex items-center justify-between max-w-sm w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors min-h-10"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Main card */}
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 sm:p-8 my-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <BrandLogo subtitle="Admin" />
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Portal
          </h1>
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
            Enter your email and password to manage courses and lectures.
          </p>
        </div>

        {/* Error message */}
        {!state.success && state.error && (
          <div
            role="alert"
            className="mb-4 px-4 py-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300"
          >
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@learnhub.com"
              className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white placeholder-gray-300 dark:placeholder-neutral-600 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white placeholder-gray-300 dark:placeholder-neutral-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-h-12 shadow-xs"
          >
            {isPending ? "Authenticating…" : "Sign In to Dashboard"}
          </button>
        </form>

        {/* Link back to student auth page */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-900 text-center">
          <Link
            href="/auth"
            className="text-xs font-medium text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Not an admin? Student login / registration
          </Link>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[11px] text-gray-400 dark:text-neutral-600">
        &copy; {new Date().getFullYear()} LearnHub LMS. All rights reserved.
      </div>
    </div>
  );
}
