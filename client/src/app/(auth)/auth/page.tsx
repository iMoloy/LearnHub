"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-black flex flex-col justify-between p-4 sm:p-6 transition-colors">
      {/* Top bar with Back to Home button */}
      <div className="flex items-center justify-between max-w-md w-full mx-auto">
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
      <div className="w-full max-w-md mx-auto bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 sm:p-8 my-8">
        {/* Brand logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <BrandLogo />
          </Link>
        </div>

        {/* Tab switcher: Login | Registration */}
        <div className="flex rounded-2xl bg-gray-100 dark:bg-neutral-900 p-1 mb-6">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all min-h-10 ${
              tab === "login"
                ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all min-h-10 ${
              tab === "register"
                ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {tab === "login" ? "Welcome back to LearnHub" : "Join LearnHub today"}
          </h1>
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
            {tab === "login"
              ? "Sign in with your Google account to access all courses"
              : "Quick single-click sign up with your verified Google profile"}
          </p>
        </div>

        {/* Google sign-in only */}
        <div className="space-y-4">
          <a
            href="/api/auth/google"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-2xl text-sm font-semibold text-gray-700 dark:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600 transition-all min-h-12 shadow-xs group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="group-hover:scale-105 transition-transform">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>
              {tab === "login" ? "Continue with Google" : "Sign up with Google"}
            </span>
          </a>

          <p className="text-[11px] text-center text-gray-400 dark:text-neutral-500 leading-relaxed px-2">
            By continuing, you agree to LearnHub Terms of Service and Privacy Policy. Secure authentication powered by Google Identity.
          </p>
        </div>

        {/* Bottom link: Admin Login */}
        <div className="mt-8 pt-5 border-t border-gray-100 dark:border-neutral-900 text-center">
          <p className="text-xs text-gray-500 dark:text-neutral-400">
            Are you a platform administrator?
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-white hover:underline mt-1.5"
          >
            <span>Sign in with Admin Credentials</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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
