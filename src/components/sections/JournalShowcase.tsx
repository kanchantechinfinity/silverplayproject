"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { journal } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const RADIUS = 560; // px the side cards sit back/inward, in 3D space
const ANGLE = 34; // degrees each neighbouring card rotates away from facing the viewer

/**
 * Journal — a scroll-driven 3D arc of cards, the same curved-coverflow read
 * as a Jesper Landberg–style showcase: flat cards individually rotated
 * around Y and pushed back in Z along an arc, not a single bent surface.
 * The active (center-facing) card is derived continuously from scroll
 * progress through a tall track, exactly like the RoyalSimplicity carousel —
 * so it scrubs with scroll rather than snapping on click.
 */
export default function JournalShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = journal.length - 1;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.0005,
  });

  // Continuous position along the arc — not an integer index — so the arc
  // eases smoothly between cards as scroll moves, rather than jumping.
  const position = useTransform(smooth, [0, 1], [0, last]);

  useMotionValueEvent(position, "change", (p) => {
    const i = Math.round(Math.min(Math.max(p, 0), last));
    setActive((prev) => (prev === i ? prev : i));
  });

  const goTo = useCallback(
    (index: number) => {
      const wrap = wrapRef.current;
      if (!wrap || last === 0) return;
      const clamped = Math.min(Math.max(index, 0), last);
      const travel = wrap.offsetHeight - window.innerHeight;
      const top = wrap.offsetTop + (clamped / last) * travel;
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(top, { duration: 1 });
      else window.scrollTo({ top, behavior: "smooth" });
    },
    [last],
  );

  return (
    <section
      ref={wrapRef}
      className="relative bg-bone"
      style={{ height: `${(journal.length + 0.6) * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-2xl px-5 pt-24 text-center md:pt-28">
          <Reveal>
            <p className="eyebrow text-ash-3">From The Journal</p>
          </Reveal>
          <SplitText
            text="Stories, Worn as Silver"
            className="mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] text-ink"
          />
        </div>

        <div
          className="relative flex flex-1 items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          <div
            className="relative h-[62vh] w-[min(76vw,380px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {journal.map((post, i) => (
              <ArcCard
                key={post.slug}
                post={post}
                position={position}
                index={i}
                isActive={i === active}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-3 pb-12">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous story"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 hover:border-ink/40 disabled:opacity-25"
          >
            &larr;
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active === last}
            aria-label="Next story"
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bone transition-all duration-500 hover:bg-ink-3 disabled:opacity-25"
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
  post,
  position,
  index,
  isActive,
}: {
  post: (typeof journal)[number];
  position: import("framer-motion").MotionValue<number>;
  index: number;
  isActive: boolean;
}) {
  // Signed distance from this card's slot to the continuous scroll position —
  // 0 when it's dead-center, ±1 for immediate neighbours, and so on. Every
  // visual property below is just a function of this one number.
  const offset = useTransform(position, (p) => index - p);

  const rotateY = useTransform(offset, (o) => `${o * -ANGLE}deg`);
  const x = useTransform(offset, (o) => `${o * (RADIUS * 0.62)}px`);
  const z = useTransform(offset, (o) => -Math.abs(o) * RADIUS * 0.9);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 2) * 0.14);
  const opacity = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 2) * 0.45);

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
        href={`/journal/${post.slug}`}
        className="pointer-events-auto block h-full w-full"
        tabIndex={isActive ? 0 : -1}
        aria-hidden={!isActive}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_70px_-30px_rgba(26,22,20,0.35)]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 76vw, 380px"
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-body text-[0.72rem] uppercase tracking-[0.18em] text-bone/60">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h3 className="mt-2 font-display text-[1.3rem] leading-snug text-bone">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 font-body text-[0.92rem] leading-relaxed text-bone/75">
              {post.excerpt}
            </p>
          </div>

          <span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
