import { CourseGridSkeleton } from "@/components/course-skeleton";

export default function Loading() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse" />
      </div>
      <CourseGridSkeleton count={8} />
    </section>
  );
}
