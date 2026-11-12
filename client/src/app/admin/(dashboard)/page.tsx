import Link from "next/link";
import { api } from "@/lib/api";
import { getToken } from "@/lib/session";
import { redirect } from "next/navigation";
import type { Course, PaginatedResponse } from "@/types";
import { ConfirmDeleteCourse } from "@/components/confirm-delete-course";
import Image from "next/image";

async function getCourses(token: string): Promise<Course[]> {
  try {
    const res = await api.get<PaginatedResponse<Course>>("/api/courses", {
      token,
      tags: ["courses"],
      revalidate: 0,
    });
    return res.data;
  } catch {
    return [];
  }
}

export default async function AdminCoursesPage() {
  const token = await getToken();
  if (!token) redirect("/admin/login");

  const courses = await getCourses(token);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors min-h-10 flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No courses yet.{" "}
          <Link href="/admin/courses/new" className="text-gray-900 underline">
            Add the first one
          </Link>
          .
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3.5 font-medium text-gray-500 w-16">Thumb</th>
                  <th className="px-5 py-3.5 font-medium text-gray-500">Title</th>
                  <th className="px-5 py-3.5 font-medium text-gray-500">Price</th>
                  <th className="px-5 py-3.5 font-medium text-gray-500">Instructor</th>
                  <th className="px-5 py-3.5 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="relative w-12 h-8 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={course.thumbnailUrl}
                          alt={course.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">
                      {course.title}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      ${parseFloat(course.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {course.instructorName ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/courses/${course.id}/lectures`}
                          className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          Lectures
                        </Link>
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                        >
                          Edit
                        </Link>
                        <ConfirmDeleteCourse courseId={course.id} courseTitle={course.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-gray-100 p-4"
              >
                <div className="flex gap-3 mb-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ${parseFloat(course.price).toFixed(2)}
                      {course.instructorName && ` · ${course.instructorName}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-gray-50 pt-3">
                  <Link
                    href={`/admin/courses/${course.id}/lectures`}
                    className="flex-1 text-center text-xs text-blue-600 font-medium py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    Lectures
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="flex-1 text-center text-xs text-gray-600 font-medium py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <ConfirmDeleteCourse courseId={course.id} courseTitle={course.title} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
