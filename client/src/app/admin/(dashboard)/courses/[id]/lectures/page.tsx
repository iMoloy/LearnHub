import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { getToken } from "@/lib/session";
import type { CourseWithLectures } from "@/types";
import { LectureAdminList } from "@/components/lecture-admin-list";
import { LectureFormInline } from "@/components/lecture-form-inline";
import { createLectureAction } from "@/actions/lecture";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Manage Lectures" };

export default async function LecturesAdminPage({ params }: Props) {
  const { id } = await params;
  const token = await getToken();
  if (!token) redirect("/admin/login");

  let course: CourseWithLectures;
  try {
    const res = await api.get<{ success: true; data: CourseWithLectures }>(
      `/api/courses/${id}`,
      { token, revalidate: 0 }
    );
    course = res.data;
  } catch {
    notFound();
  }

  const boundCreate = createLectureAction.bind(null, course.id);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-gray-400">
        <ol className="flex items-center gap-1">
          <li><Link href="/admin" className="hover:text-gray-600 transition-colors">Courses</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-700 font-medium truncate max-w-[200px]">{course.title}</li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-700 font-medium">Lectures</li>
        </ol>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Lectures — {course.title}
      </h1>

      {/* Existing lectures */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          {course.lectures.length} lecture{course.lectures.length !== 1 ? "s" : ""}
        </h2>
        <LectureAdminList lectures={course.lectures} courseId={course.id} />
      </div>

      {/* Add new lecture form */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Add new lecture</h2>
        <LectureFormInline
          action={boundCreate}
          submitLabel="Add lecture"
          defaultPosition={course.lectures.length}
        />
      </div>
    </div>
  );
}
