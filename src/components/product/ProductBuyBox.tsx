"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { inr } from "@/lib/utils";
import { Stars, placeholderRating, WishlistButton } from "@/components/ProductQuickView";
import VintageBadge from "@/components/VintageBadge";

export default function ProductBuyBox({ product, chip }: { product: Product; chip: string }) {
  const [wishlisted, setWishlisted] = useState(false);
  const { rating, count } = placeholderRating(product.id);
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-[#8a6a2e]/35 bg-[#f8f0da]/60 px-4 py-1.5 font-display text-[0.56rem] uppercase tracking-[0.2em] text-[#6b5326]">
          {chip}
        </span>
        {discount && <VintageBadge lines={[`${discount}%`, "Off"]} className="-rotate-6" />}
        {!product.available && <VintageBadge lines={["Sold", "Out"]} className="rotate-6" />}
      </div>

      <h1 className="mt-4 font-display text-[1.8rem] font-semibold leading-snug text-ink sm:text-[2.2rem]">
        {product.title}
      </h1>

      <a href="#reviews" className="mt-3 flex w-fit items-center gap-2 transition-opacity duration-300 hover:opacity-70">
        <Stars rating={rating} size={13} />
        <span className="font-body text-[0.85rem] text-[#8a6a2e] underline underline-offset-2">
          {rating} ({count.toLocaleString("en-IN")} reviews)
        </span>
      </a>

      <p className="mt-5 flex items-baseline gap-3 font-display text-[1.5rem] font-semibold text-ink">
        {inr(product.price)}
        {product.compareAt && product.compareAt > product.price && (
          <span className="text-[1rem] font-normal text-[#8a6a2e] line-through">
            {inr(product.compareAt)}
          </span>
        )}
      </p>
      <p className="mt-1.5 font-body text-[0.85rem] text-ink/50">
        Inclusive of all taxes · BIS hallmarked 925 sterling silver
      </p>

      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          disabled={!product.available}
          className="flex-1 rounded-full bg-ink py-4 text-center font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {product.available ? "Buy Now" : "Sold Out"}
        </button>
        <WishlistButton
          wishlisted={wishlisted}
          onToggle={() => setWishlisted((w) => !w)}
          className="h-[52px] w-[52px] shrink-0 border border-[#8a6a2e]/30"
        />
      </div>

      <p className="mt-4 font-body text-[0.82rem] leading-relaxed text-ink/60">
        {product.description.replace(/^\s*Product Overview:\s*/i, "")}
      </p>

      <div className="mt-7 grid grid-cols-3 gap-2 border-t border-ink/10 pt-6">
        {TRUST_BADGES.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-[#8a6a2e]" aria-hidden>
              {b.icon}
            </span>
            <span className="font-display text-[0.58rem] uppercase leading-tight tracking-[0.06em] text-ink/55">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TRUST_BADGES = [
  {
    label: "BIS Certified",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "925 Sterling Silver",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3Z" />
      </svg>
    ),
  },
  {
    label: "Skin-Friendly",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.5s-7.5-4.6-9.9-9.3C.6 8 1.8 4.3 5.2 3.4c2-.5 4 .3 5.2 2 .5.7 1 1.4 1.6 2.1.6-.7 1.1-1.4 1.6-2.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.6 4.6 3.1 7.8-2.4 4.7-9.9 9.3-9.9 9.3Z" />
      </svg>
    ),
  },
];
