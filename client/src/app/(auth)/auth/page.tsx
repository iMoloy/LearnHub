"use client";

import Link from "next/link";
import { useState, useActionState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { loginAction, registerAction } from "@/actions/auth";
import type { ActionResult } from "@/types";

const initialState: ActionResult = { success: false };

function TabInitializer({
  setTab,
}: {
  setTab: (t: "login" | "register" | "admin") => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "admin" || t === "register" || t === "login") {
      setTab(t);
    }
  }, [searchParams, setTab]);
  return null;
}

function GoogleErrorAlert() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  if (!error) return null;

  const message =
    error === "google_cancelled"
      ? "Google sign-in was cancelled."
      : error === "invalid_state"
      ? "Security session expired. Please try again."
      : decodeURIComponent(error);

  return (
    <div
      role="alert"
      className="mb-4 px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300"
    >
      {message}
    </div>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register" | "admin">("login");
  const [studentLoginState, studentLoginFormAction, isStudentLoginPending] = useActionState(loginAction, initialState);
  const [adminLoginState, adminLoginFormAction, isAdminLoginPending] = useActionState(loginAction, initialState);
  const [registerState, registerFormAction, isRegisterPending] = useActionState(registerAction, initialState);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-black flex flex-col justify-between p-4 sm:p-6 transition-colors">
      {/* Top bar: Website Logo & Name on LEFT, Back to Home button on RIGHT */}
      <header className="w-full max-w-lg mx-auto flex items-center justify-between py-2 sm:py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label="LearnHub Home"
        >
          <BrandLogo />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white px-3.5 py-2 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors min-h-10"
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
      </header>

      {/* Main card */}
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 sm:p-8 my-auto">
        <Suspense fallback={null}>
          <GoogleErrorAlert />
          <TabInitializer setTab={setTab} />
        </Suspense>

        {/* 3-Way Tab Switcher: Student Login | Create Account | Admin Login */}
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
          <button
            type="button"
            onClick={() => setTab("admin")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all min-h-10 ${
              tab === "admin"
                ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {tab === "login" && "Welcome back to LearnHub"}
            {tab === "register" && "Create your student account"}
            {tab === "admin" && "Administrator Portal"}
          </h1>
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
            {tab === "login" && "Sign in with your email or Google account"}
            {tab === "register" && "Register with your details or Google account"}
            {tab === "admin" && "Enter your admin credentials to manage courses & lectures"}
          </p>
        </div>

        {/* Google OAuth Button: ONLY for Student Login & Registration (Hidden for Admin) */}
        {tab !== "admin" && (
          <>
            <div className="mb-5">
              <a
                href="/api/auth/google"
                className="flex items-center justify-center gap-3 w-full py-2.5 px-4 border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-2xl text-xs font-semibold text-gray-700 dark:text-neutral-200 transition-all min-h-11 shadow-xs group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
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
                <span>Continue with Google</span>
              </a>
            </div>

            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-gray-100 dark:border-neutral-800 w-full" />
              <span className="bg-white dark:bg-black px-3 text-[11px] uppercase tracking-wider text-gray-400 dark:text-neutral-500 font-medium absolute">
                Or continue with email
              </span>
            </div>
          </>
        )}

        {/* 1. STUDENT LOGIN FORM */}
        {tab === "login" && (
          <form action={studentLoginFormAction} className="space-y-4" noValidate>
            {!studentLoginState.success && studentLoginState.error && (
              <div
                role="alert"
                className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300"
              >
                {studentLoginState.error}
              </div>
            )}

            <div>
              <label
                htmlFor="student-login-email"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Email address
              </label>
              <input
                id="student-login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white placeholder-gray-300 dark:placeholder-neutral-600 transition"
              />
            </div>

            <div>
              <label
                htmlFor="student-login-password"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="student-login-password"
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
              disabled={isStudentLoginPending}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-neutral-200 disabled:opacity-60 transition-colors min-h-12 shadow-xs cursor-pointer"
            >
              {isStudentLoginPending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        )}

        {/* 2. REGISTRATION FORM */}
        {tab === "register" && (
          <form action={registerFormAction} className="space-y-4" noValidate>
            {!registerState.success && registerState.error && (
              <div
                role="alert"
                className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300"
              >
                {registerState.error}
              </div>
            )}

            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white placeholder-gray-300 dark:placeholder-neutral-600 transition"
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Email address
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white placeholder-gray-300 dark:placeholder-neutral-600 transition"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Create Password
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white placeholder-gray-300 dark:placeholder-neutral-600 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isRegisterPending}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-neutral-200 disabled:opacity-60 transition-colors min-h-12 shadow-xs cursor-pointer"
            >
              {isRegisterPending ? "Creating Account…" : "Create Student Account"}
            </button>
          </form>
        )}

        {/* 3. ADMIN LOGIN FORM */}
        {tab === "admin" && (
          <form action={adminLoginFormAction} className="space-y-4" noValidate>
            {!adminLoginState.success && adminLoginState.error && (
              <div
                role="alert"
                className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300"
              >
                {adminLoginState.error}
              </div>
            )}

            <div>
              <label
                htmlFor="admin-login-email"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Admin Email address
              </label>
              <input
                id="admin-login-email"
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
                htmlFor="admin-login-password"
                className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5"
              >
                Admin Password
              </label>
              <input
                id="admin-login-password"
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
              disabled={isAdminLoginPending}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-neutral-200 disabled:opacity-60 transition-colors min-h-12 shadow-xs cursor-pointer"
            >
              {isAdminLoginPending ? "Authenticating Admin…" : "Sign In as Admin"}
            </button>
          </form>
        )}
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-[11px] text-gray-400 dark:text-neutral-600 py-2 sm:py-4">
        &copy; {new Date().getFullYear()} LearnHub LMS. All rights reserved.
      </footer>
    </div>
  );
}
