"use client";

import { Award, ExternalLink } from "lucide-react";
import { certificationsData } from "@/data/certifications";

export function Certifications() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
        <Award className="w-5 h-5 text-blue-600" />
        Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificationsData.map((cert, idx) => (
          <a
            key={idx}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-zinc-700/50 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900 dark:text-white">{cert.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {cert.issuer} • {cert.date}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}