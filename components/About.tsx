"use client";

import { Monitor, Shield, Network } from "lucide-react";

const b = (text: string) => (
  <span className="text-blue-600 dark:text-blue-400 font-semibold">{text}</span>
);

const focusAreas = [
  "Routing & Switching",
  "Subnetting",
  "Firewalls",
  "Network Protocols",
];

const pursuing = [
  { label: "CCNA", type: "cert" },
  { label: "CompTIA Security+", type: "cert" },
  { label: "Network Engineer", type: "goal" },
  { label: "Cybersecurity Analyst", type: "goal" },
];                          

const ojtTargets = [
  {
    icon: Network,
    title: "Network Engineering Opportunities",
    sub: "Routing, switching, infrastructure design & implementation",
  },
  {
    icon: Shield,
    title: "Cybersecurity Opportunities",
    sub: "Threat analysis, IDS/IPS, protecting critical infrastructure",
  },
  {
    icon: Monitor,
    title: "Tech Support Opportunities",
    sub: "Desktop support, network diagnostics, hardware/software troubleshooting & documentation",
  },
];

export function About() {
  return (
    <div className="md:col-span-7 bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 transition-all hover:shadow-lg flex flex-col gap-5">

      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        About me
      </p>

      {/* Intro */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed -mt-2">
        Hi, I'm {b("Rudnie")} — a {b("computer engineering student")} with a growing passion for{" "}
        {b("networking")} and {b("cybersecurity")}. My background in {b("low-level hardware")} and{" "}
        {b("embedded systems")} gives me a unique perspective on how data moves between devices —
        and how to {b("secure those paths")} against threats. I enjoy breaking down complex network
        problems, understanding how systems communicate, and finding ways to {b("defend them")} from
        the inside out. I believe the best engineers never stop learning — and I'm just getting
        started.
      </p>

      <div className="h-px bg-gray-200 dark:bg-zinc-700" />

      {/* Focus areas + Pursuing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5">
            Focus areas
          </p>
          <div className="flex flex-wrap gap-1.5">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5">
            Pursuing
          </p>
          <div className="flex flex-wrap gap-1.5">
            {pursuing.map(({ label, type }) => (
              <span
                key={label}
                className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                  type === "cert"
                    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                    : "bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-zinc-700" />

      {/* OJT targets */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5">
          Looking for
        </p>
        <div className="flex flex-col gap-2">
          {ojtTargets.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex items-start gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}