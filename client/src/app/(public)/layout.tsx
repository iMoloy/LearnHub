import { PublicShell } from "@/components/public-shell";
import type { TopbarUser } from "@/components/topbar";
import { api } from "@/lib/api";
import { getToken } from "@/lib/session";

async function getCurrentUser(): Promise<TopbarUser | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const res = await api.get<{ success: true; data: TopbarUser }>(
      "/api/auth/me",
      { token, revalidate: 0 }
    );
    return res.data;
  } catch {
    return null;
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return <PublicShell user={user}>{children}</PublicShell>;
}
