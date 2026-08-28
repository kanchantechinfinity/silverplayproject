"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { faqs } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** A real Silver Play product/collection shot paired with each question, so
 *  the hover pop-out always shows a genuine photo — none are invented. */
const faqImages = [
  "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-cascade-chains-earring.png?v=1786310334",
  "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-designer-monarch-elegance-drop-earring.png?v=1786310352",
  "https://cdn.shopify.com/s/files/1/0702/4456/5101/files/sterling-silver-rose-quartz-teardrop-filigree-pendant.jpg?v=1786310371",
  "https://silverplay.in/cdn/shop/files/SP_Website_Banners_10_800x1200_crop_center.png?v=1783577220",
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow text-ash-3">Good To Know</p>
          </Reveal>
          <SplitText
            text="Frequently Asked"
            className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] text-bone"
          />
        </div>

        <div className="relative mt-14 border-t border-bone/12">
          {faqs.map((item, i) => (
            <FaqRow
              key={item.q}
              index={i}
              question={item.q}
              answer={item.a}
              image={faqImages[i % faqImages.length]}
              isActive={active === i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  index,
  question,
  answer,
  image,
  isActive,
  onEnter,
  onLeave,
}: {
  index: number;
  question: string;
  answer: string;
  image: string;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="group relative border-b border-bone/12"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative z-10 flex items-center gap-4 px-4 py-6 md:gap-8 md:px-8 md:py-7">
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
          className="absolute inset-0"
          style={{ background: "#d9b66c" }}
        />

        <span
          className={`relative font-display text-[0.72rem] tracking-[0.1em] transition-colors duration-400 ${
            isActive ? "text-[#241a10]/50" : "text-bone/40"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={`relative min-w-0 flex-1 transition-[padding] duration-400 ${
            isActive ? "md:pr-36 lg:pr-44" : ""
          }`}
        >
          <h3
            className={`font-display text-[1.15rem] font-semibold leading-snug transition-colors duration-400 md:text-[1.4rem] ${
              isActive ? "text-[#241a10]" : "text-bone"
            }`}
          >
            {question}
          </h3>
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.p
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease }}
                className="max-w-md overflow-hidden font-body text-[0.86rem] leading-relaxed text-[#241a10]/70"
              >
                {answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <span
          className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
            isActive
              ? "border-[#241a10]/30 text-[#241a10]"
              : "border-bone/25 text-bone group-hover:border-bone/50"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 14 14 6" />
            <path d="M7.5 6H14v6.5" />
          </svg>
        </span>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.85, rotate: -6 }}
            transition={{ duration: 0.4, ease }}
            className="pointer-events-none absolute -top-6 -bottom-6 right-24 z-20 hidden w-[96px] overflow-hidden rounded-[var(--radius-md)] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] md:block lg:w-[112px]"
          >
            <Image src={image} alt="" fill sizes="112px" className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
