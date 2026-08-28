"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { edits } from "@/data/site";
import { chipFor, collectionProducts } from "@/lib/catalog";

/**
 * Compact category-strip band, matching the client's "Explore More" reference:
 * heading + tagline on the left, a row of circular picks on the right.
 */
export default function CoolGirlSilver() {
  const edit = edits.find((e) => e.handle === "quiet-luxury-2")!;
  const picks = collectionProducts(edit.handle, 5);

  return (
    <section className="mx-auto max-w-[1500px] px-5 md:px-10">
      <div className="flex flex-col items-center gap-10 rounded-[var(--radius-xl)] bg-ink px-6 py-12 md:flex-row md:gap-10 md:px-12 md:py-14">
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

        <Stagger className="flex flex-1 flex-wrap justify-center gap-10 md:flex-nowrap md:justify-between lg:gap-12">
          {picks.map((p) => (
            <StaggerItem
              key={p.handle}
              className="flex w-28 flex-col items-center gap-3 text-center md:w-32 lg:w-36"
            >
              <Link
                href={`/products/${p.handle}`}
                className="group relative block aspect-square w-28 overflow-hidden rounded-full ring-1 ring-bone/15 transition-shadow duration-500 hover:ring-bone/40 md:w-32 lg:w-36"
              >
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  sizes="9rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              <p className="font-display text-[0.6rem] uppercase tracking-[0.16em] text-bone/60">
                {chipFor(p)}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
