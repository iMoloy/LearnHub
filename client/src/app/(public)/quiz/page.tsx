import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ApiResponse, Quiz } from "@/types";

export const metadata: Metadata = {
  title: "Quizzes & Assessments — LearnHub",
  description: "Test your skills with interactive topic quizzes and final assessments.",
};

const FALLBACK_QUIZZES: Quiz[] = [
  {
    id: 1,
    title: "UX Design Principles & Heuristic Evaluation",
    course: "Become a UX Designer in 2024",
    courseId: 1,
    questions: 15,
    duration: "20 mins",
    difficulty: "Beginner",
    passScore: "80%",
    status: "Completed",
    bestScore: "100%",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Figma Auto Layout 5.0 & Responsive Constraints",
    course: "Mastering Figma: From Concept to Production",
    courseId: 2,
    questions: 12,
    duration: "15 mins",
    difficulty: "Intermediate",
    passScore: "75%",
    status: "Completed",
    bestScore: "92%",
    createdAt: new Date().toISOString(),
  },
];

async function getQuizzesData(): Promise<Quiz[]> {
  try {
    const res = await api.get<ApiResponse<Quiz[]>>("/quizzes", {
      revalidate: 60,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch quizzes from database API:", err);
    return FALLBACK_QUIZZES;
  }
}

export default async function QuizPage() {
  const quizzes = await getQuizzesData();
  const completedCount = quizzes.filter((q) => q.status === "Completed").length;
  const availableCount = quizzes.length - completedCount;

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Skill Quizzes & Assessments
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
            Validate your mastery at the end of each module to unlock certificates.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {completedCount} Completed
          </span>
          <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300">
            {availableCount} Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzes.map((quiz) => (
          <article
            key={quiz.id}
            className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  quiz.difficulty === "Beginner"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : quiz.difficulty === "Intermediate"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                }`}
              >
                {quiz.difficulty}
              </span>
              <span className="text-xs text-gray-400 dark:text-neutral-500 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {quiz.duration}
              </span>
            </div>

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-1">
              {quiz.title}
            </h2>
            <Link
              href={quiz.courseId ? `/courses/${quiz.courseId}` : "/courses"}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline line-clamp-1 mb-4"
            >
              Course: {quiz.course}
            </Link>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-gray-50 dark:border-neutral-900 pt-3 mb-4 text-gray-600 dark:text-neutral-400">
              <div>
                <span className="text-gray-400 dark:text-neutral-500 block text-[10px]">Questions</span>
                <span className="font-semibold text-gray-900 dark:text-white">{quiz.questions} Questions</span>
              </div>
              <div>
                <span className="text-gray-400 dark:text-neutral-500 block text-[10px]">Passing Score</span>
                <span className="font-semibold text-gray-900 dark:text-white">{quiz.passScore}</span>
              </div>
            </div>

            <div className="mt-auto pt-1">
              {quiz.status === "Completed" ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Score: {quiz.bestScore || "Passed"}
                  </span>
                  <button
                    type="button"
                    className="text-xs font-medium py-2 px-3 rounded-xl border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-900 text-gray-700 dark:text-neutral-200 transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-full text-center text-xs font-semibold py-2.5 px-3 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-neutral-200 transition-colors min-h-10"
                >
                  Start Assessment
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
