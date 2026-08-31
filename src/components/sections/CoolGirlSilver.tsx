"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { chipFor, collectionProducts } from "@/lib/catalog";

const KAVACH = {
  handle: "kavach",
  title: "Kavach",
  copy: "Earthy stones for strength, grounding, courage and quiet power — Tiger Eye, Blood Stone, Black Banded Agate and more, set in 925 sterling silver as a protective piece worn close.",
};

/**
 * Compact category-strip band: heading + tagline on the left, a row of
 * circular picks on the right. The row is an infinite drag loop — one real
 * set of picks rendered three times back to back; once the drag passes a
 * full set's width in either direction, the position silently wraps by
 * exactly one set-width, so the circles appear to repeat forever with no
 * visible seam or snap-back.
 */
export default function CoolGirlSilver() {
  const edit = KAVACH;
  const picks = collectionProducts(edit.handle);
  const loop = picks.length > 0 ? [...picks, ...picks, ...picks] : [];

  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [setWidth, setSetWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!setRef.current) return;
    const width = setRef.current.getBoundingClientRect().width;
    setSetWidth(width);
    x.set(-width);
  }, [picks.length]);

  useMotionValueEvent(x, "change", (latest) => {
    if (!setWidth) return;
    if (latest <= -setWidth * 2) x.set(latest + setWidth);
    else if (latest > 0) x.set(latest - setWidth);
  });

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

        {/* Clamps the draggable track to this box so it can never spill past
            the card's edge — the loop-wrap above is what makes it feel
            endless, this is just the visible window onto it. */}
        <div ref={trackRef} className="w-full flex-1 overflow-hidden">
          <Stagger as="div" className="flex w-full justify-center md:justify-start">
            <motion.div
              drag="x"
              style={{ x }}
              dragConstraints={setWidth ? { left: -setWidth * 2, right: 0 } : undefined}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              className={`flex w-max gap-10 lg:gap-12 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              {loop.map((p, i) => (
                <div key={`${p.handle}-${i}`} ref={i === picks.length ? setRef : undefined} className="contents">
                  <StaggerItem className="flex w-28 shrink-0 flex-col items-center gap-3 text-center md:w-32 lg:w-36">
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
                </div>
              ))}
            </motion.div>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
