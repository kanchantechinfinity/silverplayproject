"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import Marquee from "@/components/motion/Marquee";
import { treasures } from "@/data/site";
import { getProduct } from "@/lib/catalog";

const HANDLE = "thesilverplay";
const PROFILE_URL = "https://www.instagram.com/thesilverplay/";

function InstagramGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Real Silver Play product photography, framed as Instagram posts — the
 *  storefront has no live post-embed feed, so this reuses the same curated
 *  "As Seen & Loved" picks in a draggable, Instagram-styled strip that links
 *  out to the brand's real profile rather than inventing post-level data
 *  (likes, comments, captions) that doesn't exist. */
export default function InstagramSlider() {
  const picks = treasures.picks
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <section className="bg-bone-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-ash-3">{treasures.eyebrow}</p>
            </Reveal>
            <SplitText
              text={`@${HANDLE}`}
              className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] normal-case text-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <Link
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#8a6a2e]/40 px-6 py-3 font-display text-[0.62rem] uppercase tracking-[0.22em] text-[#6b5326] transition-colors duration-500 hover:bg-[#241a10] hover:text-[#f2e8d0]"
            >
              <InstagramGlyph className="h-4 w-4" />
              Follow on Instagram
            </Link>
          </Reveal>
        </div>

        {/* Mobile: continuous auto-scrolling strip — no drag needed to browse. */}
        <div className="mt-10 md:hidden">
          <Marquee
            speed={26}
            pauseOnHover={false}
            className="[mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
            items={picks.map((p) => (
              <Link
                key={p.handle}
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square w-40 shrink-0 overflow-hidden rounded-[var(--radius-md)] p-[3px]"
                style={{
                  background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
                }}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-bone-3">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="10rem"
                    className="object-cover"
                  />
                </span>
              </Link>
            ))}
            separator=""
          />
        </div>

        <div ref={trackRef} className="mt-10 hidden w-full overflow-hidden md:mt-14 md:block">
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
                className="group relative block w-48 shrink-0 overflow-hidden rounded-[var(--radius-md)] p-[3px] transition-transform duration-500 sm:w-56 md:w-64"
                style={{
                  background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
                }}
              >
                <div className="relative aspect-square overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-bone-3">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 12rem, 16rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c130b]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute left-3 top-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <InstagramGlyph className="h-4 w-4 text-bone" />
                    <span className="font-display text-[0.58rem] uppercase tracking-[0.14em] text-bone">
                      {HANDLE}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 text-bone">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 20.5s-7.5-4.6-9.9-9.3C.6 8 1.8 4.3 5.2 3.4c2-.5 4 .3 5.2 2 .5.7 1 1.4 1.6 2.1.6-.7 1.1-1.4 1.6-2.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.6 4.6 3.1 7.8-2.4 4.7-9.9 9.3-9.9 9.3Z" />
                      </svg>
                    </span>
                    <span className="flex items-center gap-1.5 text-bone">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 2C6.5 2 2 5.8 2 10.5c0 2.6 1.4 4.9 3.6 6.5-.1 1-.5 2.6-1.4 3.9 1.6-.2 3.3-.9 4.6-1.8 1 .3 2.1.4 3.2.4 5.5 0 10-3.8 10-8.5S17.5 2 12 2Z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
