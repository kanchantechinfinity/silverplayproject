"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/catalog";

const ease = [0.22, 1, 0.36, 1] as const;

function rows(product: Product) {
  return [
    {
      q: "Material & Craft",
      a: `Handcrafted in 92.5% BIS-hallmarked sterling silver by karigars in Jaipur. Tags: ${product.tags.slice(0, 5).join(", ")}.`,
    },
    {
      q: "Shipping",
      a: "Dispatched within 2–3 business days. Delivery typically takes 5–7 business days across India. Prepaid orders ship free, with a tracking link sent via WhatsApp/email.",
    },
    {
      q: "Returns & Exchanges",
      a: "We replace or refund an item only if it arrives damaged, defective, or doesn't match your order — reported within 24 hours of delivery with photos or an unboxing video.",
    },
    {
      q: "Care Instructions",
      a: "Store in the anti-tarnish pouch provided. Avoid contact with perfume, lotions and water. Wipe gently with a soft cloth after wearing, and use a mild silver polishing cloth for deeper cleaning.",
    },
  ];
}

export default function ProductInfoAccordion({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = rows(product);

  return (
    <div className="mt-8 border-t border-ink/10">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-ink/10">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-6 py-4 text-left transition-colors duration-300 hover:text-[#8a6a2e]"
          >
            <span className="font-display text-[0.85rem] uppercase tracking-[0.08em] text-ink">
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.35, ease }}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#8a6a2e]/35 text-[0.85rem] text-[#8a6a2e]"
              aria-hidden
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <p className="pb-4 font-body text-[0.85rem] leading-relaxed text-ink/60">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
