"use client";

import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { HeritageCornerMark } from "@/components/heritage/deckle";

/** Real contents, not invented ones — the pouch and polishing cloth are the
 *  same items already promised in ProductInfoAccordion's care instructions
 *  and AssuranceBar's "digital QR certificate" sitewide. */
const ITEMS = [
  {
    title: "Your Silver Play Piece",
    copy: "Individually assayed and laser-hallmarked before it ships.",
    icon: (
      <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3Z" />
    ),
  },
  {
    title: "BIS Hallmark Certificate",
    copy: "A digital QR card verifying purity and provenance.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 9h6M7 13h4" />
        <circle cx="17" cy="14" r="2.4" />
      </>
    ),
  },
  {
    title: "Anti-Tarnish Pouch",
    copy: "Airtight storage that keeps the shine for years.",
    icon: (
      <path d="M6 9V7a6 6 0 0 1 12 0v2M4 9h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 9Z" />
    ),
  },
  {
    title: "Silver Polishing Cloth",
    copy: "For the gentle at-home clean between wears.",
    icon: <path d="M5 4h11l3 3v13H5V4Z M16 4v3h3" />,
  },
];

export default function ProductBoxContents() {
  return (
    <section className="border-t border-ink/10 bg-bone-2 py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div
          className="relative isolate overflow-hidden rounded-[var(--radius-lg)] p-[3px]"
          style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)" }}
        >
          <div className="relative rounded-[calc(var(--radius-lg)-3px)] bg-[#f8f0da] px-6 py-10 md:px-12 md:py-12">
            <HeritageCornerMark className="pointer-events-none absolute right-4 top-4 h-6 w-6 -scale-x-100 opacity-50" />
            <HeritageCornerMark className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 -scale-y-100 opacity-50" />

            <div className="text-center">
              <Reveal>
                <p className="eyebrow text-[#8a6a2e]">Unboxing</p>
              </Reveal>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] text-ink">
                What&apos;s Inside The Box
              </h2>
            </div>

            <Stagger className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {ITEMS.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-[#8a6a2e]/35 bg-bone text-[#8a6a2e]" aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                    </span>
                    <p className="font-display text-[0.78rem] uppercase tracking-[0.06em] text-ink">
                      {item.title}
                    </p>
                    <p className="font-body text-[0.78rem] leading-snug text-ink/55">{item.copy}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
