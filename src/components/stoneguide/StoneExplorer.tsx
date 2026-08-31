"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { StoneGuideEntry } from "@/data/stoneGuide";
import { cn } from "@/lib/utils";

type Stone = StoneGuideEntry & { image: string };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Master-detail layout: a dense grid of stone thumbnails on the left, one
 * full write-up on the right that swaps on hover (desktop) or tap (touch).
 * Only ever one stone's full info is on screen at a time, so the grid stays
 * calm no matter how much copy each stone carries.
 */
export default function StoneExplorer({ stones }: { stones: Stone[] }) {
  const [activeHandle, setActiveHandle] = useState(stones[0]?.handle);
  const active = stones.find((s) => s.handle === activeHandle) ?? stones[0];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      {/* Left — thumbnail grid */}
      <div className="order-2 grid flex-1 grid-cols-3 gap-3 sm:grid-cols-4 lg:order-1 lg:grid-cols-4">
        {stones.map((s) => {
          const isActive = s.handle === active.handle;
          return (
            <button
              key={s.handle}
              type="button"
              onMouseEnter={() => setActiveHandle(s.handle)}
              onFocus={() => setActiveHandle(s.handle)}
              onClick={() => setActiveHandle(s.handle)}
              aria-pressed={isActive}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-[var(--radius-md)] outline-none transition-all duration-300",
                isActive
                  ? "opacity-100 shadow-[0_14px_30px_-12px_rgba(26,22,20,0.5)] ring-2 ring-[#8a6a2e] ring-offset-2 ring-offset-bone"
                  : "opacity-70 hover:opacity-100 focus-visible:opacity-100",
              )}
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1c130b]/85 to-transparent p-2 pt-5">
                <p className="truncate font-display text-[0.6rem] uppercase tracking-[0.05em] text-bone">
                  {s.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right — full guide for whichever stone is active */}
      <div className="order-1 lg:sticky lg:top-28 lg:order-2 lg:w-[420px] lg:shrink-0 xl:w-[460px]">
        <div
          className="rounded-[var(--radius-lg)] p-[3px]"
          style={{
            background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
          }}
        >
          <div
            className="overflow-hidden rounded-[calc(var(--radius-lg)-3px)]"
            style={{
              background: "radial-gradient(140% 160% at 15% -10%, #f8f0da 0%, #f2e8d0 45%, #e6d3a8 100%)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.handle}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 1024px) 92vw, 460px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-[1.5rem] leading-tight text-[#3a2b1c]">
                    {active.name}
                  </h3>
                  <p className="mt-1 font-body text-[0.92rem] italic text-[#8a6a2e]">
                    {active.tagline}
                  </p>

                  <p className="mt-4 font-body text-[0.94rem] leading-relaxed text-[#5c452a]">
                    {active.meaning}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {active.properties.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-[#8a6a2e]/30 bg-[#8a6a2e]/8 px-3 py-1 font-display text-[0.6rem] uppercase tracking-[0.08em] text-[#6b5326]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-5 space-y-2.5 border-t border-[#8a6a2e]/20 pt-4 font-body text-[0.84rem] leading-relaxed text-[#5c452a]">
                    <div className="flex gap-3">
                      <dt className="w-[4.5rem] shrink-0 font-display text-[0.62rem] uppercase tracking-[0.1em] text-[#8a6a2e]">
                        Wear
                      </dt>
                      <dd>{active.howToWear}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-[4.5rem] shrink-0 font-display text-[0.62rem] uppercase tracking-[0.1em] text-[#8a6a2e]">
                        Care
                      </dt>
                      <dd>{active.care}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-[4.5rem] shrink-0 font-display text-[0.62rem] uppercase tracking-[0.1em] text-[#8a6a2e]">
                        Best For
                      </dt>
                      <dd>{active.whenToWear}</dd>
                    </div>
                  </dl>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
