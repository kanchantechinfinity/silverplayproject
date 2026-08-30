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

      <div className="mt-3 flex items-center gap-2">
        <Stars rating={rating} size={13} />
        <span className="font-body text-[0.85rem] text-[#8a6a2e]">
          {rating} ({count.toLocaleString("en-IN")} reviews)
        </span>
      </div>

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
    </div>
  );
}
