import Link from "next/link";
import Image from "next/image";
import { brand, footerNav } from "@/data/site";
import Reveal from "@/components/motion/Reveal";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <Reveal>
            <Image
              src={brand.logoMark}
              alt={brand.name}
              width={140}
              height={140}
              className="h-24 w-auto"
            />
            <p className="mt-6 max-w-sm font-body text-[1.05rem] italic leading-relaxed text-bone/65">
              {brand.footerStatement}
            </p>
            <div className="mt-8 flex gap-6">
              {brand.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[0.64rem] uppercase tracking-[0.24em] text-bone/60 transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          {footerNav.map((col, i) => (
            <Reveal key={col.heading} delay={0.08 * (i + 1)}>
              <h4 className="eyebrow text-ash-2">{col.heading}</h4>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group relative font-body text-[1.02rem] text-bone/60 transition-colors duration-400 hover:text-bone"
                    >
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone/50 transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 h-px w-full bg-bone/12" />

        <div className="mt-8 flex flex-col gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-body text-[0.9rem] text-bone/45">{brand.copyright}</p>
          <p className="font-display text-[0.66rem] uppercase tracking-[0.24em] text-ash-2">
            {brand.curator}
          </p>
        </div>
      </div>
    </footer>
  );
}
