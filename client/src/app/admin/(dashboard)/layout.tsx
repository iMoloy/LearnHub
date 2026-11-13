import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";
import { api } from "@/lib/api";
import { getToken } from "@/lib/session";

export const metadata: Metadata = {
  title: { default: "Admin — LearnHub", template: "%s | Admin · LearnHub" },
  robots: { index: false, follow: false },
};

async function checkAdmin(): Promise<boolean> {
  const token = await getToken();
  if (!token) return false;
  try {
    const res = await api.get<{ success: true; data: { role: string } }>(
      "/api/auth/me",
      { token, revalidate: 0 }
    );
    return res.data.role === "ADMIN";
  } catch {
    return false;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

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
