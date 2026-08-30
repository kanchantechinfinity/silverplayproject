"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Marquee from "@/components/motion/Marquee";
import { assurances } from "@/data/site";

/**
 * A slim strip pinned above everything (including the header) only while
 * the page is at the very top — the moment you scroll, it slides away for
 * good. Not a permanent sticky bar: Header itself is untouched and always
 * sits at its own fixed top:0, this just visually sits above it briefly.
 */
export default function AssuranceBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60] border-b border-ink/10 bg-bone-2/90 py-1.5 backdrop-blur-sm"
        >
          <Marquee
            speed={48}
            separator="—"
            items={assurances.map((a) => (
              <span
                key={a}
                className="font-display text-[0.6rem] uppercase tracking-[0.28em] text-ink/80"
              >
                {a}
              </span>
            ))}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
