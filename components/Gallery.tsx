"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { galleryImages } from "@/data/gallery";

const doubled = [...galleryImages, ...galleryImages];

export function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          aria-label="Image preview"
          className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            onClick={() => setSelected(null)}
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selected}
            alt="Preview"
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
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 mb-6 transition-all hover:shadow-lg overflow-hidden">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Gallery</h2>

        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 w-max"
            style={{
              animation: "scroll 30s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {doubled.map((img, idx) => (
              <button
                key={idx}
                className="w-64 h-48 rounded-xl flex-shrink-0 overflow-hidden border border-gray-200 dark:border-zinc-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setSelected(img.src)}
                aria-label={`View image: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={256}
                  height={192}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </button>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {lightbox}
    </>
  );
}