"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";
import type { ActionResult } from "@/types";

const initialState: ActionResult = { success: false };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        {/* Logo */}
        <div className="mb-8">
          <BrandLogo subtitle="Admin" />
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Sign in</h1>
        <p className="text-sm text-gray-400 mb-6">
          Enter your credentials to access the admin panel.
        </p>

        {/* Error message */}
        {!state.success && state.error && (
          <div
            role="alert"
            className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600"
          >
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@learnhub.com"
              className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
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
              className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-h-11"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Google login link */}
        <div className="mt-4">
          <a
            href="/api/auth/google"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors min-h-11"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </a>
        </div>
      </div>
    </div>
  );
}
