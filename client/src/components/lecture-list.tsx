"use client";

import { useState } from "react";
import type { Lecture } from "@/types";
import { VideoPlayer } from "@/components/video-player";

interface LectureListProps {
  lectures: Lecture[];
}

export function LectureList({ lectures }: LectureListProps) {
  const [activeId, setActiveId] = useState<number | null>(
    lectures[0]?.id ?? null
  );

  if (lectures.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-4">
        No lectures available yet.
      </p>
    );
  }

  return (
    <ol className="space-y-3">
      {lectures.map((lecture, index) => {
        const isOpen = activeId === lecture.id;

        return (
          <li
            key={lecture.id}
            className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden transition-shadow"
          >
            {isOpen ? (
              <div className="p-4 sm:p-5">
                <p className="text-xs text-gray-400 mb-1 font-medium">
                  Chapter : {index + 1}
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  {lecture.title}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors min-h-11"
                  aria-expanded={true}
                >
                  <span>Course Content</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>

                <div className="mt-4">
                  <VideoPlayer videoUrl={lecture.videoUrl} title={lecture.title} />
                  {lecture.description && (
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                      {lecture.description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setActiveId(lecture.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50/70 transition-colors min-h-11"
                aria-expanded={false}
              >
                <span className="text-sm text-gray-400 font-medium flex-shrink-0">
                  Chapter : {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-800 truncate flex-1 text-right">
                  {lecture.title}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </button>
            )}
          </li>
        );
      })}
    </ol>
  );
}
