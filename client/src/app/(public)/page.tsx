import { CourseCard } from "@/components/course-card";
import { EmptyState } from "@/components/empty-state";
import { api } from "@/lib/api";
import type { PaginatedResponse, Course } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "All Courses — LearnHub",
  description: "Browse all available online courses on LearnHub.",
};

async function getCourses(): Promise<Course[]> {
  try {
    const res = await api.get<PaginatedResponse<Course>>("/api/courses", {
      tags: ["courses"],
      revalidate: 60,
    });
    return res.data;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <section>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">All Course</h1>
        <Link
          href="/courses"
          className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 rounded-full px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
        >
          See all
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Grid */}
      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              priority={index < 4}
            />
          ))}
        </div>
      )}
    </section>
  );
}
