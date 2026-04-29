"use client";

import Image from "next/image";
import { useState } from "react";
import { BadgeCheck, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 md:p-8 mb-6 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start gap-6">

        {/* Profile Image */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
          {imgError ? (
            <span className="text-3xl md:text-4xl font-bold text-white">R</span>
          ) : (
            <Image
              src="/images/Rudnie.jpg"
              alt="Rudnie Casinillo"
              width={144}
              height={144}
              className="w-full h-full object-cover"
              priority
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Rudnie Casinillo
            </h1>
            <BadgeCheck className="w-6 h-6 text-blue-600 fill-blue-50" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-1 text-base">
            Computer Engineering Student · Aspiring Network Engineer & Cybersecurity
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4" />
            <span>General Trias, Cavite 4107, Philippines</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              href="mailto:casinillorudnie.lumahang@gmail.com"
              icon={<Mail className="w-4 h-4" />}
            >
              Email Me
            </Button>

            <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">
                Open to Opportunities · Network Engineering & Cybersecurity
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}