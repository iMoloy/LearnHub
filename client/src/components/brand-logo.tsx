export function BrandMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        width="32"
        height="32"
        rx="9"
        className="fill-gray-900 dark:fill-white"
      />
      <path
        d="M8.5 11.5C8.5 10.3954 9.39543 9.5 10.5 9.5H14.5C15.3284 9.5 16 10.1716 16 11V22.5C16 21.6716 15.3284 21 14.5 21H10.5C9.39543 21 8.5 20.1046 8.5 19V11.5Z"
        className="fill-white/95 dark:fill-gray-900"
      />
      <path
        d="M23.5 11.5C23.5 10.3954 22.6046 9.5 21.5 9.5H17.5C16.6716 9.5 16 10.1716 16 11V22.5C16 21.6716 16.6716 21 17.5 21H21.5C22.6046 21 23.5 20.1046 23.5 19V11.5Z"
        className="fill-white/65 dark:fill-gray-900/65"
      />
      <circle cx="22.5" cy="9.5" r="2.25" fill="#38BDF8" />
    </svg>
  );
}

export function BrandLogo({
  collapsed = false,
  subtitle,
}: {
  collapsed?: boolean;
  subtitle?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BrandMark className="w-7 h-7 flex-shrink-0" />
      {!collapsed && (
        <span className="font-semibold text-sm tracking-tight text-gray-900 dark:text-white whitespace-nowrap">
          LearnHub
          {subtitle ? (
            <span className="ml-1.5 text-xs font-medium text-gray-400">
              {subtitle}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}
