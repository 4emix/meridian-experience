"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

export default function Expertise() {
  const { t } = useT();
  const e = t.expertise;
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="expertise" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] text-glow">{e.idx}</span>
              <span className="font-mono text-[10px] tracking-[0.4em] text-fog">{e.tag}</span>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-mist md:text-6xl">
              {e.headingA}
              <br />
              <span className="italic text-white">{e.headingEm}</span>
            </h2>
          </Reveal>
        </div>
        <Reveal i={2} className="max-w-xs font-sans text-sm leading-relaxed text-fog">
          {e.sub}
        </Reveal>
      </div>

      <div className="border-t border-line">
        {e.services.map((s, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={s.id} i={i}>
              <div
                className="group cursor-pointer border-b border-line"
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
              >
                <div className="flex items-center justify-between gap-6 py-7 md:py-9">
                  <div className="flex items-baseline gap-5 md:gap-10">
                    <span className="font-mono text-xs text-fog md:text-sm">{s.id}</span>
                    <h3
                      className={`font-display text-2xl font-medium transition-colors duration-300 md:text-4xl lg:text-5xl ${
                        isOpen ? "text-white" : "text-mist/60 group-hover:text-mist"
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-glow text-glow" : "border-line text-fog"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-9 md:grid-cols-12 md:pl-[3.5rem]">
                        <p className="font-sans text-base leading-relaxed text-fog md:col-span-7 md:text-lg">
                          {s.blurb}
                        </p>
                        <div className="md:col-span-4 md:col-start-9">
                          <div className="mb-3 font-mono text-[9px] tracking-[0.3em] text-glow">
                            {s.tag}
                          </div>
                          <ul className="space-y-2">
                            {s.points.map((p) => (
                              <li key={p} className="flex items-center gap-3 font-sans text-sm text-mist">
                                <span className="h-1 w-1 rounded-full bg-glow" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
