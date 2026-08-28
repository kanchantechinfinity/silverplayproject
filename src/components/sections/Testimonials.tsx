"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { brandVoices } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A clothesline of real Silver Play statements, each pinned to a line and
 * swaying gently. Click one and it detaches — not a small in-place scale
 * like a typical gallery hover, but a full pop: the same card (shared via
 * layoutId, so Framer animates the actual handoff) leaves the line and
 * becomes a centered card. Click it again — or the backdrop — and it eases
 * straight back onto its own spot on the string.
 */
export default function Testimonials() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openVoice = brandVoices.find((v) => v.id === openId) ?? null;

  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <Reveal>
          <p className="eyebrow text-[#c9a879]">In Her Own Words</p>
        </Reveal>
        <SplitText
          text="Notes We Keep"
          className="mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] text-bone"
        />
      </div>

      <div className="relative mt-24 overflow-x-auto md:mt-28">
        {/* The rope — a twisted-fibre texture rather than a flat line, with a
            soft shadow beneath so it reads as something cards actually hang
            their weight on. */}
        <div
          className="pointer-events-none absolute inset-x-6 top-0 mx-auto h-[9px] max-w-6xl rounded-full"
          style={{
            background:
              "repeating-linear-gradient(55deg, #9c7a45 0px, #9c7a45 3px, #6b4f28 3px, #6b4f28 6px)",
            boxShadow:
              "0 4px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 1px rgba(0,0,0,0.35)",
          }}
        />

        <div className="mx-auto flex max-w-6xl flex-nowrap justify-center gap-x-4 px-8 pt-3 md:gap-x-10">
          {brandVoices.map((voice, i) => (
            <HangingCard
              key={voice.id}
              voice={voice}
              index={i}
              isOpen={openId === voice.id}
              onOpen={() => setOpenId(voice.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openVoice && (
          <ExpandedCard voice={openVoice} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function HangingCard({
  voice,
  index,
  isOpen,
  onOpen,
}: {
  voice: (typeof brandVoices)[number];
  index: number;
  isOpen: boolean;
  onOpen: () => void;
}) {
  // Every card sways on its own clock so the line never reads as one rigid
  // unit — offsetting duration and delay per index is enough to desync them.
  const duration = 4.6 + (index % 3) * 0.7;
  const delay = (index % 4) * 0.35;
  const amplitude = 2.4 + (index % 2) * 0.8;

  return (
    <div className="relative flex shrink-0 flex-col items-center">
      {/* Thread down from the rope, plus a small knot where it's tied on. */}
      <span className="absolute -top-[22px] h-[24px] w-[2px] bg-[#7a5c30]" />
      <span className="absolute -top-[27px] h-[9px] w-[9px] rounded-full border border-[#4a3618] bg-[#8a6a3d] shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />

      <motion.div
        className="origin-top"
        animate={
          isOpen ? { rotate: 0 } : { rotate: [-amplitude, amplitude, -amplitude] }
        }
        transition={
          isOpen
            ? { duration: 0.4 }
            : { duration, delay, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.button
          type="button"
          layoutId={`voice-card-${voice.id}`}
          onClick={onOpen}
          style={{ opacity: isOpen ? 0 : 1 }}
          className="block w-[13rem] cursor-pointer text-left sm:w-[15.5rem]"
          aria-label={`Read the full note: ${voice.attribution}`}
        >
          <VoiceCard voice={voice} compact />
        </motion.button>
      </motion.div>
    </div>
  );
}

function ExpandedCard({
  voice,
  onClose,
}: {
  voice: (typeof brandVoices)[number];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <motion.button
        type="button"
        layoutId={`voice-card-${voice.id}`}
        onClick={onClose}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative z-10 w-full max-w-md cursor-pointer text-left"
        aria-label="Close"
      >
        <VoiceCard voice={voice} compact={false} />
      </motion.button>
    </motion.div>
  );
}

/** The parchment note itself — shared between the hanging and expanded
 *  states, so its own size/scale is the only thing that needs to change. */
function VoiceCard({
  voice,
  compact,
}: {
  voice: (typeof brandVoices)[number];
  compact: boolean;
}) {
  return (
    <div
      className="grain relative rounded-[var(--radius-md)] p-[3px]"
      style={{
        background:
          "linear-gradient(155deg, rgba(201,168,76,0.55), rgba(201,168,76,0.15) 40%, rgba(201,168,76,0.4))",
        boxShadow: compact
          ? "0 18px 34px -18px rgba(0,0,0,0.55)"
          : "0 40px 90px -30px rgba(0,0,0,0.65)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[calc(var(--radius-md)-3px)] border border-[#c9a84c]/30"
        style={{
          background:
            "radial-gradient(120% 140% at 15% 0%, #f7efd9 0%, #eee0bd 55%, #e6d5ab 100%)",
        }}
      >
        <div
          className={
            compact
              ? "flex flex-col items-center gap-4 px-6 py-8"
              : "flex flex-col items-center gap-6 px-9 py-12"
          }
        >
          <span
            className={
              (compact ? "text-lg " : "text-2xl ") +
              "font-flourish text-[#8a6a2e]/80"
            }
            aria-hidden
          >
            ❧
          </span>

          <p
            className={
              (compact ? "text-[1.02rem] leading-snug " : "text-[1.4rem] leading-relaxed ") +
              "script text-center text-[#3a2c14]"
            }
          >
            &ldquo;{voice.quote}&rdquo;
          </p>

          <p
            className={
              (compact ? "text-[0.62rem] " : "text-[0.7rem] ") +
              "font-display uppercase tracking-[0.24em] text-[#8a6a2e]"
            }
          >
            {voice.attribution}
          </p>
        </div>
      </div>
    </div>
  );
}
