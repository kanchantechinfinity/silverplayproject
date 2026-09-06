"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { edits } from "@/data/site";
import {
  collectionProducts,
  getProduct,
  taglineFor,
  type Product,
} from "@/lib/catalog";
import { cn, inr } from "@/lib/utils";
import { DECKLE, HeritageMonument, HeritagePhotoVignette } from "@/components/heritage/deckle";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-driven carousel. The section is taller than the viewport; a sticky
 * stage inside it maps scroll progress onto the track's horizontal position,
 * so the deck swipes forward as the page moves. The arrows drive the same
 * scroll position, keeping one source of truth.
 */
export default function RoyalSimplicity() {
  const edit = edits.find((e) => e.handle === "minimalist-collection")!;

  const picks: Product[] = (edit.picks ?? [])
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));

  const items = picks.length ? picks : collectionProducts(edit.handle, 5);
  const last = Math.max(items.length - 1, 1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(340);
  const [active, setActive] = useState(0);

  /* Measure one card plus its gap so the track maths stay exact at any width. */
  useEffect(() => {
    const measure = () => {
      const el = cardRef.current;
      if (!el) return;
      const gap = parseFloat(
        getComputedStyle(el.parentElement!).columnGap || "24",
      );
      setStep(el.getBoundingClientRect().width + (Number.isNaN(gap) ? 24 : gap));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.0005,
  });

  const loopCount = Math.min(2, items.length);
  const displayItems = [
    ...items.slice(items.length - loopCount),
    ...items,
    ...items.slice(0, loopCount),
  ];

  const x = useTransform(smooth, (p) => -p * last * step - loopCount * step);

  useMotionValueEvent(smooth, "change", (p) => {
    const i = Math.round(Math.min(Math.max(p, 0), 1) * last);
    setActive((prev) => (prev === i ? prev : i));
  });

  /* Arrows move the page to the scroll offset that centres the target card. */
  const goTo = useCallback(
    (index: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;

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
      className="heritage-sec relative bg-ink pb-24 md:pb-32"
      style={{ height: `${(items.length + 1) * 85}vh` }}
      aria-roledescription="carousel"
      aria-label={edit.title}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="heritage-wallpaper text-bone-3 opacity-[0.04]" aria-hidden />
        <HeritageMonument className="pointer-events-none absolute -bottom-6 -right-8 z-[-1] h-[clamp(240px,32vw,400px)] w-auto scale-x-[-1] text-bone-3 opacity-[0.16]" />
        {/* Heading */}
        <div className="mx-auto w-full max-w-3xl px-5 pt-24 pb-8 text-center md:pt-28 md:pb-10">
          <Reveal>
            <p className="eyebrow text-ash-3">The Edit</p>
          </Reveal>
          <SplitText
            text={edit.title}
            className="mt-4 text-[clamp(1.8rem,4.2vw,3rem)] text-bone"
          />
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl font-body text-[1.02rem] leading-relaxed text-bone/55">
              {edit.copy}
            </p>
          </Reveal>
        </div>

        {/* Deck */}
        <div className="relative flex flex-1 items-center">
          <motion.div
            style={{ x }}
            className="flex items-center gap-5 pl-[calc(50vw-9rem)] will-change-transform md:gap-7 md:pl-[calc(50vw-11rem)]"
          >
            {displayItems.map((p, i) => {
              const isActive = i === active + loopCount;
              const realIndex = ((i - loopCount) % items.length + items.length) % items.length;
              return (
                <div
                  key={`${p.handle}-${i}`}
                  ref={i === 0 ? cardRef : undefined}
                  className="w-[18rem] shrink-0 cursor-pointer md:w-[22rem]"
                  aria-hidden={!isActive}
                  onClick={() => goTo(realIndex)}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.84,
                      opacity: isActive ? 1 : 0.42,
                    }}
                    whileHover={{
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.8, ease }}
                    className="relative"
                  >
                    {/* Gilt deckle mat — replaces the rounded/ring frame; the
                        same torn-paper edge used by every other homepage card. */}
                    <div
                      className={cn(
                        "p-[3px] transition-[filter] duration-500",
                        isActive ? "" : "grayscale-[15%]",
                      )}
                      style={{
                        clipPath: DECKLE,
                        background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
                        filter: isActive
                          ? "drop-shadow(0 20px 34px rgba(26,22,20,0.45))"
                          : "drop-shadow(0 6px 14px rgba(26,22,20,0.25))",
                      }}
                    >
                    <div className="relative aspect-[3/4.4] bg-ink-2" style={{ clipPath: DECKLE }}>
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 72vw, 22rem"
                        priority={i < 2}
                        className="object-cover"
                      />
                      <HeritagePhotoVignette />

                      {/* Legibility wash, deeper on the resting cards */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.55 }}
                        transition={{ duration: 0.8, ease }}
                        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                      />

                      {/* Chip */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : -8,
                        }}
                        transition={{ duration: 0.7, ease }}
                        className="absolute inset-x-0 top-5 flex justify-center"
                      >
                        <span className="rounded-full border border-bone/30 bg-ink/40 px-4 py-1.5 font-display text-[0.54rem] uppercase tracking-[0.2em] text-bone/85 backdrop-blur-md">
                          {inr(p.price)}
                        </span>
                      </motion.div>

                      {/* Label */}
                      <div className="absolute inset-x-0 bottom-0 px-5 pb-7 text-center">
                        <motion.h3
                          animate={{
                            fontSize: isActive ? "1.06rem" : "0.72rem",
                            opacity: isActive ? 1 : 0.85,
                          }}
                          transition={{ duration: 0.7, ease }}
                          className="uppercase leading-tight tracking-[0.16em] text-bone"
                        >
                          {p.title}
                        </motion.h3>
                        <motion.p
                          animate={{ opacity: isActive ? 1 : 0.5 }}
                          transition={{ duration: 0.7, ease }}
                          className="mx-auto mt-2 max-w-[24ch] font-body text-[0.86rem] italic leading-snug text-bone/65"
                        >
                          {taglineFor(p)}
                        </motion.p>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

        {/* Controls */}
        <div className="relative z-10 flex items-center justify-center gap-3 pb-12">
          <button
            onClick={() => goTo(active === 0 ? last : active - 1)}
            aria-label="Previous piece"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border border-bone/25 text-bone transition-all duration-500",
              "hover:border-bone/60",
            )}
          >
            &larr;
          </button>
          <button
            onClick={() => goTo(active === last ? 0 : active + 1)}
            aria-label="Next piece"
            className="grid h-11 w-11 place-items-center rounded-full bg-bone text-ink transition-all duration-500 hover:bg-bone-3"
          >
            &rarr;
          </button>

          <Link
            href={`/collections/${edit.handle}`}
            className="group ml-4 inline-flex items-center gap-2 font-display text-[0.62rem] uppercase tracking-[0.22em] text-bone/60 transition-colors duration-500 hover:text-bone"
          >
            Shop The Edit
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
