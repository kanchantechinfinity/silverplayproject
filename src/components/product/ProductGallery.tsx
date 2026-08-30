"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse sm:gap-5">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] p-[3px] sm:flex-1"
        style={{
          background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-lg)-3px)] bg-bone-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 44vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] ring-2 transition-all duration-300 sm:h-20 sm:w-20",
                active === i ? "ring-[#8a6a2e]" : "ring-transparent hover:ring-[#8a6a2e]/40",
              )}
            >
              <Image src={src} alt="" fill sizes="5rem" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
