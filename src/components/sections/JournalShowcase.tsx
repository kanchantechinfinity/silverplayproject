"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { journal, heritage } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

type Row = {
  key: string;
  href: string;
  image: string;
  title: string;
  excerpt: string;
};

/** Hand-written editorial lines for the two heritage collections that have no
 *  storefront description on the live site — real collections, real names,
 *  just no body copy to quote. Virasat keeps its actual Shopify description. */
const heritageCopy: Record<string, string> = {
  virasat:
    "The Eternal Archive. Heritage-inspired silver jewellery rooted in tradition — temple motifs, ancestral jhumkas, and timeless Indian craftsmanship.",
  "karigari-1":
    "कारीगरी — the hand behind every piece: Jaipur's karigars, shaping sterling silver the old way.",
  "ratna-virasat-1":
    "रत्न विरासत — gemstone-set silver, drawn from generations of stone-setting tradition.",
};

/** Six real stories: the three published Journal posts interleaved with three
 *  heritage collections — both genuine editorial content on the live site. */
function useShowcase(): Row[] {
  return useMemo(() => {
    const posts: Row[] = journal.map((p) => ({
      key: p.slug,
      href: `/journal/${p.slug}`,
      image: p.image,
      title: p.title,
      excerpt: p.excerpt,
    }));

    const stories: Row[] = heritage.slice(0, 3).map((h) => ({
      key: h.handle,
      href: `/collections/${h.handle}`,
      image: h.image,
      title: h.title,
      excerpt: heritageCopy[h.handle] ?? h.deva,
    }));

    const merged: Row[] = [];
    for (let i = 0; i < 3; i++) {
      merged.push(posts[i]);
      merged.push(stories[i]);
    }
    return merged;
  }, []);
}

export default function JournalShowcase() {
  const rows = useShowcase();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">From The Journal</p>
          </Reveal>
          <SplitText
            text="Stories, Worn as Silver"
            className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] text-bone"
          />
        </div>

        <div className="relative mt-14 border-t border-bone/12">
          {rows.map((row, i) => (
            <JournalRow
              key={row.key}
              row={row}
              index={i}
              isActive={active === i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/journal"
              className="group inline-flex items-center gap-2 font-display text-[0.64rem] uppercase tracking-[0.22em] text-bone/55 transition-colors duration-500 hover:text-bone"
            >
              Read The Journal
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function JournalRow({
  row,
  index,
  isActive,
  onEnter,
  onLeave,
}: {
  row: Row;
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="group relative border-b border-bone/12"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link
        href={row.href}
        className="relative z-10 flex items-center gap-4 px-4 py-6 md:gap-8 md:px-8 md:py-7"
      >
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
          className="absolute inset-0 rounded-[var(--radius-md)]"
          style={{ background: "#d9b66c" }}
        />

        <span
          className={`relative font-display text-[0.72rem] tracking-[0.1em] transition-colors duration-400 ${
            isActive ? "text-[#241a10]/50" : "text-bone/40"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative min-w-0 flex-1">
          <h3
            className={`font-display text-[1.15rem] font-semibold leading-snug transition-colors duration-400 md:text-[1.4rem] ${
              isActive ? "text-[#241a10]" : "text-bone"
            }`}
          >
            {row.title}
          </h3>
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.p
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease }}
                className="max-w-md overflow-hidden font-body text-[0.86rem] leading-relaxed text-[#241a10]/70 md:pr-40"
              >
                {row.excerpt}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <span
          className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
            isActive
              ? "border-[#241a10]/30 text-[#241a10]"
              : "border-bone/25 text-bone group-hover:border-bone/50"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 14 14 6" />
            <path d="M7.5 6H14v6.5" />
          </svg>
        </span>
      </Link>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6, y: "-50%" }}
            animate={{ opacity: 1, scale: 1, rotate: -4, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.85, rotate: -6, y: "-50%" }}
            transition={{ duration: 0.4, ease }}
            className="pointer-events-none absolute right-24 top-1/2 z-20 hidden h-[130px] w-[96px] overflow-hidden rounded-[var(--radius-md)] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] md:block lg:h-[150px] lg:w-[112px]"
          >
            <Image
              src={row.image}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
