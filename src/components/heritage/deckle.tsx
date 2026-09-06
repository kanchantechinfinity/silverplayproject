/**
 * Shared heritage-paper primitives used by every homepage product/edit card
 * and section background. One deckle silhouette, one corner flourish, one
 * paisley watermark — reused rather than re-authored per component so every
 * card tears the same way and every motif matches.
 */

/** Gentle handmade-paper deckle: soft rolling waves, not a jagged tear.
 *  Percentage-based, so the same string works at any aspect ratio. */
export const DECKLE =
  "polygon(0% 1.4%,12% 0%,25% 1.1%,37% 0.3%,50% 1.3%,62% 0.2%,75% 1.2%,87% 0.3%,100% 1.1%,99% 15%,100% 30%,99.2% 50%,100% 70%,99% 85%,100% 100%,87% 99.3%,75% 100%,62% 99.4%,50% 100%,37% 99.3%,25% 100%,12% 99.4%,0% 100%,1% 85%,0% 70%,0.8% 50%,0% 30%,1% 15%,0% 1.4%)";

/** Manuscript corner tick — a small curled vine, not a logo. */
export function HeritageCornerMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className}>
      <g fill="none" stroke="#8a6a2e" strokeWidth="1.1" strokeLinecap="round">
        <path d="M1 24V10C1 5 5 1 10 1h14" />
        <path d="M9 10c3.2-1.2 6 0 7.6 2.8-3.1 1.4-6-.3-7.6-2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.1" fill="#8a6a2e" stroke="none" />
      </g>
    </svg>
  );
}

/** Faint paisley watermark, standing in for a pressed manuscript seal. */
export function HeritagePaisleyMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <g fill="none" stroke="#6b5326" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 14c22 6 32 26 24 46-6 15-22 24-37 20-12-4-18-17-12-27 4-8 15-11 21-4 5 6 2 15-6 17" />
        <path d="M53 30c11 5 16 18 11 29-3 8-11 13-18 11" />
        <circle cx="47" cy="20" r="1.8" fill="#6b5326" stroke="none" />
      </g>
    </svg>
  );
}

/** Large corner illustration — a domed chhatri pavilion on a stepped plinth
 *  with a flowering vine climbing beside it. Meant as ONE big, quiet motif
 *  anchored to a section corner (bottom-left by default), not a repeating
 *  pattern — `color` (via a text-* class or inline style) controls the
 *  line tint so it can sit on both dark and pale sections. */
export function HeritageMonument({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 400" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* stepped plinth */}
        <path d="M18 398h108M27 388h90M36 378h72" />
        <path d="M48 378v-24h48v24" />
        {/* column shaft with moldings */}
        <path d="M60 354V142M84 354V142" />
        <path d="M55 318h34M55 258h34M55 198h34" />
        {/* necking under the dome */}
        <path d="M51 142h42M55 142v-10h34v10" />
        {/* onion dome + finial */}
        <path d="M59 132C59 96 72 63 72 40 72 63 85 96 85 132Z" />
        <path d="M62 120C62 92 72 67 72 49 72 67 82 92 82 120Z" />
        <path d="M72 40V17" />
        <circle cx="72" cy="13" r="4" />
        {/* climbing vine */}
        <path d="M14 397C4 360 30 328 13 292 -4 256 26 224 8 188 -10 152 22 118 10 84 -2 50 28 30 20 4" />
        <g transform="translate(0,0)">
          <path d="M13 292c-6-4-6-11 0-15 6 4 6 11 0 15Z" />
          <path d="M13 292c4-6 11-6 15 0-4 6-11 6-15 0Z" />
          <path d="M13 292c-4 6-11 6-15 0 4-6 11-6 15 0Z" />
          <path d="M13 292c6 4 6 11 0 15-6-4-6-11 0-15Z" />
        </g>
        <g transform="translate(-5,-104)">
          <path d="M13 292c-6-4-6-11 0-15 6 4 6 11 0 15Z" />
          <path d="M13 292c4-6 11-6 15 0-4 6-11 6-15 0Z" />
          <path d="M13 292c-4 6-11 6-15 0 4-6 11-6 15 0Z" />
          <path d="M13 292c6 4 6 11 0 15-6-4-6-11 0-15Z" />
        </g>
        <g transform="translate(3,-208)">
          <path d="M13 292c-6-4-6-11 0-15 6 4 6 11 0 15Z" />
          <path d="M13 292c4-6 11-6 15 0-4 6-11 6-15 0Z" />
          <path d="M13 292c-4 6-11 6-15 0 4-6 11-6 15 0Z" />
          <path d="M13 292c6 4 6 11 0 15-6-4-6-11 0-15Z" />
        </g>
        <path d="M16 336c8-2 14 4 14 12-8 2-14-4-14-12Z" />
        <path d="M12 236c-8-2-14 4-14 12 8 2 14-4 14-12Z" />
        <path d="M10 146c8-2 14 4 14 12-8 2-14-4-14-12Z" />
      </g>
    </svg>
  );
}

/** Sepia vignette overlay for a photo box — leans a crisp product shot
 *  toward "aged photograph" without touching the image itself. */
export function HeritagePhotoVignette({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(58,43,28,0.22) 100%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
