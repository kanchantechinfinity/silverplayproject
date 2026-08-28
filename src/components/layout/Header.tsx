"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, nav } from "@/data/site";
import { cn } from "@/lib/utils";
import MegaNav from "./MegaNav";

/**
 * Sits transparent over the hero card, then condenses into a floating bone
 * pill once the hero scrolls away.
 */
export default function Header() {
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    // The cinematic hero (when present) reports its own pin-release offset;
    // fall back to a plain viewport fraction for pages without it.
    const onScroll = () => {
      const threshold = window.__heroScrollEnd ?? window.innerHeight * 0.7;
      setPinned(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = cn(
    "font-display text-[0.66rem] uppercase tracking-[0.2em] transition-colors duration-500",
    pinned ? "text-ink/70 hover:text-ink" : "text-bone/85 hover:text-bone",
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: pinned ? "rgba(245,242,237,0.9)" : "rgba(245,242,237,0)",
            paddingLeft: pinned ? 24 : 34,
            paddingRight: pinned ? 24 : 34,
            paddingTop: pinned ? 12 : 26,
            paddingBottom: pinned ? 12 : 26,
            marginTop: pinned ? 14 : 0,
            marginLeft: pinned ? 14 : 0,
            marginRight: pinned ? 14 : 0,
            borderRadius: pinned ? 999 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto mx-auto flex items-center gap-6 backdrop-blur-xl",
            pinned
              ? "w-[calc(100%-28px)] max-w-[1500px] border border-ink/10 shadow-[0_10px_40px_-18px_rgba(26,22,20,0.35)]"
              : "w-full",
          )}
        >
          <button
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            className="flex flex-col gap-[5px] py-2 lg:hidden"
          >
            <span className={cn("block h-px w-6", pinned ? "bg-ink" : "bg-bone")} />
            <span className={cn("block h-px w-6", pinned ? "bg-ink" : "bg-bone")} />
            <span className={cn("block h-px w-4", pinned ? "bg-ink" : "bg-bone")} />
          </button>

          <Link href="/" className="shrink-0">
            <Image
              src={brand.logoMark}
              alt={brand.name}
              width={130}
              height={130}
              priority
              className={cn(
                "h-8 w-auto transition-all duration-500 md:h-9",
                pinned && "invert",
              )}
            />
          </Link>

          <nav className="mx-auto hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link href={item.href} className={cn(link, "group relative block py-1.5")}>
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
                      pinned ? "bg-ink" : "bg-bone",
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {open === item.label &&
                    (item.label === "Collections" ? (
                      <MegaNav onNavigate={() => setOpen(null)} />
                    ) : (
                      item.children && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full mt-3 min-w-[210px] -translate-x-1/2 overflow-hidden rounded-[var(--radius-md)] border border-ink/10 bg-bone/96 py-2 shadow-[0_20px_60px_-24px_rgba(26,22,20,0.5)] backdrop-blur-xl"
                        >
                          {item.children.map((c) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              className="block px-5 py-2.5 font-body text-[0.98rem] text-ink/75 transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </motion.div>
                      )
                    ))}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-5 lg:ml-0">
            <Link href="/account" className={cn(link, "hidden sm:block")}>
              Account
            </Link>
            <Link
              href="/cart"
              className={cn(
                "rounded-full border px-4 py-2 font-display text-[0.62rem] uppercase tracking-[0.18em] transition-colors duration-500",
                pinned
                  ? "border-ink/20 text-ink hover:bg-ink hover:text-bone"
                  : "border-bone/35 text-bone hover:bg-bone hover:text-ink",
              )}
            >
              Bag (0)
            </Link>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/97 backdrop-blur-lg lg:hidden"
          >
            <button
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className="absolute right-7 top-8 font-display text-[0.66rem] uppercase tracking-[0.24em] text-bone/80"
            >
              Close
            </button>
            <nav className="flex h-full flex-col justify-center gap-1 px-8">
              {nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="block py-3 font-display text-[1.7rem] text-bone"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
