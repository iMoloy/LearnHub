import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ApiResponse, Discussion } from "@/types";

export const metadata: Metadata = {
  title: "Community Discussions — LearnHub",
  description: "Join discussions, ask questions, and collaborate with student peers on LearnHub.",
};

const FALLBACK_DISCUSSIONS: Discussion[] = [
  {
    id: 1,
    title: "How to avoid layout shifts (CLS) when loading responsive images in Next.js 16?",
    category: "Next.js & React",
    author: "Tanvir Hasan",
    avatar: "T",
    replies: 14,
    upvotes: 42,
    time: "25 mins ago",
    badge: "Popular",
    courseLink: "/courses/3",
    courseTitle: "Full-Stack Web Development with Next.js 16",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Understanding B-Tree vs GIN indexes in PostgreSQL: Real-world benchmark comparisons",
    category: "PostgreSQL",
    author: "Nafis Fuad",
    avatar: "N",
    replies: 28,
    upvotes: 67,
    time: "1 hour ago",
    badge: "Staff Pick",
    courseLink: "/courses/4",
    courseTitle: "PostgreSQL & Database Performance Tuning",
    createdAt: new Date().toISOString(),
  },
];

async function getDiscussionsData(): Promise<Discussion[]> {
  try {
    const res = await api.get<ApiResponse<Discussion[]>>("/community", {
      revalidate: 60,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch discussions from database API:", err);
    return FALLBACK_DISCUSSIONS;
  }
}

export default async function CommunityPage() {
  const discussions = await getDiscussionsData();

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Community Discussions
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
            Ask technical questions, share project solutions, and learn with peers.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-700 dark:hover:bg-neutral-200 transition-colors min-h-11"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Discussion
        </button>
      </div>

      <div className="space-y-3.5">
        {discussions.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {item.avatar}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 dark:bg-neutral-900 dark:text-neutral-300">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-neutral-500">
                    {item.time}
                  </span>
                </div>

                <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1 flex items-center gap-1.5 truncate">
                  <span>Started by <strong className="font-medium text-gray-700 dark:text-neutral-300">{item.author}</strong></span>
                  {item.courseTitle && (
                    <>
                      <span>·</span>
                      <Link href={item.courseLink || "/courses"} className="hover:underline truncate text-gray-400 dark:text-neutral-500">
                        Course: {item.courseTitle}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:flex-shrink-0 self-end sm:self-center border-t sm:border-t-0 border-gray-50 dark:border-neutral-900 pt-2 sm:pt-0">
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-neutral-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                <span className="font-semibold text-gray-700 dark:text-neutral-200">{item.upvotes}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-neutral-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{item.replies} replies</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
