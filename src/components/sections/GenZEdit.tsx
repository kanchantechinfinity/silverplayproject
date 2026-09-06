"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeritageEditCard from "@/components/HeritageEditCard";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";
import { collectionProducts, products } from "@/lib/catalog";

/** Newest 4 pieces by Shopify product id — the closest real signal to
 *  "just landed" this dataset has, since there's no dedicated new-arrivals
 *  collection on the live storefront. */
function newestProducts(limit: number) {
  return [...products].sort((a, b) => b.id - a.id).slice(0, limit);
}

const TABS = [
  { key: "new", label: "New Arrivals", items: () => newestProducts(8) },
  { key: "earrings", label: "Earrings", items: () => collectionProducts("earrings", 8) },
  { key: "pendants", label: "Pendants", items: () => collectionProducts("pendants", 8) },
] as const;

export default function GenZEdit() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("new");
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];
  const items = tab.items();

  return (
    <section className="heritage-sec bg-bone-3 py-24 md:py-32">
      <Image
        src="/heritage/fresh-edit-courtyard.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-[-1] object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-bone-3/72" />
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">Just Landed</p>
          </Reveal>

          <SplitText
            text="The Fresh Edit"
            className="mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink"
          />

          <Reveal delay={0.12}>
            <p className="mt-6 font-body text-[1.06rem] leading-relaxed text-ink/60 md:text-[1.12rem]">
              The newest additions to the Silver Play line — fresh cuts, fresh stones, straight from the workshop.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-ink/10 bg-bone p-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={cn(
                  "rounded-full px-6 py-3 font-display text-[0.92rem] uppercase tracking-[0.18em] transition-colors duration-400",
                  active === t.key
                    ? "bg-ink text-bone"
                    : "text-ink/55 hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger
          key={active}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          stagger={0.11}
        >
          {items.map((p, i) => (
            <StaggerItem key={p.handle} className="h-full">
              <HeritageEditCard product={p} priority={i < 2} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-[0.66rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3"
          >
            Shop {tab.label}
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
