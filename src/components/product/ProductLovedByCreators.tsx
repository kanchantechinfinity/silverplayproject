"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import type { Product } from "@/lib/catalog";

const PROFILE_URL = "https://www.instagram.com/thesilverplay/";

/** Instagram Reels don't exist as embeddable assets in this dataset (no
 *  video files, no post IDs) — same honest constraint InstagramSlider
 *  already works within. Real product photography styled as Reels
 *  thumbnails (play glyph, creator handle), linking out to the real
 *  profile rather than faking playable <video> sources. */
export default function ProductLovedByCreators({ picks }: { picks: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  if (picks.length === 0) return null;

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">In The Wild</p>
          </Reveal>
          <SplitText
            text="Loved By Creators"
            className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] text-bone"
          />
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-md font-body text-[0.95rem] text-bone/55">
              Real Silver Play pieces, styled by the people who wear them — from @thesilverplay.
            </p>
          </Reveal>
        </div>

        <div ref={trackRef} className="mt-12 w-full overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            className={`flex w-max gap-5 md:gap-6 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            {picks.map((p) => (
              <Link
                key={p.handle}
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onClickCapture={(e) => dragging && e.preventDefault()}
                className="group relative block w-40 shrink-0 overflow-hidden rounded-[var(--radius-md)] p-[3px] transition-transform duration-500 sm:w-48"
                style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)" }}
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-ink-2">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 10rem, 12rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c130b]/85 via-[#1c130b]/10 to-transparent" />

                  <span className="absolute inset-0 grid place-items-center opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-bone/50 bg-[#1c130b]/50 backdrop-blur-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-bone" aria-hidden>
                        <path d="M8 5v14l11-7Z" />
                      </svg>
                    </span>
                  </span>

                  <p className="absolute inset-x-0 bottom-0 truncate p-3 font-display text-[0.6rem] uppercase tracking-[0.1em] text-bone">
                    @thesilverplay
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <Link
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#8a6a2e]/40 px-6 py-3 font-display text-[0.62rem] uppercase tracking-[0.22em] text-bone/70 transition-colors duration-500 hover:border-bone/60 hover:text-bone"
          >
            See More On Instagram
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
