"use client";

import { Reveal, RevealText } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

export default function Studio() {
  const { t } = useT();
  const s = t.studio;
  return (
    <section id="studio" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] text-glow">{s.idx}</span>
              <span className="font-mono text-[10px] tracking-[0.4em] text-fog">{s.tag}</span>
            </div>
          </Reveal>
          <h2 className="mt-8 font-display text-4xl font-medium leading-tight text-mist md:text-5xl">
            <RevealText key={t.code} text={s.heading} />
          </h2>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal i={1}>
            <p className="font-sans text-lg leading-relaxed text-fog md:text-xl">{s.p1}</p>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-6 font-sans leading-relaxed text-fog/80">{s.p2}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
            {s.cards.map(([a, b], i) => (
              <Reveal key={a} i={i} className="bg-graphite p-6">
                <div className="font-display text-xl text-mist">{a}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-fog">
                  {b}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
