import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { journal } from "@/data/site";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Silver Play`, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = journal.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-32">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-14 md:px-10 md:pb-20">
            <Reveal>
              <p className="eyebrow text-[#d8b466]">{post.category}</p>
            </Reveal>
            <SplitText
              text={post.title}
              className="mt-4 text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.05] text-bone"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 font-body text-[0.9rem] text-bone/55">
                {formatDate(post.date)} · By Silver Play · {post.readTime}
              </p>
            </Reveal>
          </div>
        </section>

        <article className="bg-bone py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-5 md:px-10">
            <Reveal>
              <p className="font-display text-[1.15rem] leading-relaxed text-ink/80">
                {post.excerpt}
              </p>
            </Reveal>

            <div className="mt-8 space-y-8">
              {post.body.map((section, i) => (
                <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                  {section.heading && (
                    <h2 className="mb-3 font-display text-[1.35rem] text-ink">
                      {section.heading}
                    </h2>
                  )}
                  <p className="font-body text-[1.05rem] leading-relaxed text-ink/70">
                    {section.text}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link
                href="/journal"
                className="group mt-14 inline-flex items-center gap-2 font-display text-[0.64rem] uppercase tracking-[0.22em] text-ink/60 transition-colors duration-500 hover:text-ink"
              >
                <span className="transition-transform duration-500 group-hover:-translate-x-1">
                  &larr;
                </span>
                Back to the Journal
              </Link>
            </Reveal>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-ink/10 bg-bone-2 py-20 md:py-28">
            <div className="mx-auto max-w-[1500px] px-5 md:px-10">
              <Reveal>
                <p className="eyebrow text-ash-3">More Stories</p>
              </Reveal>
              <Stagger className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {related.map((p) => (
                  <StaggerItem key={p.slug}>
                    <Link href={`/journal/${p.slug}`} className="group block">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)]">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 92vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-4 font-display text-[1.02rem] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-[#8a6a2e]">
                        {p.title}
                      </h3>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
