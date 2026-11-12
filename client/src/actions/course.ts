"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/session";
import { api } from "@/lib/api";
import type { ActionResult } from "@/types";

async function authToken(): Promise<string> {
  const token = await getToken();
  if (!token) redirect("/admin/login");
  return token;
}

export async function createCourseAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const token = await authToken();

  const payload = {
    title: formData.get("title")?.toString().trim(),
    description: formData.get("description")?.toString().trim(),
    price: formData.get("price")?.toString().trim(),
    thumbnailUrl: formData.get("thumbnailUrl")?.toString().trim(),
    instructorName: formData.get("instructorName")?.toString().trim() || null,
    duration: formData.get("duration")?.toString().trim() || null,
    discountPercent: formData.get("discountPercent")
      ? Number(formData.get("discountPercent"))
      : null,
  };

  if (!payload.title || !payload.description || !payload.price || !payload.thumbnailUrl) {
    return { success: false, error: "Title, description, price, and thumbnail are required." };
  }

  try {
    await api.post("/api/courses", payload, { token });
    updateTag("courses");
    revalidatePath("/", "page");
    revalidatePath("/admin", "page");
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }

  redirect("/admin");
}

export async function updateCourseAction(
  id: number,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const token = await authToken();

  const payload = {
    title: formData.get("title")?.toString().trim(),
    description: formData.get("description")?.toString().trim(),
    price: formData.get("price")?.toString().trim(),
    thumbnailUrl: formData.get("thumbnailUrl")?.toString().trim(),
    instructorName: formData.get("instructorName")?.toString().trim() || null,
    duration: formData.get("duration")?.toString().trim() || null,
    discountPercent: formData.get("discountPercent")
      ? Number(formData.get("discountPercent"))
      : null,
  };

  try {
    await api.put(`/api/courses/${id}`, payload, { token });
    updateTag("courses");
    updateTag(`course-${id}`);
    revalidatePath("/", "page");
    revalidatePath(`/courses/${id}`, "page");
    revalidatePath("/admin", "page");
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }

  redirect("/admin");
}

export async function deleteCourseAction(id: number): Promise<ActionResult> {
  const token = await authToken();

  try {
    await api.delete(`/api/courses/${id}`, { token });
    updateTag("courses");
    revalidatePath("/", "page");
    revalidatePath("/admin", "page");
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }

  return { success: true };
}
