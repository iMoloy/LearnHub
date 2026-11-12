import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { VideoPlayer } from "@/components/video-player";
import { LectureList } from "@/components/lecture-list";
import { api } from "@/lib/api";
import type { CourseWithLectures } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getCourse(id: string): Promise<CourseWithLectures | null> {
  try {
    const res = await api.get<{ success: true; data: CourseWithLectures }>(
      `/api/courses/${id}`,
      { tags: ["courses", `course-${id}`], revalidate: 60 }
    );
    return res.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [{ url: course.thumbnailUrl }],
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) notFound();

  const price = parseFloat(course.price);
  const discounted =
    course.discountPercent != null
      ? price * (1 - course.discountPercent / 100)
      : null;

  return (
    <div className="max-w-5xl">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-gray-400">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/courses" className="hover:text-gray-600 transition-colors">
              Course
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full truncate max-w-[240px]">
              {course.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero section */}
      <div className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {course.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
              {course.duration && (
                <span className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  {course.duration}
                </span>
              )}
              {course.updatedAt && (
                <span className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Last updated on{" "}
                  {new Date(course.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-5">
              {discounted != null ? (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-xl font-bold text-amber-600">
                    ${discounted.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            <a
              href="#course-content"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors min-h-11"
            >
              Start Learning
            </a>
          </div>

          {/* Right: thumbnail / video */}
          <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
            {course.lectures.length > 0 ? (
              <VideoPlayer
                videoUrl={course.lectures[0].videoUrl}
                title={course.lectures[0].title}
              />
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div id="course-content" className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
          Course Content
        </h2>
        <LectureList lectures={course.lectures} />
      </div>
    </div>
  );
}
