import { CourseForm } from "@/components/course-form";
import { createCourseAction } from "@/actions/course";

export const metadata = { title: "New Course" };

export default function NewCoursePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Add new course</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <CourseForm action={createCourseAction} submitLabel="Create course" />
      </div>
    </div>
  );
}
