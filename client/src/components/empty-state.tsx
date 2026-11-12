interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No courses yet",
  description = "Check back later — new courses are added regularly.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-400"
          aria-hidden="true"
        >
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-gray-700 mb-1">{title}</h2>
      <p className="text-sm text-gray-400 max-w-xs">{description}</p>
    </div>
  );
}
