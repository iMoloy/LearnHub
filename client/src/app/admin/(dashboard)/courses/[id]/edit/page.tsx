import { notFound, redirect } from "next/navigation";
import { CourseForm } from "@/components/course-form";
import { updateCourseAction } from "@/actions/course";
import { api } from "@/lib/api";
import { getToken } from "@/lib/session";
import type { Course } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Edit Course" };

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params;
  const token = await getToken();
  if (!token) redirect("/admin/login");

  let course: Course;
  try {
    const res = await api.get<{ success: true; data: Course }>(
      `/api/courses/${id}`,
      { token, revalidate: 0 }
    );
    course = res.data;
  } catch {
    notFound();
  }

  // Bind courseId to the action
  const boundAction = updateCourseAction.bind(null, course.id);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit course</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <CourseForm action={boundAction} course={course} submitLabel="Update course" />
      </div>
    </div>
  );
}
