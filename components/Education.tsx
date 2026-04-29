"use client";

import { GraduationCap, Trophy } from "lucide-react";
import { educationData, achievementsData } from "@/data/education";

const coursework = [
  "Data Communications",
  "Network Security",
  "Microcontrollers",
  "Computer Architecture",
  "Embedded Systems",
  "Operating Systems",
];

export function Education() {
  const edu = educationData[0];

  return (
    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

        {/* Left: School card */}
        <div className="flex flex-col h-full">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Education
          </h2>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-0.5">
              {edu.degree}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
              {edu.school} · {edu.year}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
              {edu.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {edu.highlights.map((h, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Relevant Coursework */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Relevant Coursework
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {coursework.map((course) => (
                  <div
                    key={course}
                    className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-3 gap-2 mt-auto">
              {[
                { val: achievementsData[0]?.gwa ?? "—", label: "Current GWA" },
                { val: "4th", label: "Year level" },
                { val: `${achievementsData.length}×`, label: "Recognized" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-2.5 text-center"
                >
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {val}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Honors badges */}
        <div className="flex flex-col h-full">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-yellow-500" />
            Academic honors
          </h2>
          <div className="flex flex-col flex-1 justify-between gap-2">
            {achievementsData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.period}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    GWA:{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      {item.gwa}
                    </span>
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    item.awardColor === "blue"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  }`}
                >
                  {item.award}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}