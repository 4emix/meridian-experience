"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function Hero() {
  const { t } = useT();
  const h = t.hero;
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-fade", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const word = (t: string, d: number) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay: d, ease: [0.16, 1, 0.3, 1] }}
      >
        {t}
      </motion.span>
    </span>
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* parallax architectural backdrop */}
      <div className="hero-bg absolute inset-0 -z-10 scale-110">
        <img
          src="/hero.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(27,77,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bp-grid opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(91,139,255,0.06) 55%, transparent 70%)",
          }}
        />
        {/* large ghost numerals */}
        <div className="absolute -right-10 bottom-[-6vw] select-none font-display text-[34vw] leading-none text-white/[0.025]">
          1997
        </div>
      </div>

      <div className="hero-fade mx-auto w-full max-w-[1400px] px-6 pb-[8vh] md:px-10">
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <span className="h-px w-12 bg-glow" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-glow">
            {h.kicker}
          </span>
        </motion.div>

        <h1
          key={t.code}
          className="font-display text-[14vw] font-medium leading-[0.86] tracking-[-0.02em] text-mist md:text-[10vw] lg:text-[8.5vw]"
        >
          {word(h.h1.a, 0.2)}
          <span className="flex flex-wrap items-baseline gap-x-[0.25em]">
            <span className="overflow-hidden">
              <motion.span
                className="block italic text-white"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                {h.h1.em}
              </motion.span>
            </span>
            {word(h.h1.b, 0.46)}
          </span>
        </h1>

        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.p
            className="max-w-md font-sans text-base leading-relaxed text-fog md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {h.paragraph}
          </motion.p>

          <motion.a
            href="#expertise"
            className="group flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <span className="font-sans text-xs tracking-[0.3em] text-mist">
              {h.explore}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors group-hover:border-glow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" className="text-mist" />
              </svg>
            </span>
          </motion.a>
        </div>
      </div>

      {/* bottom data strip */}
      <div className="border-y border-line/60">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-line/60 md:grid-cols-4">
          {h.strip.map(([k, v]) => (
            <div key={k} className="px-6 py-4 md:px-8">
              <div className="font-mono text-[9px] tracking-[0.3em] text-fog">{k}</div>
              <div className="mt-1 font-sans text-sm text-mist">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
