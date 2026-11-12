import Link from "next/link";

interface SectionPlaceholderProps {
  title: string;
  description: string;
}

export function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <section className="max-w-2xl mx-auto mt-8 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center mx-auto mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-gray-500 dark:text-neutral-400"
          aria-hidden="true"
        >
          <path d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-neutral-400 mb-6">
        {description}
      </p>
      <Link
        href="/courses"
        className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors min-h-11"
      >
        Browse Courses
      </Link>
    </section>
  );
}
