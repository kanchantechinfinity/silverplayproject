import type Lenis from "lenis";

/**
 * Small, deliberate globals bridging independent scroll-driven components —
 * mirrors the pattern already used for the smooth-scroll instance.
 */
declare global {
  interface Window {
    /** The page's Lenis instance, so any component can call .scrollTo(). */
    __lenis?: Lenis;
    /** Absolute scroll offset (px) where the cinematic hero's pin releases. */
    __heroScrollEnd?: number;
  }
}

export {};
