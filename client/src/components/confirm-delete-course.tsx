"use client";

import { useState } from "react";
import { deleteCourseAction } from "@/actions/course";

interface ConfirmDeleteCourseProps {
  courseId: number;
  courseTitle: string;
}

export function ConfirmDeleteCourse({ courseId, courseTitle }: ConfirmDeleteCourseProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    const result = await deleteCourseAction(courseId);
    if (!result.success) {
      setError(result.error ?? "Failed to delete.");
      setLoading(false);
    }
    // On success, Server Action revalidates — page re-renders automatically
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded hover:bg-red-50"
      >
        Delete
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6 z-10">
            <h2
              id="delete-dialog-title"
              className="text-base font-semibold text-gray-900 mb-2"
            >
              Delete course?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              <span className="font-medium text-gray-700">&ldquo;{courseTitle}&rdquo;</span>{" "}
              and all its lectures will be permanently removed. This cannot be undone.
            </p>

            {error && (
              <p role="alert" className="text-sm text-red-500 mb-4">
                {error}
              </p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-60 transition-colors"
              >
                {loading ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
