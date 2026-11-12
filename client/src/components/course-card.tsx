import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  priority?: boolean;
}

export function CourseCard({ course, priority = false }: CourseCardProps) {
  const originalPrice = parseFloat(course.price);
  const discountedPrice =
    course.discountPercent != null
      ? originalPrice * (1 - course.discountPercent / 100)
      : null;
  const isFree = originalPrice === 0 || discountedPrice === 0;

  return (
    <article className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-3.5 flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Inset rounded thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-900 mb-3">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={priority}
        />
        {isFree && (
          <span className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            Free course
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2 px-0.5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
          {course.title}
        </h2>

        {/* Instructor */}
        {course.instructorName && (
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
              {course.instructorName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-500">by {course.instructorName}</span>
          </div>
        )}

        {/* Meta: duration + lectures */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {course.duration && (
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {course.duration}
            </span>
          )}
          {course.lectureCount != null && (
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 12h6M9 15h4" />
              </svg>
              {course.lectureCount} classes
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          {discountedPrice != null ? (
            <>
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice.toFixed(0)}
              </span>
              <span className="text-sm font-bold text-gray-900">
                ${discountedPrice.toFixed(0)}
              </span>
              <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                {course.discountPercent}% OFF
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-900">
              ${originalPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/courses/${course.id}`}
          className="mt-2 w-full text-center text-sm font-medium py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-200 min-h-11 flex items-center justify-center"
        >
          View Course
        </Link>
      </div>
    </article>
  );
}
