"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ProductCard from "@/components/ProductCard";
import { getProduct, type Product } from "@/lib/catalog";

const KEY = "sp_recently_viewed";
const MAX_STORED = 12;
const MAX_SHOWN = 5;

/** Records the current product into this visitor's own browsing history
 *  (localStorage — real, per-visitor, never fabricated) and shows the other
 *  pieces they've actually looked at. Renders nothing on a first-ever visit
 *  or when everything stored is this same product. */
export default function RecentlyViewed({ currentHandle }: { currentHandle: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let stored: string[] = [];
    try {
      stored = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (!Array.isArray(stored)) stored = [];
    } catch {
      stored = [];
    }

    // Show whoever was already in history before this visit (excluding self).
    const toShow = stored
      .filter((h) => h !== currentHandle)
      .map((h) => getProduct(h))
      .filter((p): p is Product => Boolean(p))
      .slice(0, MAX_SHOWN);
    setItems(toShow);

    // Then record this visit for next time.
    const updated = [currentHandle, ...stored.filter((h) => h !== currentHandle)].slice(0, MAX_STORED);
    try {
      localStorage.setItem(KEY, JSON.stringify(updated));
    } catch {
      /* storage unavailable — recently-viewed just won't persist */
    }
  }, [currentHandle]);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-ash-3">Recently Viewed</p>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {items.map((p) => (
            <StaggerItem key={p.handle}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
