"use client";

import { Briefcase } from "lucide-react";
import { experienceData } from "@/data/experience";

export function Experience() {
  return (
    <div className="md:col-span-5 bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 transition-all hover:shadow-lg">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2 mb-5">
        <Briefcase className="w-4 h-4 text-blue-600" />
        Work Experience
      </h2>

      <div className="relative pl-7">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-zinc-700" />

        {experienceData.map((exp, idx) => (
          <div key={exp.id}>
            <div className="group relative mb-6 last:mb-0 -ml-2 rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-700/50 cursor-default">

              {/* Dot */}
              <div className="absolute left-[-20px] top-3">
                <div className="w-4 h-4 rounded-full bg-white dark:bg-zinc-800 border-2 border-blue-500 flex items-center justify-center transition-all duration-200 group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgba(37,99,235,0.15)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {exp.title}
                </h3>
                <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
                  {exp.year}
                </span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.company}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">{exp.description}</p>
              <ul className="space-y-1.5">
                {exp.highlights.map((highlight, hidx) => (
                  <li key={hidx} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                    <span className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Separator */}
            {idx < experienceData.length - 1 && (
              <div className="h-px bg-gray-200 dark:bg-zinc-700 mb-6 ml-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}