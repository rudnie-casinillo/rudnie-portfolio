"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "header", label: "Home" },
  { id: "about", label: "About" },
  { id: "recommendations", label: "Recommendations" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "seminars", label: "Seminars" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export function SectionNav() {
  const [active, setActive] = useState("header");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 hidden md:flex">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${label}`}
          title={label}
          className="group relative flex items-center gap-2"
        >
          {/* Dot */}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === id
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 dark:bg-zinc-600 group-hover:bg-blue-400 dark:group-hover:bg-blue-500"
            }`}
          />
          {/* Tooltip label */}
          <span className="absolute left-5 px-2 py-1 rounded-md bg-gray-900 dark:bg-zinc-700 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}