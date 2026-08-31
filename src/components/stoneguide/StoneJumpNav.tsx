"use client";

import Image from "next/image";

/** Round thumbnail row — click jumps down the SAME page to that stone's full
 *  card (via Lenis, matching the rest of the site's momentum scroll) instead
 *  of navigating to a separate route. */
export default function StoneJumpNav({
  stones,
}: {
  stones: { handle: string; name: string; image: string }[];
}) {
  const goTo = (handle: string) => {
    const el = document.getElementById(`stone-${handle}`);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {stones.map((s) => (
        <button
          key={s.handle}
          type="button"
          onClick={() => goTo(s.handle)}
          className="group flex items-center gap-2 rounded-full border border-ink/10 bg-bone py-1.5 pl-1.5 pr-4 transition-colors duration-300 hover:border-ink/25"
        >
          <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <Image src={s.image} alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span className="font-display text-[0.68rem] uppercase tracking-[0.1em] text-ink/70 transition-colors duration-300 group-hover:text-ink">
            {s.name}
          </span>
        </button>
      ))}
    </div>
  );
}
