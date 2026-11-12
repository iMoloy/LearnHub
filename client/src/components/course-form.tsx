"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ActionResult, Course } from "@/types";

interface CourseFormProps {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  course?: Course;
  submitLabel?: string;
}

const initialState: ActionResult = { success: false };

export function CourseForm({ action, course, submitLabel = "Save course" }: CourseFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {!state.success && state.error && (
        <div role="alert" className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={course?.title}
            placeholder="e.g. Master UX Design"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
            Description <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={course?.description}
            placeholder="Describe what students will learn…"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
            Thumbnail URL <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="thumbnailUrl"
            name="thumbnailUrl"
            type="url"
            required
            defaultValue={course?.thumbnailUrl}
            placeholder="https://i.ytimg.com/vi/…/hqdefault.jpg"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
            Price ($) <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            min="0"
            step="0.01"
            defaultValue={course?.price}
            placeholder="52.00"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
          />
        </div>

        <div>
          <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700 mb-1.5">
            Discount (%)
          </label>
          <input
            id="discountPercent"
            name="discountPercent"
            type="number"
            min="0"
            max="100"
            defaultValue={course?.discountPercent ?? ""}
            placeholder="20"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
          />
        </div>

        <div>
          <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Instructor name
          </label>
          <input
            id="instructorName"
            name="instructorName"
            type="text"
            defaultValue={course?.instructorName ?? ""}
            placeholder="Eichiro D. Lucky"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1.5">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            defaultValue={course?.duration ?? ""}
            placeholder="8hr 30min"
            className="w-full px-4 py-2.5 text-base sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-300 transition"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-h-11"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin"
          className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors min-h-11 flex items-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
