"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { journal, heritage } from "@/data/site";

const RADIUS = 680; // px the side cards sit back/inward, in 3D space
const ANGLE = 40; // degrees each neighbouring card rotates away from facing the viewer
const SPACING = 0.52; // horizontal step between card slots, as a fraction of RADIUS — tight enough that neighbours overlap, not float apart

type Card = {
  key: string;
  href: string;
  image: string;
  title: string;
};

/**
 * Six real stories: the three published Journal posts plus three heritage
 * collections — both are genuine editorial content on the live site, just
 * living under different sections there. No invented posts or imagery.
 */
function useShowcase(): Card[] {
  return useMemo(() => {
    const posts: Card[] = journal.map((p) => ({
      key: p.slug,
      href: `/journal/${p.slug}`,
      image: p.image,
      title: p.title,
    }));

    const stories: Card[] = heritage.slice(0, 3).map((h) => ({
      key: h.handle,
      href: `/collections/${h.handle}`,
      image: h.image,
      title: h.title,
    }));

    // Interleave rather than block the two sets, so the ring doesn't read as
    // "journal half, then heritage half" as it loops.
    const merged: Card[] = [];
    for (let i = 0; i < 3; i++) {
      merged.push(posts[i]);
      merged.push(stories[i]);
    }
    return merged;
  }, []);
}

/** Shortest signed distance from `index` to continuous position `p` around
 *  an N-slot ring — e.g. for N=6, an index "behind" p by 1 slot reads as
 *  -1, whether that's because p just passed it or is about to wrap onto it.
 *  This one function is what makes the arc loop seamlessly instead of
 *  resetting at the ends. */
function ringOffset(index: number, p: number, n: number) {
  const raw = index - p;
  return raw - n * Math.round(raw / n);
}

export default function JournalShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cards = useShowcase();
  const n = cards.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.0005,
  });

  // One full pass around the ring across the pinned track. Combined with
  // ringOffset's wraparound math, the last card eases straight back into
  // the first rather than the carousel stopping dead at either end.
  const position = useTransform(smooth, [0, 1], [0, n]);

  useMotionValueEvent(position, "change", (p) => {
    const i = ((Math.round(p) % n) + n) % n;
    setActive((prev) => (prev === i ? prev : i));
  });

  const goTo = useCallback(
    (index: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wrapped = ((index % n) + n) % n;
      const travel = wrap.offsetHeight - window.innerHeight;
      const top = wrap.offsetTop + (wrapped / n) * travel;
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(top, { duration: 1 });
      else window.scrollTo({ top, behavior: "smooth" });
    },
    [n],
  );

  return (
    <section
      ref={wrapRef}
      className="relative bg-bone"
      style={{ height: `${(n + 0.6) * 82}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-2xl px-5 pb-2 pt-8 text-center md:pt-10">
          <Reveal>
            <p className="eyebrow text-ash-3">From The Journal</p>
          </Reveal>
          <SplitText
            text="Stories, Worn as Silver"
            className="mt-2 text-[clamp(1.5rem,3.2vw,2.3rem)] text-ink"
          />
        </div>

        <div
          className="relative flex flex-1 items-center justify-center"
          style={{ perspective: "1800px" }}
        >
          <div
            className="relative h-[84vh] w-[min(42vw,540px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cards.map((card, i) => (
              <ArcCard
                key={card.key}
                card={card}
                position={position}
                index={i}
                total={n}
                isActive={i === active}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-3 pb-12">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Previous story"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:border-ink/40"
          >
            &larr;
          </button>
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next story"
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bone transition-all duration-500 hover:bg-ink-3"
          >
            &rarr;
          </button>

          <Link
            href="/journal"
            className="group ml-4 inline-flex items-center gap-2 font-display text-[0.62rem] uppercase tracking-[0.22em] text-ink/55 transition-colors duration-500 hover:text-ink"
          >
            Read The Journal
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArcCard({
  card,
  position,
  index,
  total,
  isActive,
}: {
  card: Card;
  position: MotionValue<number>;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const offset = useTransform(position, (p) => ringOffset(index, p, total));

  const rotateY = useTransform(offset, (o) => `${o * -ANGLE}deg`);
  const x = useTransform(offset, (o) => `${o * (RADIUS * SPACING)}px`);
  const z = useTransform(offset, (o) => -Math.abs(o) * RADIUS * 0.95);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 2) * 0.16);
  const opacity = useTransform(offset, (o) =>
    Math.max(0, 1 - Math.min(Math.abs(o), 2.4) * 0.42),
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x,
        rotateY,
        scale,
        opacity,
        translateZ: z,
        transformStyle: "preserve-3d",
      }}
    >
      <Link
        href={card.href}
        className="group pointer-events-auto block h-full w-full"
        tabIndex={isActive ? 0 : -1}
        aria-hidden={!isActive}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_70px_-30px_rgba(26,22,20,0.35)]">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 66vw, 340px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority={index === 0}
          />
          {/* A single bottom scrim, just enough for the one label to read —
              the reference keeps every card down to one name and one arrow,
              nothing stacked on top of the image beyond that. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-bone">
              {card.title}
            </h3>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
