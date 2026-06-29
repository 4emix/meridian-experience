"use client";

import { Reveal, RevealText } from "@/components/ui/Reveal";
import { company } from "@/lib/content";
import { useT } from "@/lib/i18n";

export default function Contact() {
  const { t } = useT();
  const c = t.contact;
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(27,77,255,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <span className="font-mono text-[10px] tracking-[0.4em] text-glow">{c.idx}</span>
        </Reveal>

        <h2 className="mt-8 font-display text-[13vw] font-medium leading-[0.88] tracking-tight text-mist md:text-[8.5vw]">
          <RevealText key={`${t.code}-a`} text={c.lineA} />
          <br />
          <span className="italic text-white">
            <RevealText key={`${t.code}-b`} text={c.lineEm} />
          </span>
        </h2>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="max-w-sm font-sans text-lg leading-relaxed text-fog">{c.paragraph}</p>
            </Reveal>
            <Reveal i={1}>
              <a
                href={`mailto:${company.email}`}
                className="group mt-10 inline-flex items-center gap-4"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-glow text-ink transition-transform group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <span className="font-display text-2xl text-mist transition-colors group-hover:text-white md:text-3xl">
                  {c.startProject}
                </span>
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:col-span-6 md:col-start-7 sm:grid-cols-2">
            {[
              [c.labels.email, company.email, `mailto:${company.email}`],
              [c.labels.phone, company.phone, `tel:${company.phoneHref}`],
              [c.labels.studio, company.address, undefined],
              [c.labels.hours, c.hoursValue, undefined],
            ].map(([k, v, href], i) => (
              <Reveal key={k as string} i={i}>
                <div className="font-mono text-[9px] tracking-[0.3em] text-glow">
                  {(k as string).toUpperCase()}
                </div>
                {href ? (
                  <a
                    href={href as string}
                    className="mt-2 block font-sans text-base leading-relaxed text-mist transition-colors hover:text-white"
                  >
                    {v}
                  </a>
                ) : (
                  <div className="mt-2 font-sans text-base leading-relaxed text-mist">{v}</div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="relative border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <div className="font-sans text-lg font-bold tracking-[0.35em] text-mist">
              {company.name}
            </div>
            <div className="mt-1 max-w-xs font-mono text-[9px] leading-relaxed tracking-[0.2em] text-fog">
              {company.legal}
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {t.navLabels.map((label, i) => (
              <a
                key={t.navHrefs[i]}
                href={t.navHrefs[i]}
                className="font-sans text-[12px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-mist"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="font-mono text-[9px] tracking-[0.25em] text-fog">
            © {new Date().getFullYear()} {company.name} · {company.city.toUpperCase()}
          </div>
        </div>
      </footer>
    </section>
  );
}
