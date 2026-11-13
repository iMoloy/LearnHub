"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionResult } from "@/types";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "learnhub_token";
const API_URL = process.env.API_URL ?? "http://localhost:4000";

export async function registerAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  let token: string;
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json.message ?? "Registration failed." };
    }

    token = json.data.token as string;
  } catch {
    return { success: false, error: "Could not connect to the server." };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/profile");
}

export async function loginAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  let token: string;
  let userRole: string | undefined;
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json.message ?? "Invalid credentials." };
    }

    token = json.data.token as string;
    userRole = json.data?.user?.role as string | undefined;
  } catch {
    return { success: false, error: "Could not connect to the server." };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Redirect admins to /admin, students to /profile
  if (userRole === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/auth");
}
