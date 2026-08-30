import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

/** Shared banner hero for interior pages — real image behind a dark scrim,
 *  header sits transparent over it exactly like the homepage does. */
export default function PageHero({
  eyebrow,
  heading,
  image,
  description,
  minHeight = "52vh",
}: {
  eyebrow: string;
  heading: string;
  image: string;
  description?: string;
  minHeight?: string;
}) {
  return (
    <section
      className="relative flex items-end overflow-hidden bg-ink pt-32"
      style={{ minHeight }}
    >
      <div className="absolute inset-0">
        <Image src={image} alt={heading} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-14 md:px-10 md:pb-20">
        <Reveal>
          <p className="eyebrow text-ash-3">{eyebrow}</p>
        </Reveal>
        <SplitText
          text={heading}
          className="mt-3 max-w-2xl text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] text-bone"
        />
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl font-body text-[1rem] leading-relaxed text-bone/65">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
