"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Momentum scrolling for the whole document. Bails out entirely when the
 * visitor has asked for reduced motion so native scroll stays untouched.
 *
 * Driven by gsap.ticker rather than its own rAF loop, and wired to notify
 * ScrollTrigger on every tick — the pairing GSAP recommends for Lenis. Without
 * it, ScrollTrigger reads native scroll position while Lenis is still easing
 * toward it, and any pinned section (the cinematic hero) jitters and drifts
 * out of sync with the video's scrub position.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
