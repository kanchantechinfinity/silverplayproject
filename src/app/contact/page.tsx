import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { brand, heritage } from "@/data/site";

export const metadata = {
  title: "Contact — Silver Play",
  description: "Get in touch with Silver Play Studio — we respond to all queries within 24 hours.",
};

export default function ContactPage() {
  const banner = heritage.find((h) => h.handle === "ratna-virasat-1")!;

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Get in Touch"
          heading="We'd Love to Hear from You"
          image={banner.image}
          description="Silver Play Studio — handcrafted 925 silver jewellery from the heart of Jaipur. We respond to all queries within 24 hours."
        />

        <div className="mx-auto max-w-[1300px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-14 md:grid-cols-[1fr_1.3fr] md:gap-16 lg:gap-24">
            <div>
              <Reveal>
                <div className="space-y-8">
                  <InfoCard glyph="✉" label="Email Us">
                    <Link
                      href={`mailto:${brand.email}`}
                      className="font-display text-[1.05rem] text-[#8a6a2e] transition-colors duration-300 hover:text-ink"
                    >
                      {brand.email}
                    </Link>
                  </InfoCard>

                  <InfoCard glyph="◷" label="Hours">
                    <p className="font-body text-[1rem] text-ink/70">{brand.hours}</p>
                  </InfoCard>

                  <InfoCard glyph="✦" label="Follow Along">
                    <div className="flex flex-wrap gap-4">
                      {brand.social.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-[0.85rem] text-[#8a6a2e] underline decoration-[#8a6a2e]/30 underline-offset-4 transition-colors duration-300 hover:text-ink"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </InfoCard>
                </div>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.1}>
              <div
                className="rounded-[var(--radius-lg)] p-[3px]"
                style={{
                  background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
                }}
              >
                <div
                  className="rounded-[calc(var(--radius-lg)-3px)] p-7 sm:p-10"
                  style={{
                    background: "radial-gradient(140% 120% at 15% -10%, #f8f0da 0%, #f2e8d0 55%, #e6d3a8 100%)",
                  }}
                >
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  glyph,
  label,
  children,
}: {
  glyph: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#8a6a2e]/35 font-display text-[1.1rem] text-[#8a6a2e]" aria-hidden>
        {glyph}
      </span>
      <div>
        <p className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-ink/50">{label}</p>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}
