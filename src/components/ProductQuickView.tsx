"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { inr } from "@/lib/utils";
import VintageBadge from "@/components/VintageBadge";

export const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Deterministic placeholder rating from the product id — Silver Play has no
 * review app live yet, so there's no real per-product rating to show. Stable
 * per product (not random per render) so it doesn't jitter on re-render.
 * TODO: swap for real review data once a review app goes live.
 */
export function placeholderRating(id: number) {
  const h = Math.abs(Math.sin(id) * 10000);
  const frac = h - Math.floor(h);
  const rating = Math.round((4.3 + frac * 0.7) * 10) / 10;
  const count = 40 + Math.floor(frac * 1460);
  return { rating, count };
}

export function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < filled ? "#a4802f" : "none"}
          stroke="#a4802f"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M10 1.5l2.5 5.6 6 .6-4.5 4 1.3 6-5.3-3-5.3 3 1.3-6-4.5-4 6-.6L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

export function QuickViewModal({
  product,
  rating,
  count,
  onClose,
}: {
  product: Product;
  rating: number;
  count: number;
  onClose: () => void;
}) {
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;

  // Portalled to <body> — a product card sits inside Framer Motion wrappers
  // (Stagger/hover animations) that apply an inline `transform`, which turns
  // `position: fixed` into "fixed to that ancestor" instead of the viewport.
  // Rendering outside the whole tree is what makes this a true, page-wide overlay.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c130b]/70 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-[var(--radius-lg)] p-[3px]"
        style={{
          background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-[#241a10]/85 text-[1.6rem] leading-none text-[#f2e8d0] backdrop-blur-sm transition-colors duration-300 hover:bg-[#241a10]"
        >
          ×
        </button>

        <div
          className="grid max-h-[85vh] grid-cols-1 overflow-y-auto rounded-[calc(var(--radius-lg)-3px)] md:grid-cols-2 md:overflow-visible"
          style={{
            background: "radial-gradient(140% 120% at 15% -10%, #f8f0da 0%, #f2e8d0 55%, #e6d3a8 100%)",
          }}
        >
          <div className="relative aspect-square md:aspect-auto">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            {discount && (
              <VintageBadge lines={[`${discount}%`, "Off"]} className="absolute left-4 top-4 -rotate-6" />
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <h3 className="pr-10 font-display text-[1.25rem] font-semibold leading-snug text-[#3a2b1c] md:text-[1.4rem]">
              {product.title}
            </h3>

            <div className="mt-2 flex items-center gap-1.5">
              <Stars rating={rating} />
              <span className="font-body text-[0.78rem] text-[#8a6a2e]">({count.toLocaleString("en-IN")})</span>
            </div>

            <p className="mt-4 flex items-baseline gap-3 font-display text-[1.15rem] font-semibold text-[#3a2b1c]">
              {inr(product.price)}
              {product.compareAt && product.compareAt > product.price && (
                <span className="text-[0.85rem] font-normal text-[#8a6a2e] line-through">
                  {inr(product.compareAt)}
                </span>
              )}
            </p>

            <p className="mt-4 line-clamp-4 font-body text-[0.88rem] leading-relaxed text-[#5c4a2e]">
              {product.description}
            </p>

            <Link
              href={`/products/${product.handle}`}
              className="mt-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#241a10] px-7 py-3.5 font-display text-[0.64rem] uppercase tracking-[0.18em] text-[#f2e8d0] transition-colors duration-500 hover:bg-[#3a2b1c]"
            >
              View Full Details
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export function WishlistButton({
  wishlisted,
  onToggle,
  className = "",
}: {
  wishlisted: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wishlisted}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur-sm transition-colors duration-300 ${
        wishlisted
          ? "bg-[#241a10] text-[#f2e8d0]"
          : "bg-[#f2e8d0]/70 text-[#241a10] hover:bg-[#f2e8d0]/90"
      } ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 20.5s-7.5-4.6-9.9-9.3C.6 8 1.8 4.3 5.2 3.4c2-.5 4 .3 5.2 2 .5.7 1 1.4 1.6 2.1.6-.7 1.1-1.4 1.6-2.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.6 4.6 3.1 7.8-2.4 4.7-9.9 9.3-9.9 9.3Z" />
      </svg>
    </button>
  );
}

export function QuickViewButton({
  onOpen,
  className = "",
}: {
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Quick view"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpen();
      }}
      className={`grid h-9 w-9 place-items-center rounded-full bg-[#f2e8d0]/70 text-[#241a10] backdrop-blur-sm transition-colors duration-300 hover:bg-[#f2e8d0]/90 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  );
}
