"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { products, collections, collectionProducts, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { HeritageCornerMark, HeritagePaisleyMark } from "@/components/heritage/deckle";

const ease = [0.22, 1, 0.36, 1] as const;
const TYPES = ["Earrings", "Pendants", "Rakhi"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

const GENERIC_HANDLES = new Set(["gift-collection", "sterling-silver-jewellery", "earrings", "pendants", "rakhi"]);

// Lenis hijacks wheel events globally for the whole document, and
// `data-lenis-prevent` alone doesn't reliably stop it from also scrolling
// the page underneath a nested panel. Own the scroll ourselves: consume the
// wheel while there's room left inside this panel, and only let it fall
// through to the page (Lenis) once the panel has hit its own top/bottom.
function handlePanelWheel(e: React.WheelEvent<HTMLElement>) {
  const el = e.currentTarget;
  const atTop = el.scrollTop <= 0 && e.deltaY < 0;
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0;
  if (atTop || atBottom) return;
  e.preventDefault();
  e.stopPropagation();
  el.scrollTop += e.deltaY;
}

function useVibeCollections() {
  return useMemo(
    () =>
      collections
        .filter((c) => c.count >= 8 && !GENERIC_HANDLES.has(c.handle))
        .sort((a, b) => b.count - a.count)
        .slice(0, 14),
    [],
  );
}

export default function ShopGrid({ baseProducts }: { baseProducts?: Product[] }) {
  const source = baseProducts ?? products;
  const vibeCollections = useVibeCollections();

  const [types, setTypes] = useState<Set<string>>(new Set());
  const [vibes, setVibes] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (set: Set<string>, setSet: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    setSet(next);
  };

  // Real collection membership (not tag text) — a selected "vibe" checkbox
  // pulls in whichever handles that Shopify collection actually contains.
  const vibeHandles = useMemo(() => {
    if (vibes.size === 0) return null;
    const set = new Set<string>();
    vibes.forEach((handle) => {
      collectionProducts(handle).forEach((p) => set.add(p.handle));
    });
    return set;
  }, [vibes]);

  const filtered = useMemo(() => {
    let list = source.filter((p) => p.price <= maxPrice);
    if (types.size > 0) list = list.filter((p) => types.has(p.type));
    if (vibeHandles) list = list.filter((p) => vibeHandles.has(p.handle));

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));

    return sorted;
  }, [source, types, vibeHandles, maxPrice, sort]);

  return (
    <div className="relative isolate">
      {/* Section-wide backdrop, covering the full grid however tall it runs
          (233 products deep). A plain <img>/next-Image sized to fill that
          whole height would need to stretch one crop across tens of
          thousands of px, squashing it to an imperceptible sliver — a
          fixed-attachment CSS background instead sizes itself to the
          viewport and stays put as the page scrolls over it, so it reads
          at its natural resolution for the entire scroll, not just a band
          at the top. Breaks out of the page's own max-w-[1500px] wrapper
          to bleed full viewport width, and stretches past this component's
          own top/bottom edge by exactly the surrounding page wrapper's own
          py-16 md:py-24 padding, so that padding reads as part of the same
          backdrop instead of a plain gap before the hero above and the
          footer below. */}
      <div
        className="pointer-events-none absolute left-1/2 -top-16 md:-top-24 -z-10 h-[calc(100%+8rem)] w-screen -translate-x-1/2 bg-cover bg-top bg-fixed md:h-[calc(100%+12rem)]"
        style={{ backgroundImage: "url(/heritage/archive-balcony.jpg)" }}
      >
        <div className="absolute inset-0 bg-bone/78" />
      </div>

      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
      {/* Mobile filter toggle */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="flex items-center justify-between rounded-full border border-[#8a6a2e]/50 bg-ink px-5 py-3 font-display text-[0.68rem] uppercase tracking-[0.2em] text-bone md:hidden"
      >
        Filters
        <span aria-hidden className="text-[#c9a35c]">⊞</span>
      </button>

      {/* Sidebar (desktop) — sticks under the header while the grid scrolls,
          and scrolls internally if the filter list runs taller than the
          viewport. */}
      <aside
        className="hidden md:block md:pr-2"
        data-lenis-prevent
        onWheel={handlePanelWheel}
        style={{
          position: "sticky",
          top: "7rem",
          maxHeight: "calc(100vh - 8rem)",
          overflowY: "auto",
          alignSelf: "start",
        }}
      >
        {/* Gilt torn-edge mat — same deckle silhouette as every product
            card, so the filter reads as part of the same paper family
            rather than a plain settings box — clean rounded edges here,
            not the torn-paper deckle the product cards use. */}
        <div
          className="rounded-[var(--radius-lg)] p-[3px]"
          style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)" }}
        >
          <div
            className="relative isolate overflow-hidden rounded-[calc(var(--radius-lg)-3px)] px-6 py-9"
            style={{
              backgroundColor: "#241a10",
              backgroundImage: [
                "radial-gradient(circle at 88% 8%, rgba(216,180,102,0.14), transparent 42%)",
                "radial-gradient(circle at 6% 92%, rgba(216,180,102,0.1), transparent 38%)",
                "linear-gradient(155deg, #2e2115 0%, #241a10 55%, #1a120a 100%)",
              ].join(", "),
            }}
          >
            <HeritagePaisleyMark className="pointer-events-none absolute left-1/2 top-[55%] z-[-1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
            <HeritageCornerMark className="pointer-events-none absolute right-4 top-4 z-[-1] h-6 w-6 -scale-x-100 opacity-60" />
            <HeritageCornerMark className="pointer-events-none absolute bottom-4 left-4 z-[-1] h-6 w-6 -scale-y-100 opacity-60" />

            <p className="eyebrow mb-6 text-[#c9a35c]">Refine</p>
            <FilterPanel
              vibeCollections={vibeCollections}
              types={types}
              vibes={vibes}
              maxPrice={maxPrice}
              onToggleType={(v) => toggle(types, setTypes, v)}
              onToggleVibe={(v) => toggle(vibes, setVibes, v)}
              onPrice={setMaxPrice}
            />
          </div>
        </div>
      </aside>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              onWheel={handlePanelWheel}
              className="relative isolate h-full w-[86vw] max-w-xs overflow-y-auto p-6"
              style={{
                backgroundColor: "#241a10",
                backgroundImage: [
                  "radial-gradient(circle at 88% 8%, rgba(216,180,102,0.14), transparent 42%)",
                  "radial-gradient(circle at 6% 92%, rgba(216,180,102,0.1), transparent 38%)",
                  "linear-gradient(155deg, #2e2115 0%, #241a10 55%, #1a120a 100%)",
                ].join(", "),
              }}
            >
              <HeritagePaisleyMark className="pointer-events-none absolute left-1/2 top-[60%] z-[-1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
              <HeritageCornerMark className="pointer-events-none absolute bottom-4 left-4 z-[-1] h-6 w-6 -scale-y-100 opacity-50" />
              <div className="relative flex items-center justify-between border-b border-[#8a6a2e]/25 pb-5">
                <p className="font-display text-[0.9rem] uppercase tracking-[0.2em] text-bone">
                  Filters
                </p>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#8a6a2e]/40 text-bone"
                >
                  ×
                </button>
              </div>
              <div className="mt-6">
                <FilterPanel
                  vibeCollections={vibeCollections}
                  types={types}
                  vibes={vibes}
                  maxPrice={maxPrice}
                  onToggleType={(v) => toggle(types, setTypes, v)}
                  onToggleVibe={(v) => toggle(vibes, setVibes, v)}
                  onPrice={setMaxPrice}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <p className="font-body text-[0.85rem] text-ink/55">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-[1.1rem] text-ink/70">No pieces match those filters.</p>
            <p className="mt-2 font-body text-[0.9rem] text-ink/45">Try widening your price range or clearing a filter.</p>
          </div>
        ) : (
          <Stagger className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4" amount={0}>
            {filtered.map((p, i) => (
              <StaggerItem key={p.handle}>
                <ProductCard product={p} priority={i < 4} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
      </div>
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: (typeof SORTS)[number]["value"];
  onChange: (v: (typeof SORTS)[number]["value"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = SORTS.find((s) => s.value === value)!;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-full border border-ink/15 bg-transparent px-4 py-2 font-display text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-[#8a6a2e]/50"
      >
        {current.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
          aria-hidden
          className="text-[0.6rem] text-[#8a6a2e]"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease }}
            className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-56 origin-top-right overflow-hidden rounded-[var(--radius-md)] p-[3px] shadow-[0_20px_45px_-15px_rgba(26,22,20,0.45)]"
            style={{
              background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
            }}
          >
            <div
              className="rounded-[calc(var(--radius-md)-3px)] py-2"
              style={{
                background: "radial-gradient(140% 120% at 15% -10%, #f8f0da 0%, #f2e8d0 55%, #e6d3a8 100%)",
              }}
            >
              {SORTS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    onChange(s.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-4 py-2.5 text-left font-display text-[0.68rem] uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-[#8a6a2e]/10",
                    s.value === value ? "text-[#6b5326]" : "text-[#6b5326]/60",
                  )}
                >
                  <span className="w-3 shrink-0" aria-hidden>
                    {s.value === value ? "✓" : ""}
                  </span>
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPanel({
  vibeCollections,
  types,
  vibes,
  maxPrice,
  onToggleType,
  onToggleVibe,
  onPrice,
}: {
  vibeCollections: { handle: string; title: string; count: number }[];
  types: Set<string>;
  vibes: Set<string>;
  maxPrice: number;
  onToggleType: (v: string) => void;
  onToggleVibe: (v: string) => void;
  onPrice: (v: number) => void;
}) {
  return (
    <div className="relative space-y-8">
      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a35c]/80">Price up to</p>
        <input
          type="range"
          min={1250}
          max={35000}
          step={250}
          value={maxPrice}
          onChange={(e) => onPrice(Number(e.target.value))}
          className="mt-4 w-full accent-[#c9a35c]"
        />
        <p className="mt-1 font-body text-[0.95rem] text-bone/80">₹{maxPrice.toLocaleString("en-IN")}</p>
      </div>

      <FilterDivider />

      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a35c]/80">Category</p>
        <div className="mt-3 space-y-2.5">
          {TYPES.map((t) => (
            <FilterCheckbox key={t} label={t} checked={types.has(t)} onChange={() => onToggleType(t)} />
          ))}
        </div>
      </div>

      <FilterDivider />

      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a35c]/80">Shop by Vibe</p>
        <div
          className="mt-3 max-h-64 space-y-2.5 overflow-y-auto pr-1"
          data-lenis-prevent
          onWheel={handlePanelWheel}
        >
          {vibeCollections.map((c) => (
            <FilterCheckbox
              key={c.handle}
              label={c.title}
              checked={vibes.has(c.handle)}
              onChange={() => onToggleVibe(c.handle)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A thin gold rule with a small diamond at its centre — the same
 *  manuscript-divider language as the medallion rules elsewhere on the
 *  site, scaled down to fit between filter groups. */
function FilterDivider() {
  return (
    <div className="flex items-center gap-3 opacity-60" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a35c]/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a35c]/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a35c]/70" />
    </div>
  );
}

/** Gold-on-dark check, replacing the browser's plain native box — a small
 *  gilt-bordered square that fills with the same gold gradient used
 *  throughout the site once checked. */
function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 font-body text-[0.95rem] text-bone/75 transition-colors duration-200 hover:text-bone">
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-[#c9a35c]/45 bg-black/20 transition-colors duration-200 group-hover:border-[#c9a35c]/80">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className="absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
          style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 100%)" }}
          aria-hidden
        />
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="relative z-[1] h-3 w-3 scale-0 text-[#2a1d0f] transition-transform duration-150 peer-checked:scale-100"
        >
          <path d="M3 8.2 6.2 11.4 13 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label}
    </label>
  );
}
