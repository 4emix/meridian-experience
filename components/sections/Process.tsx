"use client";

import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function Process() {
  const { t } = useT();
  const pr = t.process;
  return (
    <section id="process" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-16">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.4em] text-glow">{pr.idx}</span>
            <span className="font-mono text-[10px] tracking-[0.4em] text-fog">{pr.tag}</span>
          </div>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-tight text-mist md:text-6xl">
            {pr.headingA} <span className="italic text-white">{pr.headingEm}</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
        {pr.steps.map((p, i) => (
          <Reveal key={p.n} i={i} className="group relative bg-graphite p-7 md:p-8">
            <motion.span
              className="absolute left-0 top-0 h-px bg-glow"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="font-mono text-[10px] tracking-[0.3em] text-glow">{p.n}</div>
            <h3 className="mt-10 font-display text-2xl text-mist transition-colors group-hover:text-white">
              {p.title}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
