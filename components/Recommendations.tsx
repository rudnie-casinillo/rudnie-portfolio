"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { recommendationsData } from "@/data/recommendations";

const avatarColors: Record<string, string> = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  purple: "bg-purple-600",
  amber: "bg-amber-600",
  red: "bg-red-600",
};

const badgeColors: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
  amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  red: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
};

const PER_PAGE = 3;

export function Recommendations() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(recommendationsData.length / PER_PAGE);
  const current = recommendationsData.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recommendations
        </h2>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center hover:border-blue-400 dark:hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center hover:border-blue-400 dark:hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
        What colleagues, mentors, and supervisors say
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {current.map((rec) => (
          <div
            key={rec.id}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col gap-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400 opacity-40" />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
              {rec.message}
            </p>
            <div className="h-px bg-gray-100 dark:bg-zinc-700" />
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${avatarColors[rec.color]}`}>
                {rec.initial}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {rec.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {rec.role}
                </p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${badgeColors[rec.color]}`}>
                  {rec.relation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              className={`rounded-full transition-all ${
                idx === page
                  ? "w-4 h-1.5 bg-blue-600"
                  : "w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-600"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
}//