import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import { getToken } from "@/lib/session";
import { logoutAction } from "@/actions/auth";

export const metadata: Metadata = {
  title: "My Profile — LearnHub",
  description: "View and manage your LearnHub student and account profile.",
};

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default async function ProfilePage() {
  const token = await getToken();
  if (!token) {
    redirect("/auth");
  }

  let user: UserProfile;
  try {
    const res = await api.get<{ success: true; data: UserProfile }>(
      "/api/auth/me",
      { token, revalidate: 0 }
    );
    user = res.data;
  } catch {
    redirect("/auth");
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            My Account & Profile
          </h1>
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
            Manage your personal credentials, student account settings and enrolled activities.
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors min-h-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left card: User identity summary */}
        <div className="bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 flex flex-col items-center text-center shadow-xs">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 dark:from-neutral-800 dark:to-neutral-700 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">
            {initial}
          </div>

          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5 break-all">
            {user.email}
          </p>

          <div className="mt-3">
            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                user.role === "ADMIN"
                  ? "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              }`}
            >
              {user.role} Account
            </span>
          </div>

          {user.role === "ADMIN" && (
            <div className="mt-6 w-full pt-4 border-t border-gray-50 dark:border-neutral-900">
              <Link
                href="/admin"
                className="w-full text-center text-xs font-semibold py-2.5 px-4 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-neutral-200 transition-colors min-h-11 flex items-center justify-center gap-1.5"
              >
                Go to Admin Dashboard →
              </Link>
            </div>
          )}
        </div>

        {/* Right card: Account Details & Fast Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
              Account Overview
            </h3>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800/80">
                <dt className="text-gray-400 dark:text-neutral-500 font-medium mb-1">Account ID</dt>
                <dd className="font-mono text-gray-900 dark:text-white font-semibold">#{user.id}</dd>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800/80">
                <dt className="text-gray-400 dark:text-neutral-500 font-medium mb-1">User Role</dt>
                <dd className="text-gray-900 dark:text-white font-semibold">{user.role}</dd>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800/80">
                <dt className="text-gray-400 dark:text-neutral-500 font-medium mb-1">Email Verification</dt>
                <dd className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Verified
                </dd>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800/80">
                <dt className="text-gray-400 dark:text-neutral-500 font-medium mb-1">Member Since</dt>
                <dd className="text-gray-900 dark:text-white font-semibold">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              Learning Shortcuts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/courses"
                className="p-3 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors text-center"
              >
                <span className="block text-base font-bold text-gray-900 dark:text-white">12</span>
                <span className="text-[11px] text-gray-500 dark:text-neutral-400">Available Courses</span>
              </Link>

              <Link
                href="/progress"
                className="p-3 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors text-center"
              >
                <span className="block text-base font-bold text-indigo-600 dark:text-indigo-400">Track</span>
                <span className="text-[11px] text-gray-500 dark:text-neutral-400">Study Progress</span>
              </Link>

              <Link
                href="/certificates"
                className="p-3 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors text-center"
              >
                <span className="block text-base font-bold text-amber-500">View</span>
                <span className="text-[11px] text-gray-500 dark:text-neutral-400">Certificates</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
