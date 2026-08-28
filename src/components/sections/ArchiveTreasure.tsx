"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { heritage } from "@/data/site";
import { collectionImage, getCollection } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/** Alternating fan tilt, per column, for the collage look. */
const TILT = [
  "rotate-[-4deg]",
  "rotate-0 lg:translate-y-[-1rem]",
  "rotate-[4deg]",
];

function HeritageCard({ entry }: { entry: (typeof heritage)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const collection = getCollection(entry.handle);
  const productImage = collectionImage(entry.handle);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      aria-pressed={flipped}
      aria-label={`${entry.title} — flip to see a piece from this collection`}
      className="group block aspect-[4/5] w-full cursor-pointer [perspective:1600px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front — the collection's own archival portrait */}
        <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-xl)] shadow-[0_20px_50px_-20px_rgba(26,22,20,0.45)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            sizes="(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 16rem"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-left">
            <p className="font-deva text-[1.35rem] leading-none text-bone">
              {entry.deva}
            </p>
            <p className="mt-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-bone/70">
              {entry.title}
            </p>
          </div>
        </div>

        {/* Back — a real piece from the collection */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[var(--radius-xl)] bg-ink-2 shadow-[0_20px_50px_-20px_rgba(26,22,20,0.45)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          {productImage && (
            <Image
              src={productImage}
              alt={collection?.title ?? entry.title}
              fill
              sizes="(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 16rem"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-left">
            <p className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-bone/70">
              {entry.title}
            </p>
            <span className="mt-2 inline-flex items-center gap-2 font-display text-[0.56rem] uppercase tracking-[0.18em] text-bone underline decoration-bone/40 underline-offset-4">
              Shop The Collection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const headingWords = ["The", "Archive", "Silver", "Treasure"];

export default function ArchiveTreasure() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Text */}
        <div className="shrink-0 lg:w-[260px] xl:w-[320px] lg:pt-2">
          <Reveal>
            <p className="eyebrow text-ash-3">Heritage</p>
          </Reveal>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.2vw,3.2rem)] leading-[1.05] text-ink">
            {headingWords.map((word, i) => (
              <SplitText
                key={word}
                text={word}
                as="span"
                className="block"
                delay={i * 0.08}
              />
            ))}
          </h2>
          <Reveal delay={0.4}>
            <Link
              href={`/collections/${heritage[0].handle}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-[0.64rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3"
            >
              Shop The Collection
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Collage — 3 above, 3 below, no scroll, fanned tilt */}
        <Stagger className="grid flex-1 grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:gap-x-7 md:gap-y-14">
          {heritage.map((entry, i) => (
            <div key={entry.handle} className={cn("transition-transform duration-500", TILT[i % 3])}>
              <StaggerItem>
                <HeritageCard entry={entry} />
              </StaggerItem>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
