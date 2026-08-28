"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cinematicHero } from "@/data/site";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Chapter = (typeof cinematicHero.chapters)[number];

const DESKTOP_TRACK_VH = 450;
const MOBILE_TRACK_VH = 300;
/** Never assign video.currentTime for a change smaller than this — the
 *  single biggest lever against seek-flooding on fast scroll. */
const MIN_SEEK_DELTA = 1 / 30;

/**
 * Scroll-scrubbed cinematic hero. The section pins for one viewport height
 * while a tall scroll track (~4.5x viewport) maps scroll position directly
 * onto the hero video's playback position — the video never plays on its
 * own, scrolling IS the playback control.
 *
 * Renders three ways depending on what's actually available:
 *  - `prefers-reduced-motion` → static poster + copy, no pin, no video.
 *  - video file missing (checked via HEAD request) → same static fallback.
 *  - otherwise → the full pinned scroll-scrub experience.
 */
export default function CinematicHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);

    const bp = window.matchMedia("(max-width: 767px)");
    setIsMobile(bp.matches);
    const onBp = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    bp.addEventListener("change", onBp);

    return () => {
      mq.removeEventListener("change", onMq);
      bp.removeEventListener("change", onBp);
    };
  }, []);

  // Confirm a video actually exists before committing to the pinned
  // experience — a 404 mid-scroll would strand the visitor on a pinned,
  // blank stage.
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;

    const head = async (url: string) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok;
      } catch {
        return false;
      }
    };

    (async () => {
      const desktop = cinematicHero.videoSrc;
      const mobile = cinematicHero.videoSrcMobile;
      const [mobileOk, desktopOk] = await Promise.all([
        isMobile ? head(mobile) : Promise.resolve(false),
        head(desktop),
      ]);
      if (cancelled) return;
      if (isMobile && mobileOk) setResolvedSrc(mobile);
      else if (desktopOk) setResolvedSrc(desktop);
      else setVideoUnavailable(true);
      setChecked(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, isMobile]);

  const staticMode = reducedMotion || (checked && videoUnavailable);

  if (staticMode) return <StaticHero />;
  if (!checked) return <HeroSkeleton />;
  return <ScrubbingHero src={resolvedSrc!} isMobile={isMobile} />;
}

