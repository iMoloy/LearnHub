import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ApiResponse, LearningProgress } from "@/types";

export const metadata: Metadata = {
  title: "Learning Progress — LearnHub",
  description: "Track your active courses, lecture completion, and study time on LearnHub.",
};

const FALLBACK_PROGRESS: LearningProgress[] = [
  {
    id: 1,
    courseId: 1,
    title: "Become a UX Designer in 2024 (Beginner to Pro)",
    instructor: "Eichiro D. Lucky",
    completedLectures: 4,
    totalLectures: 4,
    percent: 100,
    status: "Completed",
    lastWatched: "Yesterday",
    timeSpent: "8h 30m",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    courseId: 2,
    title: "Mastering Figma: From Concept to Production",
    instructor: "Sarah Jenkins",
    completedLectures: 3,
    totalLectures: 4,
    percent: 75,
    status: "In Progress",
    lastWatched: "2 hours ago",
    timeSpent: "7h 45m",
    createdAt: new Date().toISOString(),
  },
];

async function getProgressData(): Promise<LearningProgress[]> {
  try {
    const res = await api.get<ApiResponse<LearningProgress[]>>("/api/progress", {
      revalidate: 60,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch progress from database API:", err);
    return FALLBACK_PROGRESS;
  }
}

export default async function ProgressPage() {
  const progressList = await getProgressData();
  const completedCount = progressList.filter((c) => c.percent === 100).length;
  const inProgressCount = progressList.length - completedCount;

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Learning Progress
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
            Monitor lecture watch completion, time spent, and course milestones.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {inProgressCount} In Progress
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {completedCount} Completed
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {progressList.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:shadow-md transition-shadow"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    item.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-xs text-gray-400 dark:text-neutral-500">
                  Last active: {item.lastWatched}
                </span>
              </div>

              <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate mb-1">
                {item.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-neutral-400">
                Instructor: {item.instructor} · Total study time: {item.timeSpent}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:w-80 flex-shrink-0">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-neutral-300 mb-1.5">
                  <span>Progress</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {item.percent}% ({item.completedLectures}/{item.totalLectures} lectures)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.percent === 100 ? "bg-emerald-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>

              <Link
                href={item.courseId ? `/courses/${item.courseId}` : "/courses"}
                className="text-center text-xs font-semibold py-2.5 px-4 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap min-h-10 flex items-center justify-center"
              >
                {item.percent === 100 ? "Review Course" : "Continue Lecture"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
