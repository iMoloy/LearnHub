export default function CourseDetailLoading() {
  return (
    <div className="max-w-5xl">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-5" />

      {/* Hero skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <div className="h-7 bg-gray-200 rounded w-3/4" />
            <div className="h-7 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
            <div className="flex gap-3 mt-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded mt-2" />
            <div className="h-10 w-32 bg-gray-200 rounded-lg mt-2" />
          </div>
          <div className="w-full md:w-80 aspect-video bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Lecture list skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
        <div className="h-5 w-36 bg-gray-200 rounded mb-5" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
