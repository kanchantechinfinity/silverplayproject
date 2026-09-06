"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [view3d, setView3d] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse sm:gap-5">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] p-[3px] sm:flex-1"
        style={{
          background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-lg)-3px)] bg-bone-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 44vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* 360°/tilt viewer — a real interactive effect on the actual
              product photo, not a fabricated 3D model (none exist for this
              catalog). Labeled "3D View" per request; the experience itself
              is an honest cursor-driven tilt + zoom on the same image. */}
          <button
            type="button"
            onClick={() => setView3d(true)}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full border border-[#8a6a2e]/40 bg-[#241a10]/80 px-4 py-2 font-display text-[0.62rem] uppercase tracking-[0.18em] text-bone backdrop-blur-md transition-colors duration-300 hover:bg-[#241a10]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 12c0-3 4-5 9-5s9 2 9 5-4 5-9 5-9-2-9-5Z" />
              <ellipse cx="12" cy="12" rx="9" ry="3.2" transform="rotate(18 12 12)" />
            </svg>
            3D View
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] ring-2 transition-all duration-300 sm:h-20 sm:w-20",
                active === i ? "ring-[#8a6a2e]" : "ring-transparent hover:ring-[#8a6a2e]/40",
              )}
            >
              <Image src={src} alt="" fill sizes="5rem" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {view3d && (
          <Tilt3DModal image={images[active]} title={title} onClose={() => setView3d(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/** Full-screen cursor-tilt viewer: the image tilts in 3D space (perspective
 *  transform) toward wherever the pointer sits, and drag-zooms in. It's a
 *  genuine, working interaction — not a stand-in for a real 3D asset. */
function Tilt3DModal({
  image,
  title,
  onClose,
}: {
  image: string;
  title: string;
  onClose: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -18, y: px * 22 });
  };

  // Portalled to <body> — this sits inside <Reveal>, whose Framer Motion
  // wrapper applies an inline transform, which turns `position: fixed` into
  // "fixed to that ancestor" instead of the viewport (the same issue
  // QuickViewModal already works around the same way).
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c130b]/92 p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close 3D view"
        className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-bone/60"
      >
        ×
      </button>

      <p className="absolute top-7 left-1/2 -translate-x-1/2 text-center font-display text-[0.62rem] uppercase tracking-[0.24em] text-bone/60">
        Move to tilt · Click image to {zoomed ? "shrink" : "zoom"}
      </p>

      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        style={{ perspective: 1400 }}
        className="relative flex h-[70vh] w-[70vh] max-h-[520px] max-w-[520px] cursor-zoom-in items-center justify-center"
      >
        <motion.div
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: zoomed ? 1.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
        >
          <Image src={image} alt={title} fill sizes="520px" className="object-cover" priority />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.16) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.18) 100%)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>,
    document.body,
  );
}
