"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const parent = (stagger: number, delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const child: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Wrap a list; every <StaggerItem> inside cascades in on scroll. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={cn(className)}
      variants={parent(stagger, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp className={cn(className)} variants={child}>
      {children}
    </Comp>
  );
}
