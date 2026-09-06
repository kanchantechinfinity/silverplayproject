"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
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
    // The cinematic hero (homepage only) reports its own pin-release offset
    // via the scrubbed ScrollTrigger track. Everywhere else, measure the
    // real height of whatever page hero is actually on screen instead of
    // guessing a flat viewport fraction — that guess (70vh) sat well below
    // PageHero's real ~52vh on interior pages, and even further past pages
    // with no hero at all (the single product page), so the header stayed
    // transparent long after the dark banner it's meant to sit over had
    // already ended. A page with no hero marker at all has nothing for the
    // transparent look to sit over in the first place, so it just starts
    // already pinned — the same floating cream pill every other page
    // settles into, from the very first frame instead of scrolling into it.
    const onScroll = () => {
      let threshold = window.__heroScrollEnd;
      if (threshold == null) {
        const hero = document.querySelector<HTMLElement>("[data-page-hero]");
        if (!hero) {
          setPinned(true);
          return;
        }
        threshold = hero.getBoundingClientRect().top + window.scrollY + hero.offsetHeight - 1;
      }
      setPinned(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // PageHero's height is viewport-relative (minHeight in vh), so the
    // threshold needs to be recomputed if the viewport is resized.
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const link = cn(
    "font-display text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500",
    pinned
      ? "text-ink/85 hover:text-ink"
      : "text-bone drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] hover:text-bone",
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: pinned ? "rgba(245,242,237,0.9)" : "rgba(245,242,237,0)",
            paddingLeft: 34,
            paddingRight: 34,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: pinned ? 14 : 0,
            borderRadius: pinned ? 999 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto mx-auto flex items-center gap-6 backdrop-blur-xl lg:grid lg:grid-cols-[1fr_auto_1fr]",
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

          <Link href="/" className="shrink-0 origin-left lg:justify-self-start">
            <Image
              src={brand.logoMark}
              alt={brand.name}
              width={160}
              height={160}
              priority
              className={cn(
                "w-auto origin-left scale-150 transition-all duration-500",
                pinned ? "h-12" : "h-16 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] md:h-20",
                pinned && "invert",
              )}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
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

          <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:justify-self-end">
            <HeaderIconLink href="/search" label="Search" pinned={pinned}>
              <circle cx="11" cy="11" r="7.5" />
              <path d="m20.5 20.5-4.35-4.35" />
            </HeaderIconLink>
            <HeaderIconLink href="/wishlist" label="Wishlist" pinned={pinned} className="hidden sm:flex">
              <path d="M12 20.5s-7.5-4.6-9.9-9.3C.6 8 1.8 4.3 5.2 3.4c2-.5 4 .3 5.2 2 .5.7 1 1.4 1.6 2.1.6-.7 1.1-1.4 1.6-2.1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.6 4.6 3.1 7.8-2.4 4.7-9.9 9.3-9.9 9.3Z" />
            </HeaderIconLink>
            <HeaderIconLink href="/account" label="Account" pinned={pinned} className="hidden sm:flex">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20.5c1.4-4 4.4-6 8-6s6.6 2 8 6" />
            </HeaderIconLink>
            <HeaderIconLink href="/cart" label="Bag, 0 items" pinned={pinned} badge={0}>
              <path d="M6.5 8.5h11l1 12.5h-13l1-12.5Z" />
              <path d="M9 8.5v-2a3 3 0 0 1 6 0v2" />
            </HeaderIconLink>
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

/** One thin-stroke header icon — the standard Shopify-header set (search,
 *  wishlist, account, bag), all sharing the same size, stroke weight and
 *  pinned/unpinned colour logic as the text links beside them. */
function HeaderIconLink({
  href,
  label,
  pinned,
  badge,
  className,
  children,
}: {
  href: string;
  label: string;
  pinned: boolean;
  badge?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500",
        pinned ? "text-ink/80 hover:bg-ink/5 hover:text-ink" : "text-bone hover:bg-bone/10",
        !pinned && "drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <svg
        width="21"
        height="21"
        viewBox="0 0 23 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
      {typeof badge === "number" && (
        <span
          className={cn(
            "absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full font-display text-[0.55rem] font-semibold",
            pinned ? "bg-ink text-bone" : "bg-bone text-ink",
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
