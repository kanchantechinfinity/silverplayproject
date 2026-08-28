"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { edits } from "@/data/site";
import { getProduct } from "@/lib/catalog";

const VIDEO_SRC =
  "https://silverplay.in/cdn/shop/videos/c/vp/c5fe9793d6c74021a90c8c9f4d48fb85/c5fe9793d6c74021a90c8c9f4d48fb85.HD-720p-3.0Mbps-88733085.mp4?v=0";

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="h-4 w-4"
    >
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function EffortlessElegance() {
  const edit = edits.find((e) => e.handle === "festive-wedding-collection")!;
  const picks = (edit.picks ?? [])
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="bg-bone-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1.15fr] md:items-stretch md:gap-10 md:h-[560px] lg:h-[640px] lg:gap-14">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow text-ash-3">The Edit</p>
            </Reveal>
            <SplitText
              text={edit.title}
              className="mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05] text-ink"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-sm font-body text-[1rem] leading-relaxed text-ink/60">
                {edit.copy}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href={`/collections/${edit.handle}`}
                className="group mt-7 inline-flex items-center gap-2 font-display text-[0.64rem] uppercase tracking-[0.22em] text-ink/70 transition-colors duration-500 hover:text-ink"
              >
                Shop The Edit
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Thumbnail stack — real picks from the edit, quick-view icon on hover */}
          <Stagger className="flex flex-row justify-center gap-4 md:h-full md:flex-col md:justify-between md:gap-5">
            {picks.map((p) => (
              <StaggerItem key={p.handle} className="md:flex-1">
                <Link
                  href={`/products/${p.handle}`}
                  aria-label={`View ${p.title}`}
                  className="group relative block h-24 w-24 overflow-hidden rounded-[var(--radius-sm)] sm:h-28 sm:w-28 md:h-full md:w-32 lg:w-36"
                >
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="6rem"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-bone opacity-0 transition-all duration-400 group-hover:bg-ink/40 group-hover:opacity-100">
                    <EyeIcon />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Video */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] md:aspect-auto md:h-full">
            <video
              className="h-full w-full object-cover"
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
