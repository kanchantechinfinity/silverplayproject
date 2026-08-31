import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { StoneGuideEntry } from "@/data/stoneGuide";

/**
 * Full guide for one stone, always fully expanded — no click-through to a
 * separate page. Gold-gradient card frame matches EditCard/ArchiveTreasure
 * so the guide reads as part of the same site, not a bolted-on doc page.
 */
export default function StoneCard({
  stone,
  image,
}: {
  stone: StoneGuideEntry;
  image: string;
}) {
  return (
    <Reveal className="h-full">
      <div
        id={`stone-${stone.handle}`}
        className="h-full scroll-mt-28 rounded-[var(--radius-lg)] p-[3px]"
        style={{
          background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
        }}
      >
        <div
          className="flex h-full flex-col rounded-[calc(var(--radius-lg)-3px)] p-4"
          style={{
            background:
              "radial-gradient(140% 160% at 15% -10%, #f8f0da 0%, #f2e8d0 45%, #e6d3a8 100%)",
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-bone-2 shadow-[inset_0_0_0_1px_rgba(138,106,46,0.25)]">
            <Image
              src={image}
              alt={stone.name}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 30vw"
              className="object-cover"
            />
          </div>

          <h3 className="mt-5 font-display text-[1.25rem] text-[#3a2b1c]">{stone.name}</h3>
          <p className="mt-1 font-body text-[0.86rem] italic text-[#8a6a2e]">{stone.tagline}</p>

          <p className="mt-3 font-body text-[0.92rem] leading-relaxed text-[#5c452a]">
            {stone.meaning}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {stone.properties.map((p) => (
              <li
                key={p}
                className="rounded-full border border-[#8a6a2e]/30 bg-[#8a6a2e]/8 px-3 py-1 font-display text-[0.62rem] uppercase tracking-[0.08em] text-[#6b5326]"
              >
                {p}
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-2.5 border-t border-[#8a6a2e]/20 pt-4 text-[0.82rem] leading-relaxed text-[#5c452a]">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-display text-[0.62rem] uppercase tracking-[0.1em] text-[#8a6a2e]">
                Wear
              </dt>
              <dd>{stone.howToWear}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-display text-[0.62rem] uppercase tracking-[0.1em] text-[#8a6a2e]">
                Care
              </dt>
              <dd>{stone.care}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-display text-[0.62rem] uppercase tracking-[0.1em] text-[#8a6a2e]">
                Best For
              </dt>
              <dd>{stone.whenToWear}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Reveal>
  );
}
