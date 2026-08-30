import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Founder from "@/components/sections/Founder";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { aboutPage } from "@/data/site";

export const metadata = {
  title: "Our Story — Silver Play",
  description: "The soul of Indian silver: handcrafted 925 sterling silver jewellery from the karigars of Jaipur.",
};

export default function AboutPage() {
  const { hero, craft, values, closing } = aboutPage;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-ink pt-32">
          <div className="absolute inset-0">
            <Image
              src={hero.image}
              alt={hero.heading}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 md:px-10 md:pb-24">
            <Reveal>
              <p className="eyebrow text-ash-3">{hero.eyebrow}</p>
            </Reveal>
            <SplitText
              text={hero.heading}
              className="mt-4 max-w-3xl text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] text-bone"
            />

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-bone/15 pt-8 sm:grid-cols-4">
              {hero.badges.map((b, i) => (
                <Reveal key={b.label} delay={0.1 * i}>
                  <p className="font-display text-[1.3rem] text-[#d8b466]" aria-hidden>
                    {b.glyph}
                  </p>
                  <p className="mt-2 font-display text-[0.8rem] uppercase tracking-[0.1em] text-bone">
                    {b.label}
                  </p>
                  <p className="mt-0.5 font-body text-[0.78rem] text-bone/55">{b.sub}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founder — real content, reused component */}
        <Founder />

        {/* Craft */}
        <section className="bg-bone py-20 md:py-28">
          <div className="mx-auto max-w-[1500px] px-5 md:px-10">
            <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16 lg:gap-20">
              <div className="order-2 md:order-1">
                <Reveal>
                  <p className="eyebrow text-ash-3">{craft.eyebrow}</p>
                </Reveal>
                <SplitText
                  text={craft.heading}
                  className="mt-4 text-[clamp(1.9rem,4vw,3rem)] text-ink"
                />
                {craft.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={0.15 + i * 0.1}>
                    <p className="mt-5 max-w-xl font-body text-[1.02rem] leading-relaxed text-ink/65">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal direction="right" className="order-1 md:order-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[0_30px_70px_-30px_rgba(26,22,20,0.4)]">
                  <Image
                    src={craft.image}
                    alt={craft.heading}
                    fill
                    sizes="(max-width: 768px) 92vw, 44vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-5 text-center md:px-10">
            <Reveal>
              <p className="eyebrow text-ash-3">{values.eyebrow}</p>
            </Reveal>
            <SplitText
              text={values.heading}
              className="mt-4 text-[clamp(1.9rem,4vw,3rem)] text-bone"
            />
            <Reveal delay={0.15}>
              <p aria-hidden className="mt-6 font-display text-[1.3rem] text-[#d8b466]">
                ❧
              </p>
              <p className="mt-6 font-body text-[1.05rem] leading-relaxed text-bone/65">
                {values.paragraph}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-bone-2 py-24 md:py-32">
          <div className="mx-auto max-w-xl px-5 text-center md:px-10">
            <SplitText
              text={closing.heading}
              className="text-[clamp(2.2rem,5vw,3.6rem)] text-ink"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 font-body text-[1.05rem] leading-relaxed text-ink/65">
                {closing.paragraph}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href={closing.ctaHref}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-[0.68rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3"
              >
                {closing.ctaLabel}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
