"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { journal } from "@/data/site";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function JournalArchiveGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(journal.map((p) => p.category)))],
    [],
  );
  const [active, setActive] = useState("All");

  const posts = active === "All" ? journal : journal.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-5 py-2 font-display text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-300",
              active === c
                ? "border-ink bg-ink text-bone"
                : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <Stagger className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" key={active}>
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#241a10]/85 px-3 py-1 font-display text-[0.56rem] uppercase tracking-[0.16em] text-[#f2e8d0]">
                  {post.category}
                </span>
              </div>
              <p className="mt-4 font-body text-[0.8rem] text-ink/45">{formatDate(post.date)}</p>
              <h3 className="mt-1.5 font-display text-[1.1rem] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-[#8a6a2e]">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 font-body text-[0.9rem] leading-relaxed text-ink/55">
                {post.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-[#8a6a2e]">
                Read Story
                <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
