import { CourseCard } from "@/components/course-card";
import { EmptyState } from "@/components/empty-state";
import { api } from "@/lib/api";
import type { PaginatedResponse, Course } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Courses",
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

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <section>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">All Courses</h1>

      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} priority={index < 4} />
          ))}
        </div>
      )}
    </section>
  );
}
