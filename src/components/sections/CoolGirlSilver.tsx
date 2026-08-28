"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { edits } from "@/data/site";
import { chipFor, collectionProducts } from "@/lib/catalog";

/**
 * Compact category-strip band, matching the client's "Explore More" reference:
 * heading + tagline on the left, a row of circular picks on the right — the
 * row is drag-scrollable (mouse-drag or touch-swipe, same gesture), clamped
 * to its own container so it can never spill past the card's edge, and it
 * simply stops wherever it's released rather than springing back or coasting.
 */
export default function CoolGirlSilver() {
  const edit = edits.find((e) => e.handle === "quiet-luxury-2")!;
  const picks = collectionProducts(edit.handle, 5);

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <section className="mx-auto max-w-[1500px] px-5 md:px-10">
      <div className="flex flex-col items-center gap-10 overflow-hidden rounded-[var(--radius-xl)] bg-ink px-6 py-12 md:flex-row md:gap-10 md:px-12 md:py-14">
        <div className="shrink-0 text-center md:text-left">
          <Reveal>
            <p className="eyebrow text-ash-3">The Edit</p>
          </Reveal>
          <SplitText
            text={edit.title}
            className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] text-bone"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-3 max-w-xs font-body text-[0.95rem] leading-relaxed text-bone/55 md:mx-0">
              {edit.copy}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href={`/collections/${edit.handle}`}
              className="group mt-6 inline-flex items-center gap-2 font-display text-[0.62rem] uppercase tracking-[0.22em] text-bone/70 transition-colors duration-500 hover:text-bone"
            >
              Shop The Edit
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Clamps the draggable track to this box — the track can never be
            pulled (or overflow) past this container's own edges. Note the
            draggable element must size to its own content (w-max), not
            stretch to fill the container, or Framer sees "content == box"
            and there's nothing left to drag. */}
        <div ref={trackRef} className="w-full flex-1 overflow-hidden">
          <Stagger as="div" className="flex w-full justify-center md:justify-start">
            <motion.div
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              className={`flex w-max gap-10 lg:gap-12 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              {picks.map((p) => (
                <StaggerItem
                  key={p.handle}
                  className="flex w-28 shrink-0 flex-col items-center gap-3 text-center md:w-32 lg:w-36"
                >
                  <Link
                    href={`/products/${p.handle}`}
                    draggable={false}
                    onClickCapture={(e) => dragging && e.preventDefault()}
                    className="group relative block aspect-square w-28 overflow-hidden rounded-full ring-1 ring-bone/15 transition-shadow duration-500 hover:ring-bone/40 md:w-32 lg:w-36"
                  >
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      sizes="9rem"
                      draggable={false}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  <p className="font-display text-[0.6rem] uppercase tracking-[0.16em] text-bone/60">
                    {chipFor(p)}
                  </p>
                </StaggerItem>
              ))}
            </motion.div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
