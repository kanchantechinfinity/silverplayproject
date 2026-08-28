"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { faqs } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A single-open accordion — real Silver Play policy copy, styled in the
 * site's vintage parchment/gold vocabulary. Each row is a hairline-divided
 * question that expands into its answer; only one stays open at a time.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow text-[#86714d]">Good To Know</p>
          </Reveal>
          <SplitText
            text="Frequently Asked"
            className="mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] text-[#3a2b1c]"
          />
        </div>

        <Reveal delay={0.15}>
          <div
            className="mt-14 overflow-hidden rounded-[var(--radius-lg)] p-[3px]"
            style={{
              background:
                "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
            }}
          >
            <div
              className="rounded-[calc(var(--radius-lg)-3px)]"
              style={{
                background:
                  "radial-gradient(140% 120% at 15% -10%, #f8f0da 0%, #f2e8d0 55%, #e6d3a8 100%)",
              }}
            >
              {faqs.map((item, i) => (
                <FaqRow
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                  isOpen={openIndex === i}
                  isLast={i === faqs.length - 1}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqRow({
  question,
  answer,
  isOpen,
  isLast,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={isLast ? "" : "border-b border-[#8a6a2e]/20"}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors duration-300 hover:bg-[#8a6a2e]/[0.04] md:px-8"
      >
        <span className="font-display text-[1.02rem] text-[#3a2b1c] md:text-[1.08rem]">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#8a6a2e]/35 font-display text-[1.1rem] text-[#8a6a2e]"
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <p className="script px-6 pb-6 text-[1.02rem] leading-relaxed text-[#5c4a2e] md:px-8 md:text-[1.08rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
