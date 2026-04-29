import Link from "next/link";
import { Home, Wifi } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-zinc-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center mx-auto mb-6">
          <Wifi className="w-9 h-9 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Code */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          Looks like this route doesn't exist — maybe the packet got dropped.
          Head back to the portfolio and try again.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to portfolio
        </Link>

      </div>
    </main>
  );
}