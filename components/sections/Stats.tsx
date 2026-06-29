"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useT } from "@/lib/i18n";

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useT();
  return (
    <section className="border-y border-line/60 bg-graphite/40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px md:grid-cols-4">
        {t.stats.map((s) => (
          <div key={s.label} className="px-6 py-14 md:px-10 md:py-20">
            <div className="font-display text-5xl font-medium text-white md:text-6xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
