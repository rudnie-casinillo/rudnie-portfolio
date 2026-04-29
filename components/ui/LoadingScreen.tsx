"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) return;

    setLoading(true);
    sessionStorage.setItem("hasVisited", "true");

    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const hideTimer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-zinc-900 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">R</span>
        </div>
        <p className="text-white font-semibold text-lg tracking-wide">Rudnie Casinillo</p>
        <div className="w-48 h-1 bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-loading-bar" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loadingBar 1.4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}