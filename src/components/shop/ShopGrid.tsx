"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { products, collections, collectionProducts, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const TYPES = ["Earrings", "Pendants", "Rakhi"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

const GENERIC_HANDLES = new Set(["gift-collection", "sterling-silver-jewellery", "earrings", "pendants", "rakhi"]);

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
    <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
      {/* Mobile filter toggle */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="flex items-center justify-between rounded-full border border-ink/15 px-5 py-3 font-display text-[0.68rem] uppercase tracking-[0.2em] text-ink md:hidden"
      >
        Filters
        <span aria-hidden>⊞</span>
      </button>

      {/* Sidebar (desktop) — sticks under the header while the grid scrolls,
          and scrolls internally if the filter list runs taller than the
          viewport. */}
      <aside className="hidden md:block md:sticky md:top-28 md:max-h-[calc(100vh-8rem)] md:self-start md:overflow-y-auto md:pr-2">
        <FilterPanel
          vibeCollections={vibeCollections}
          types={types}
          vibes={vibes}
          maxPrice={maxPrice}
          onToggleType={(v) => toggle(types, setTypes, v)}
          onToggleVibe={(v) => toggle(vibes, setVibes, v)}
          onPrice={setMaxPrice}
        />
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
              className="h-full w-[86vw] max-w-xs overflow-y-auto bg-bone p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-[0.9rem] uppercase tracking-[0.15em] text-ink">
                  Filters
                </p>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="grid h-8 w-8 place-items-center rounded-full border border-ink/15"
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
    <div className="space-y-8">
      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-ink/50">Price up to</p>
        <input
          type="range"
          min={1250}
          max={35000}
          step={250}
          value={maxPrice}
          onChange={(e) => onPrice(Number(e.target.value))}
          className="mt-4 w-full accent-[#8a6a2e]"
        />
        <p className="mt-1 font-body text-[0.85rem] text-ink/70">₹{maxPrice.toLocaleString("en-IN")}</p>
      </div>

      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-ink/50">Category</p>
        <div className="mt-3 space-y-2">
          {TYPES.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2.5 font-body text-[0.9rem] text-ink/75">
              <input
                type="checkbox"
                checked={types.has(t)}
                onChange={() => onToggleType(t)}
                className="h-4 w-4 accent-[#8a6a2e]"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-ink/50">Shop by Vibe</p>
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
          {vibeCollections.map((c) => (
            <label
              key={c.handle}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 font-body text-[0.9rem] text-ink/75",
              )}
            >
              <input
                type="checkbox"
                checked={vibes.has(c.handle)}
                onChange={() => onToggleVibe(c.handle)}
                className="h-4 w-4 accent-[#8a6a2e]"
              />
              {c.title}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
