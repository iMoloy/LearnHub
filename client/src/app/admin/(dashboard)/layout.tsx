import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: { default: "Admin — LearnHub", template: "%s | Admin · LearnHub" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin top bar */}
      <header className="fixed top-0 inset-x-0 h-14 bg-white border-b border-gray-100 z-20 flex items-center justify-between px-4 sm:px-6">
        <Link href="/admin" aria-label="LearnHub Admin">
          <BrandLogo subtitle="Admin" />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
          >
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="pt-14 p-4 sm:p-6">{children}</main>
    </div>
  );
}
