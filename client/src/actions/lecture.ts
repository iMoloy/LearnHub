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

export async function createLectureAction(
  courseId: number,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const token = await authToken();

  const payload = {
    title: formData.get("title")?.toString().trim(),
    description: formData.get("description")?.toString().trim() || "",
    videoUrl: formData.get("videoUrl")?.toString().trim(),
    position: Number(formData.get("position") ?? 0),
  };

  if (!payload.title || !payload.videoUrl) {
    return { success: false, error: "Title and video URL are required." };
  }

  try {
    await api.post(`/api/courses/${courseId}/lectures`, payload, { token });
    updateTag(`course-${courseId}`);
    revalidatePath(`/courses/${courseId}`, "page");
    revalidatePath(`/admin/courses/${courseId}/lectures`, "page");
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }

  redirect(`/admin/courses/${courseId}/lectures`);
}

export async function updateLectureAction(
  lectureId: number,
  courseId: number,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const token = await authToken();

  const payload = {
    title: formData.get("title")?.toString().trim(),
    description: formData.get("description")?.toString().trim() || "",
    videoUrl: formData.get("videoUrl")?.toString().trim(),
    position: Number(formData.get("position") ?? 0),
  };

  try {
    await api.put(`/api/lectures/${lectureId}`, payload, { token });
    updateTag(`course-${courseId}`);
    revalidatePath(`/courses/${courseId}`, "page");
    revalidatePath(`/admin/courses/${courseId}/lectures`, "page");
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }

  redirect(`/admin/courses/${courseId}/lectures`);
}

export async function deleteLectureAction(
  lectureId: number,
  courseId: number
): Promise<ActionResult> {
  const token = await authToken();

  try {
    await api.delete(`/api/lectures/${lectureId}`, { token });
    updateTag(`course-${courseId}`);
    revalidatePath(`/courses/${courseId}`, "page");
    revalidatePath(`/admin/courses/${courseId}/lectures`, "page");
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }

  return { success: true };
}
