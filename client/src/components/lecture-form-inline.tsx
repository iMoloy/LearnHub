"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/types";

interface LectureFormInlineProps {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  submitLabel?: string;
  defaultPosition?: number;
  defaultValues?: {
    title?: string;
    description?: string;
    videoUrl?: string;
    position?: number;
  };
}

const initialState: ActionResult = { success: false };

export function LectureFormInline({
  action,
  submitLabel = "Save",
  defaultPosition = 0,
  defaultValues,
}: LectureFormInlineProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {!state.success && state.error && (
        <div role="alert" className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="lec-title" className="block text-sm font-medium text-gray-700 mb-1.5">
          Title <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="lec-title"
          name="title"
          type="text"
          required
          defaultValue={defaultValues?.title}
          placeholder="e.g. Introduction to UX"
          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-300 transition"
        />
      </div>

      <div>
        <label htmlFor="lec-videoUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
          YouTube URL <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="lec-videoUrl"
          name="videoUrl"
          type="url"
          required
          defaultValue={defaultValues?.videoUrl}
          placeholder="https://www.youtube.com/watch?v=…"
          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-300 transition"
        />
      </div>

      <div>
        <label htmlFor="lec-description" className="block text-sm font-medium text-gray-700 mb-1.5">
          Description
        </label>
        <textarea
          id="lec-description"
          name="description"
          rows={3}
          defaultValue={defaultValues?.description}
          placeholder="What will students learn in this lecture?"
          className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-300 transition resize-none"
        />
      </div>

      <input
        type="hidden"
        name="position"
        value={defaultValues?.position ?? defaultPosition}
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-60 transition-colors min-h-11"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
