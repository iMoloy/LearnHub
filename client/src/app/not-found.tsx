import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <span className="text-3xl font-bold text-gray-300">404</span>
      </div>
      <h1 className="text-lg font-semibold text-gray-700 mb-1">
        Page not found
      </h1>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
