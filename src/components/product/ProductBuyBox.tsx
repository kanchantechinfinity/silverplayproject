"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { inr } from "@/lib/utils";
import { Stars, placeholderRating, WishlistButton } from "@/components/ProductQuickView";
import VintageBadge from "@/components/VintageBadge";

export default function ProductBuyBox({ product, chip }: { product: Product; chip: string }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [pin, setPin] = useState("");
  const [pinChecked, setPinChecked] = useState<string | null>(null);
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

      {/* Savings callout — real sitewide policy (prepaid ships free), not an
          invented discount code, styled as a wax-seal ticket stub. */}
      <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-sm)] border border-[#8a6a2e]/25 bg-[#f8f0da]/50 px-4 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#8a6a2e]/40 text-[#8a6a2e]" aria-hidden>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7" />
            <path d="M22 7H2v5h20V7Z" />
            <path d="M12 22V7" />
            <path d="M12 7c-1.8 0-5-1-5-3.2C7 2 8.2 1 9.5 1 11.5 1 12 4 12 7Z" />
            <path d="M12 7c1.8 0 5-1 5-3.2C17 2 15.8 1 14.5 1 12.5 1 12 4 12 7Z" />
          </svg>
        </span>
        <p className="font-body text-[0.8rem] leading-snug text-[#6b5326]">
          <span className="font-semibold">Prepaid orders ship free</span> — pay online and skip the delivery charge.
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
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

      {/* Send as a gift */}
      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-ink/10 p-4 transition-colors duration-300 hover:border-[#8a6a2e]/35">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-[#8a6a2e]/45">
          <input
            type="checkbox"
            checked={isGift}
            onChange={() => setIsGift((g) => !g)}
            className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          <span
            className="absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
            style={{ background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 100%)" }}
            aria-hidden
          />
          <svg viewBox="0 0 16 16" aria-hidden className="relative z-[1] h-3 w-3 scale-0 text-[#f2e8d0] transition-transform duration-150 peer-checked:scale-100">
            <path d="M3 8.2 6.2 11.4 13 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          <span className="font-display text-[0.78rem] uppercase tracking-[0.1em] text-ink">
            Sending this as a gift
          </span>
          <span className="mt-1 block font-body text-[0.8rem] text-ink/55">
            We&apos;ll pack it in a velvet keepsake box with a handwritten note — no price tag inside.
          </span>
          {isGift && (
            <textarea
              onClick={(e) => e.preventDefault()}
              rows={2}
              placeholder="Add a note for them (optional)"
              className="mt-3 w-full resize-none rounded-[var(--radius-sm)] border border-ink/15 bg-bone-2 p-3 font-body text-[0.82rem] text-ink placeholder:text-ink/35 focus:border-[#8a6a2e]/50 focus:outline-none"
            />
          )}
        </span>
      </label>

      {/* PIN code delivery estimate */}
      <div className="mt-4 rounded-[var(--radius-sm)] border border-ink/10 p-4">
        <p className="font-display text-[0.78rem] uppercase tracking-[0.1em] text-ink">
          Check Delivery Time
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setPinChecked(null);
            }}
            placeholder="Enter PIN code"
            className="w-full rounded-full border border-ink/15 bg-bone-2 px-4 py-2.5 font-body text-[0.85rem] text-ink placeholder:text-ink/35 focus:border-[#8a6a2e]/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => pin.length === 6 && setPinChecked(pin)}
            className="shrink-0 rounded-full border border-[#8a6a2e]/40 px-5 py-2.5 font-display text-[0.62rem] uppercase tracking-[0.18em] text-[#6b5326] transition-colors duration-300 hover:bg-[#241a10] hover:text-bone"
          >
            Check
          </button>
        </div>
        {pinChecked && (
          <p className="mt-2.5 font-body text-[0.8rem] text-[#8a6a2e]">
            Estimated delivery to {pinChecked}: 5–7 business days. Dispatched within 2–3 days of order.
          </p>
        )}
      </div>

      <p className="mt-5 font-body text-[0.82rem] leading-relaxed text-ink/60">
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
