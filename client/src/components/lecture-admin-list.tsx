"use client";

import { useState } from "react";
import type { Lecture } from "@/types";
import { deleteLectureAction, updateLectureAction } from "@/actions/lecture";
import { LectureFormInline } from "@/components/lecture-form-inline";

interface LectureAdminListProps {
  lectures: Lecture[];
  courseId: number;
}

export function LectureAdminList({ lectures, courseId }: LectureAdminListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  if (lectures.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-2">No lectures yet. Add one below.</p>
    );
  }

  return (
    <ol className="space-y-3">
      {lectures.map((lecture, index) => {
        const isEditing = editingId === lecture.id;
        const boundUpdate = updateLectureAction.bind(null, lecture.id, courseId);

        return (
          <li key={lecture.id} className="border border-gray-100 rounded-lg overflow-hidden">
            {/* Header row */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
              <span className="text-xs font-semibold text-gray-400 w-5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-800 truncate">
                {lecture.title}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditingId(isEditing ? null : lecture.id)}
                  className="text-xs text-gray-500 hover:text-gray-900 px-2.5 py-1 rounded border border-gray-200 hover:bg-white transition-colors"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                <DeleteLectureButton
                  lectureId={lecture.id}
                  courseId={courseId}
                  lectureTitle={lecture.title}
                />
              </div>
            </div>

            {/* Edit form */}
            {isEditing && (
              <div className="px-4 py-4 border-t border-gray-100">
                <LectureFormInline
                  action={async (prev, fd) => {
                    const result = await boundUpdate(prev, fd);
                    if (result?.success !== false) setEditingId(null);
                    return result;
                  }}
                  submitLabel="Update lecture"
                  defaultValues={{
                    title: lecture.title,
                    description: lecture.description,
                    videoUrl: lecture.videoUrl,
                    position: lecture.position,
                  }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function DeleteLectureButton({
  lectureId,
  courseId,
  lectureTitle,
}: {
  lectureId: number;
  courseId: number;
  lectureTitle: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${lectureTitle}"? This cannot be undone.`)) return;
    setLoading(true);
    await deleteLectureAction(lectureId, courseId);
    // Page revalidates automatically
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-red-500 hover:text-red-700 px-2.5 py-1 rounded border border-red-100 hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