/** Pre-check placeholder — same box, no motion, avoids a layout jump. */
function HeroSkeleton() {
  return (
    <section
      className="relative h-screen w-full bg-ink"
      style={{
        backgroundImage: `url(${cinematicHero.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-hidden
    />
  );
}

/** Accessible / no-asset fallback: one static frame, copy fully visible. */
function StaticHero() {
  const final = cinematicHero.chapters.find((c) => c.id === "final");

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-ink"
      style={{
        backgroundImage: `url(${cinematicHero.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-ink/60" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="font-display text-[clamp(2.4rem,6.5vw,4rem)] font-semibold text-bone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
          {cinematicHero.chapters[0].title}
        </p>
        <p className="mt-2 max-w-xl font-body text-[1.65rem] font-semibold italic leading-snug text-bone drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
          {cinematicHero.chapters[1].title} {cinematicHero.chapters[1].sub}
        </p>
        {final?.cta && (
          <Link
            href={final.cta.href}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-bone px-9 py-[1.125rem] font-display text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-bone-3"
          >
            {final.cta.label}
            <span>&rarr;</span>
          </Link>
        )}
      </div>
    </section>
  );
}

function ScrubbingHero({ src, isMobile }: { src: string; isMobile: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const chapterEls = useRef<Record<string, HTMLDivElement | null>>({});

  const registerChapter = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      chapterEls.current[id] = el;
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let duration = 0;
    let targetProgress = 0;
    let appliedTime = -1;
    let lastAppliedTime = -1;
    let hasScrolled = false;
    let rafId = 0;

    const trackVh = isMobile ? MOBILE_TRACK_VH : DESKTOP_TRACK_VH;

    const applyChapters = (progressPct: number) => {
      for (const chapter of cinematicHero.chapters as readonly Chapter[]) {
        const el = chapterEls.current[chapter.id];
        if (!el) continue;
        const [start, end] = chapter.range;
        const fade = Math.min(2.5, (end - start) / 3);

        let opacity = 0;
        if (progressPct >= start && progressPct <= end) {
          const distIn = progressPct - start;
          const distOut = end - progressPct;
          opacity = Math.max(0, Math.min(1, distIn / fade, distOut / fade));
        }

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${14 * (1 - opacity)}px) scale(${0.985 + 0.015 * opacity})`;
        el.style.filter = `blur(${6 * (1 - opacity)}px)`;
        el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
      }
    };

    // rAF-coalesced seeking: ScrollTrigger can fire onUpdate many times per
    // frame during fast scrolling, but this loop only ever reads the latest
    // target and applies at most one seek per animation frame — never a
    // queue of stacked currentTime writes. On top of that, the applied time
    // eases toward the target rather than snapping to it, which is what
    // keeps fast scrolling feeling like a smooth cinematic scrub rather than
    // a flipbook.
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!duration || video.readyState < 2) return;
      const effectiveDuration = cinematicHero.videoTrimEndSeconds
        ? Math.min(duration, cinematicHero.videoTrimEndSeconds)
        : duration;
      const targetTime = targetProgress * effectiveDuration;

      appliedTime =
        appliedTime < 0 ? targetTime : appliedTime + (targetTime - appliedTime) * 0.3;

      if (Math.abs(appliedTime - lastAppliedTime) < MIN_SEEK_DELTA) return;
      try {
        video.currentTime = appliedTime;
        lastAppliedTime = appliedTime;
      } catch {
        /* seeking can throw mid-load in some browsers; next tick retries */
      }
    };

    const onLoadedMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onLoadedMeta);

    // iOS Safari won't update frames on a seek until the video has been
    // "played" once. Playing and pausing within the same tick, before paint,
    // unlocks frame decoding without ever showing motion — this is not
    // autoplay, the video never advances on its own after this.
    video.play()?.then(() => video.pause()).catch(() => {});

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${trackVh}%`,
      pin: true,
      pinSpacing: true,
      // A numeric scrub (seconds of catch-up easing) rather than `true`
      // (rigid 1:1) is what makes the video read as a smooth cinematic
      // scrub instead of a mechanical frame-per-pixel flip.
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate(self) {
        targetProgress = self.progress;
        applyChapters(self.progress * 100);
        if (!hasScrolled && self.progress > 0.01) {
          hasScrolled = true;
          gsap.to(cueRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      },
      onRefresh(self) {
        window.__heroScrollEnd = self.end;
      },
    });

    window.__heroScrollEnd = st.end;
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      st.kill();
      delete window.__heroScrollEnd;
    };
  }, [isMobile]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
        poster={cinematicHero.poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Legibility washes only — the video stays the visual subject. Top/
          bottom keep the nav and scroll cue readable; the left-side wash
          gives the copy column contrast without laying anything over the
          jewellery, which this footage keeps in the center-right frame. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />

      {/* Masks a small watermark baked into the source footage's bottom-right
          corner — that corner sits in shadow for the whole clip, so a soft
          dark vignette there blends in rather than reading as a patch. */}
      <div
        aria-hidden
        className="absolute bottom-0 right-0 h-[26vh] w-[22vw] min-h-[160px] min-w-[160px]"
        style={{
          background:
            'radial-gradient(circle at 100% 100%, rgba(26,22,20,0.95) 0%, rgba(26,22,20,0.75) 40%, transparent 72%)',
        }}
      />

      <div className="relative z-10 h-full w-full">
        {cinematicHero.chapters.map((chapter) => (
          <div
            key={chapter.id}
            ref={registerChapter(chapter.id)}
            style={{ opacity: 0, willChange: "opacity, transform, filter" }}
            className={cn(
              "absolute inset-0 flex flex-col items-center px-6 text-left sm:items-start sm:px-12 sm:text-left md:px-20 lg:px-28",
              "dock" in chapter && chapter.dock === "bottom"
                ? "justify-end pb-24 sm:pb-28 md:pb-32"
                : "justify-center",
            )}
          >
            <div className="max-w-xl text-center sm:text-left">
              {"deva" in chapter && chapter.deva && (
                <p className="deva text-[clamp(2.8rem,8.5vw,5.6rem)] font-medium text-bone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                  {chapter.deva}
                </p>
              )}
              {"title" in chapter && chapter.title && (
                <h2 className="font-display text-[clamp(2.6rem,7.5vw,5.2rem)] font-semibold leading-[1.05] text-bone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                  {chapter.title}
                </h2>
              )}
              {"sub" in chapter && chapter.sub && (
                <p className="mt-2 font-body text-[1.65rem] font-semibold italic leading-snug text-bone drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
                  {chapter.sub}
                </p>
              )}
              {"cta" in chapter && chapter.cta && (
                <Link
                  href={chapter.cta.href}
                  className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-bone px-9 py-[1.125rem] font-display text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:bg-bone-3"
                >
                  {chapter.cta.label}
                  <span>&rarr;</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={cueRef}
        className="pointer-events-none absolute inset-x-0 bottom-9 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-display text-[0.6rem] uppercase tracking-[0.28em] text-bone/70">
          Scroll to discover
        </span>
        <span className="h-9 w-px animate-pulse bg-gradient-to-b from-bone/60 to-transparent" />
      </div>
    </div>
  );
}
