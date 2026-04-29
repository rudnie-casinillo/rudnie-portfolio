"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Star, ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { projectsData } from "@/data/projects";

const statusStyles = {
  completed: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  "in-progress": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  planned: "bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-400",
};

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

const categoryStyles: Record<string, string> = {
  Networking: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  Cybersecurity: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  "Home Lab": "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
};

export function Projects() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null);
      if (e.key === "ArrowLeft") setLightbox((prev) => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const featured = projectsData.find((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  const portal = lightbox && mounted
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => setLightbox(null)}
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt={`Project image ${lightbox.index + 1}`}
            className="rounded-xl shadow-2xl object-contain"
            style={{ maxWidth: "85vw", maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {lightbox.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev ? { ...prev, index: idx } : null); }}
                className={`w-2 h-2 rounded-full transition-all ${idx === lightbox.index ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
          <span className="text-xs text-gray-400 dark:text-gray-500">{projectsData.length} project{projectsData.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Featured project */}
        {featured && (
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 mb-4">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                    <Star className="w-3 h-3" /> Featured
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${categoryStyles[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-2">
                  {featured.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Image thumbnail grid */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {featured.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightbox({ images: featured.images, index: idx })}
                      className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group relative"
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`Project screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {idx === 0 && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Images className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Click any image to view full size
                </p>
              </div>

              <span className={`text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0 ${statusStyles[featured.status as keyof typeof statusStyles]}`}>
                {statusLabels[featured.status as keyof typeof statusLabels]}
              </span>
            </div>
          </div>
        )}

        {/* 3-column grid for remaining projects */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                    {project.title}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${statusStyles[project.status as keyof typeof statusStyles]}`}>
                    {statusLabels[project.status as keyof typeof statusLabels]}
                  </span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-md w-fit mb-2 ${categoryStyles[project.category]}`}>
                  {project.category}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.images.length > 0 && (
                  <button
                    onClick={() => setLightbox({ images: project.images, index: 0 })}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium transition-colors mt-auto"
                  >
                    View Images <Images className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
      {portal}
    </>
  );
}