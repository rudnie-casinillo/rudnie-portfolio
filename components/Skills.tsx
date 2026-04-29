"use client";

import { Network, Shield, Wrench, Monitor, Users } from "lucide-react";
import { skillsData } from "@/data/skills";

const iconMap = {
  Network,
  Shield,
  Wrench,
  Monitor,
  Users,
};

const levelStyles = {
  proficient: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  familiar: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  learning: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
};

export function Skills() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tech Stack & Skills</h2>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4">
          {[
            { label: "Proficient", color: "bg-blue-500" },
            { label: "Familiar", color: "bg-green-500" },
            { label: "Learning", color: "bg-amber-500" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Object.entries(skillsData).map(([key, category]) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          return (
            <div key={key}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                      levelStyles[item.level as keyof typeof levelStyles]
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
        Proficiency levels are self-assessed based on hands-on experience and coursework.
      </p>

    </div>
  );
}