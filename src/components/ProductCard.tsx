"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { cn, inr } from "@/lib/utils";
import VintageBadge from "@/components/VintageBadge";

/**
 * Product tile. Cross-fades to the second product shot on hover and reveals a
 * quick-add bar from the bottom edge.
 */
export default function ProductCard({
  product,
  className,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [hover, setHover] = useState(false);
  const alt = product.images[1];
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;

  return (
    <Link
      href={`/products/${product.handle}`}
      className={cn("group block", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="rounded-[var(--radius-md)] p-[3px] transition-shadow duration-700"
        style={{
          background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
          boxShadow: hover
            ? "0 22px 44px -22px rgba(26,22,20,0.4)"
            : "0 2px 8px -5px rgba(26,22,20,0.18)",
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-md)-3px)] bg-bone-2">
          <motion.div
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes={sizes}
              priority={priority}
              className={cn(
                "object-cover transition-opacity duration-700",
                hover && alt ? "opacity-0" : "opacity-100",
              )}
            />
            {alt && (
              <Image
                src={alt}
                alt=""
                fill
                sizes={sizes}
                aria-hidden
                className={cn(
                  "object-cover transition-opacity duration-700",
                  hover ? "opacity-100" : "opacity-0",
                )}
              />
            )}
          </motion.div>

          {discount && (
            <VintageBadge
              lines={[`${discount}%`, "Off"]}
              className="absolute left-3 top-3 -rotate-6 group-hover:rotate-0"
            />
          )}
          {!product.available && (
            <VintageBadge
              lines={["Sold", "Out"]}
              className="absolute left-3 top-3 rotate-6 group-hover:rotate-0"
            />
          )}

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#241a10]/88 py-3.5 text-center backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            <span className="font-display text-[0.62rem] uppercase tracking-[0.26em] text-[#f2e8d0]">
              Quick View
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-body text-[1.02rem] leading-snug text-[#3a2b1c]/90 transition-colors duration-400 group-hover:text-[#3a2b1c]">
          {product.title}
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2.5 font-display text-[0.82rem] tracking-[0.06em] text-[#3a2b1c]">
          {inr(product.price)}
          {product.compareAt && product.compareAt > product.price && (
            <span className="text-[0.72rem] text-[#8a6a2e] line-through">
              {inr(product.compareAt)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
