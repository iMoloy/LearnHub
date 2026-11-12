import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";
const STATE_COOKIE = "learnhub_oauth_state";
const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? "learnhub_token";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error || !code || !state) {
    return NextResponse.redirect(
      new URL("/admin/login?error=google_cancelled", request.url)
    );
  }

  const store = await cookies();
  const savedState = store.get(STATE_COOKIE)?.value;
  store.delete(STATE_COOKIE);

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid_state", request.url)
    );
  }

  // Exchange code with our backend
  let token: string;
  try {
    const res = await fetch(`${API_URL}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });

    const json = await res.json();
    if (!res.ok) {
      return NextResponse.redirect(
        new URL(
          `/admin/login?error=${encodeURIComponent(json.message ?? "google_error")}`,
          request.url
        )
      );
    }
    token = json.data.token as string;
  } catch {
    return NextResponse.redirect(
      new URL("/admin/login?error=server_error", request.url)
    );
  }

  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.redirect(new URL("/admin", request.url));
}
