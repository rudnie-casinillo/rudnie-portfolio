"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, MapPin, BookOpen, X } from "lucide-react";
import { seminarsData } from "@/data/seminars";

export function Seminars() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const lightbox = selected && mounted
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
          className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            onClick={() => setSelected(null)}
            aria-label="Close certificate preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selected}
            alt="Certificate"
            className="rounded-xl shadow-2xl object-contain"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-gray-900 dark:text-white">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Seminars & Workshops
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
          Continuous learning through industry events and workshops
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seminarsData.map((seminar) => (
            <button
              key={seminar.id}
              onClick={() => seminar.certificate ? setSelected(seminar.certificate) : null}
              className={`flex gap-3 p-4 bg-gray-50 dark:bg-zinc-700/50 rounded-xl border border-gray-100 dark:border-zinc-700 transition-colors text-left w-full ${
                seminar.certificate
                  ? "hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md cursor-pointer"
                  : "cursor-default"
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white leading-snug mb-1">
                  {seminar.title}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {seminar.organizer}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {seminar.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {seminar.mode}
                  </span>
                </div>
                {seminar.certificate && (
                  <p className="text-xs text-blue-500 dark:text-blue-400 mt-2 font-medium">
                    Click to view certificate →
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {lightbox}
    </>
  );
}