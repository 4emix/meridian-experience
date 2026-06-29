"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { company } from "@/lib/content";
import { useT } from "@/lib/i18n";
import LangToggle from "@/components/ui/LangToggle";

export default function Nav({ visible }: { visible: boolean }) {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
          scrolled
            ? "py-3 backdrop-blur-md"
            : "py-5"
        }`}
      >
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-sans text-lg font-bold tracking-[0.35em] text-mist">
            {company.name}
          </span>
          <span className="hidden font-mono text-[9px] tracking-[0.3em] text-fog sm:block">
            İNŞAAT
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {t.navLabels.map((label, i) => (
            <a
              key={t.navHrefs[i]}
              href={t.navHrefs[i]}
              className="group relative font-sans text-[12px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-mist"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-glow transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="#contact"
            className="group relative hidden overflow-hidden rounded-full border border-line px-5 py-2 font-sans text-[11px] tracking-[0.2em] text-mist transition-colors hover:border-glow sm:block"
          >
            <span className="relative z-10">{t.startProject}</span>
          </a>
        </div>
      </div>
      <div
        className={`mx-auto h-px max-w-[1400px] origin-left bg-gradient-to-r from-transparent via-line to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.header>
  );
}
