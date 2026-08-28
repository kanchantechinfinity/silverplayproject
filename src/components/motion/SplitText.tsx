"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const unit: Variants = {
  hidden: { y: "110%", opacity: 0, rotate: 4 },
  shown: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Headline that rises word-by-word (or letter-by-letter) from behind a mask.
 * Text stays a single readable string for screen readers via aria-label.
 */
export default function SplitText({
  text,
  className,
  by = "word",
  stagger,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const units = by === "word" ? text.split(" ") : Array.from(text);
  const step = stagger ?? (by === "word" ? 0.075 : 0.028);

  return (
    <Tag className={cn(className)} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container(step, delay)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
        aria-hidden
      >
        {units.map((u, i) => (
          <span
            key={`${u}-${i}`}
            className="inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <motion.span className="inline-block" variants={unit}>
              {u === " " ? " " : u}
              {by === "word" && i < units.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
