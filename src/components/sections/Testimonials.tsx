"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { brandVoices } from "@/data/site";

const N = brandVoices.length;
const MAX_SAG = 34; // px the rope (and the cards hanging from it) dip at the centre

/** Symmetric dip — 0 at the edges, 1 at the centre — shared by the rope's own
 *  curve and every card's hang length, so the two visually agree. */
function sagFactor(index: number) {
  const t = N > 1 ? index / (N - 1) : 0.5;
  return 4 * t * (1 - t);
}

/**
 * A clothesline of real Silver Play statements, each tied to a sagging rope
 * and swaying gently. Clicking a card detaches it — not a small in-place
 * scale like a typical gallery hover, but a full pop: the same card (shared
 * via layoutId, so Framer animates the actual handoff) leaves the rope and
 * becomes a centered card. Click it again — or the backdrop — and it eases
 * straight back onto its own spot on the line.
 */
export default function Testimonials() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openVoice = brandVoices.find((v) => v.id === openId) ?? null;

  return (
    <section className="relative w-full overflow-hidden bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <Reveal>
          <p className="eyebrow text-[#c9a879]">In Her Own Words</p>
        </Reveal>
        <SplitText
          text="Notes We Keep"
          className="mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] text-bone"
        />
      </div>

      <div className="relative mt-24 w-full overflow-x-auto md:mt-28">
        <Rope />

        <div className="mx-auto flex w-max min-w-full flex-nowrap justify-center gap-x-4 px-8 pt-3 md:gap-x-12 md:px-16">
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

/** The rope: a sagging catenary-like curve, not a straight line — a solid
 *  base stroke plus a dashed overlay along the same path to read as
 *  twisted, fibrous cord rather than a flat ribbon. */
function Rope() {
  const dip = 20 + MAX_SAG;
  const path = `M 0,20 Q 50,${dip} 100,20`;

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 h-[64px] w-full"
      viewBox="0 0 100 64"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke="#4a3618"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="#a4813f"
        strokeWidth="1.4"
        strokeDasharray="2.2 2.6"
        strokeLinecap="round"
        opacity="0.85"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
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

  // How far this slot sits below the rope's own high points — cards near
  // the centre hang from a lower point on the sag, exactly like real
  // clothes on a loaded line.
  const sag = sagFactor(index) * MAX_SAG;
  const threadLength = 22 + sag;

  return (
    <div
      className="relative flex shrink-0 flex-col items-center"
      style={{ marginTop: sag }}
    >
      {/* Thread down from the rope, plus a small knot where it's tied on. */}
      <span
        className="absolute w-[2px] bg-[#7a5c30]"
        style={{ top: -threadLength, height: threadLength }}
      />
      <span
        className="absolute h-[9px] w-[9px] rounded-full border border-[#4a3618] bg-[#8a6a3d] shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        style={{ top: -threadLength - 4 }}
      />

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
          <VoiceCard voice={voice} compact index={index} />
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
        <VoiceCard voice={voice} compact={false} index={0} />
      </motion.button>
    </motion.div>
  );
}

/** The parchment note itself — shared between the hanging and expanded
 *  states, so its own size/scale is the only thing that needs to change.
 *  Aged deliberately: foxed corner stains, a double-rule frame, and a
 *  flourish at each corner rather than a single clean rectangle. */
function VoiceCard({
  voice,
  compact,
  index,
}: {
  voice: (typeof brandVoices)[number];
  compact: boolean;
  index: number;
}) {
  // A hair of rotation baked into the rest pose, alternating by slot, so the
  // row doesn't read as machine-aligned even before the idle sway kicks in.
  const tilt = compact ? (index % 2 === 0 ? -1.1 : 1.3) : 0;

  return (
    <div
      className="relative rounded-[var(--radius-md)] p-[3px]"
      style={{
        transform: `rotate(${tilt}deg)`,
        background:
          "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
        boxShadow: compact
          ? "0 18px 34px -18px rgba(0,0,0,0.6)"
          : "0 40px 90px -30px rgba(0,0,0,0.7)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[calc(var(--radius-md)-3px)]"
        style={{
          background:
            "radial-gradient(130% 150% at 12% -10%, #f9f1dc 0%, #eddfb9 42%, #ddc793 78%, #cbaf78 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(90,64,26,0.55), inset 0 0 0 6px transparent, inset 0 0 0 7px rgba(90,64,26,0.32)",
        }}
      >
        {/* Foxing — soft age blotches, the kind old paper actually gets. */}
        <div
          className="pointer-events-none absolute -left-6 -top-8 h-24 w-24 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #8a6a2e 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -right-4 h-28 w-28 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #6b4f28 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        {/* Corner flourishes — a small quiet echo of an old letterhead. */}
        {["top-2 left-2", "top-2 right-2 scale-x-[-1]", "bottom-2 left-2 scale-y-[-1]", "bottom-2 right-2 scale-x-[-1] scale-y-[-1]"].map(
          (pos) => (
            <span
              key={pos}
              className={`pointer-events-none absolute ${pos} font-flourish text-[0.7rem] text-[#8a6a2e]/50`}
              aria-hidden
            >
              ✦
            </span>
          ),
        )}

        <div
          className={
            (compact
              ? "flex flex-col items-center gap-4 px-6 py-8"
              : "flex flex-col items-center gap-6 px-9 py-12") + " relative"
          }
        >
          <span
            className={(compact ? "text-lg " : "text-2xl ") + "font-flourish text-[#8a6a2e]/80"}
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
