"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { megaNav } from "@/data/site";

/**
 * The "Shop" mega-menu: a row of real featured-category photos up top, every
 * product type's own sub-categories laid out as columns beneath it (all
 * visible at once, nothing hidden behind a tab), and a looping video promo
 * panel on the right — real Silver Play footage, not a static banner.
 */
export default function MegaNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      // Fixed and centred on the viewport, not on the trigger link — the
      // panel is far wider than "Collections" itself, so anchoring to the
      // trigger's own position (which sits left-of-centre in the nav row)
      // pushed it straight off the left edge of the screen.
      className="fixed left-1/2 top-24 z-50 w-[min(94vw,940px)] -translate-x-1/2 overflow-hidden rounded-[var(--radius-lg)] border border-ink/10 bg-bone/97 shadow-[0_30px_70px_-24px_rgba(26,22,20,0.5)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-[1fr_300px]">
        <div className="p-6">
          <div className="mb-4 flex items-end justify-between">
            <p className="eyebrow text-ash-3">Our Jewellery</p>
            <Link
              href={megaNav.viewAllHref}
              onClick={onNavigate}
              className="group inline-flex items-center gap-1.5 font-display text-[0.64rem] uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-ink"
            >
              View All Products
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Featured categories */}
          <div className="grid grid-cols-4 gap-4">
            {megaNav.featured.map((f) => (
              <Link key={f.label} href={f.href} onClick={onNavigate} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-bone-2">
                  <Image
                    src={f.image}
                    alt={f.label}
                    fill
                    sizes="140px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 font-body text-[0.92rem] text-ink/80 group-hover:text-ink">
                  {f.label}
                </p>
              </Link>
            ))}
          </div>

          {/* Every product type's own sub-categories, all visible together */}
          <div className="mt-6 grid grid-cols-3 gap-6 border-t border-ink/8 pt-5">
            {megaNav.linkGroups.map((group) => (
              <div key={group.heading}>
                <p className="eyebrow mb-2.5 text-ash-3">{group.heading}</p>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="block rounded-[var(--radius-xs)] py-1 font-body text-[0.9rem] text-ink/70 transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Video promo */}
        <div className="relative overflow-hidden bg-ink">
          <video
            src={megaNav.promo.video}
            poster={megaNav.promo.poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-bone/70">
              {megaNav.promo.eyebrow}
            </p>
            <h3 className="mt-1.5 font-display text-[1.15rem] leading-snug text-bone">
              {megaNav.promo.heading}
            </h3>
            <Link
              href={megaNav.promo.ctaHref}
              onClick={onNavigate}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-bone px-5 py-2.5 font-display text-[0.62rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone-3"
            >
              {megaNav.promo.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
