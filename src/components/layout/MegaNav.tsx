"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { megaNav } from "@/data/site";
import { cn, inr } from "@/lib/utils";

/**
 * The "Collections" mega-menu: a tab rail down the left (one per real
 * product category), that tab's real collection links in the middle, and a
 * small live preview of real products on the right — the standard
 * category-rail / links / featured-products layout, built from Silver
 * Play's actual catalogue rather than placeholder categories.
 */
type TabKey = (typeof megaNav.tabs)[number]["key"];

export default function MegaNav({ onNavigate }: { onNavigate?: () => void }) {
  const [activeKey, setActiveKey] = useState<TabKey>(megaNav.tabs[0].key);
  const active = megaNav.tabs.find((t) => t.key === activeKey) ?? megaNav.tabs[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full mt-3 w-[min(90vw,760px)] -translate-x-1/2 overflow-hidden rounded-[var(--radius-lg)] border border-ink/10 bg-bone/97 shadow-[0_30px_70px_-24px_rgba(26,22,20,0.5)] backdrop-blur-xl"
    >
      <div className="grid grid-cols-[9rem_1fr_1.4fr]">
        {/* Category rail */}
        <div className="border-r border-ink/8 bg-bone-2/50 py-4">
          {megaNav.tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onMouseEnter={() => setActiveKey(tab.key)}
              onFocus={() => setActiveKey(tab.key)}
              className={cn(
                "block w-full px-5 py-3 text-left font-display text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300",
                tab.key === activeKey
                  ? "bg-bone text-ink"
                  : "text-ink/50 hover:text-ink/80",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Collection links for the active tab */}
        <div className="border-r border-ink/8 py-5 pl-5 pr-3">
          <p className="eyebrow mb-3 text-ash-3">Shop {active.label}</p>
          <ul className="space-y-1">
            {active.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="block rounded-[var(--radius-xs)] px-2.5 py-1.5 font-body text-[0.95rem] text-ink/75 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Real product preview */}
        <div className="py-5 pl-4 pr-5">
          <p className="eyebrow mb-3 text-ash-3">{active.featuredLabel}</p>
          <div className="grid grid-cols-2 gap-3">
            {active.products.map((p) => (
              <Link
                key={p.handle}
                href={`/products/${p.handle}`}
                onClick={onNavigate}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-[var(--radius-xs)] bg-bone-2">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-1.5 line-clamp-1 font-body text-[0.78rem] text-ink/70">
                  {p.title}
                </p>
                <p className="font-display text-[0.72rem] text-ink">{inr(p.price)}</p>
              </Link>
            ))}
          </div>
          <Link
            href={active.href}
            onClick={onNavigate}
            className="mt-4 inline-flex items-center gap-1.5 font-display text-[0.62rem] uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-ink"
          >
            View All {active.label}
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
