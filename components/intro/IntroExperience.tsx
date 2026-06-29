"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/lib/content";
import { useT } from "@/lib/i18n";
import LangToggle from "@/components/ui/LangToggle";

type Phase = "idle" | "building" | "done";

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: (i * 37.5) % 100,
  top: (i * 53.3) % 100,
  delay: (i % 7) * 0.6,
  dur: 6 + (i % 5) * 1.4,
  size: i % 4 === 0 ? 2.5 : 1.5,
}));

export default function IntroExperience({ onEnter }: { onEnter: () => void }) {
  const { t } = useT();
  const tx = t.intro;
  const [phase, setPhase] = useState<Phase>("idle");
  const [hidden, setHidden] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const finishBuild = useCallback(() => setPhase("done"), []);

  const handleReal = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("building");
    const v = videoRef.current;
    if (v && !videoError) {
      try {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.then === "function") p.catch(() => {});
        // safety: if 'ended' never fires, finish after duration
        window.setTimeout(finishBuild, 6500);
        return;
      } catch {
        /* fall through to image crossfade */
      }
    }
    // Fallback: timed crossfade blueprint -> iso
    window.setTimeout(finishBuild, 2600);
  }, [phase, videoError, finishBuild]);

  const handleEnter = useCallback(() => {
    setHidden(true);
    onEnter();
  }, [onEnter]);

  const onMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  };

  const building = phase === "building";
  const done = phase === "done";

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.section
          className="fixed inset-0 z-50 overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.06 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ---- Media stage ---- */}
          <div className="absolute inset-0">
            {/* Blueprint (2D plan) */}
            <motion.img
              src="/blueprint.png"
              alt="Architectural floor plan"
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: phase === "idle" ? 1 : 0,
                scale: phase === "idle" ? [1, 1.03, 1] : 1.05,
              }}
              transition={{
                opacity: { duration: 1, ease: "easeInOut" },
                scale:
                  phase === "idle"
                    ? { duration: 14, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 1 },
              }}
            />

            {/* Morph video (blueprint -> 3D). Stays visible through `done` so its
                final furnished frame never blinks to black during handoff. */}
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: (building || done) && !videoError ? 1 : 0 }}
              src="/build.mp4"
              poster="/blueprint.png"
              muted
              playsInline
              preload="metadata"
              onEnded={finishBuild}
              onError={() => setVideoError(true)}
            />

            {/* Final furnished isometric (crisp end state) */}
            <img
              src="/apartment-iso.png"
              alt="Furnished 3D apartment model"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
              style={{
                opacity: done || (building && videoError) ? 1 : 0,
              }}
            />
          </div>

          {/* ---- Atmosphere overlays ---- */}
          <div className="pointer-events-none absolute inset-0 bp-grid opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,12,16,0.55)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />

          {/* floating particles (idle only) */}
          {phase === "idle" && (
            <div className="pointer-events-none absolute inset-0">
              {PARTICLES.map((p) => (
                <span
                  key={p.id}
                  className="absolute rounded-full bg-glow/70"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.size,
                    height: p.size,
                    animation: `float-soft ${p.dur}s ease-in-out ${p.delay}s infinite`,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          )}

          {/* ---- Top marks ---- */}
          <motion.div
            className="absolute left-6 top-6 z-20 md:left-10 md:top-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="font-sans text-[13px] font-semibold tracking-[0.45em] text-mist">
              {company.name}
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-[0.3em] text-fog">
              EST. {company.founded} · {company.city.toUpperCase()}
            </div>
          </motion.div>

          <motion.div
            className="absolute right-6 top-6 z-30 flex flex-col items-end gap-3 md:right-10 md:top-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <LangToggle />
            <div className="hidden text-right font-mono text-[9px] leading-relaxed tracking-[0.25em] text-fog md:block">
              {tx.sheet}
              <br />
              {tx.spec}
            </div>
          </motion.div>

          {/* ---- Headline + REAL ---- */}
          <div className="pointer-events-none absolute inset-x-0 top-[11%] z-20 flex flex-col items-center px-6 text-center md:top-[13%]">
            <motion.p
              className="font-sans text-[11px] font-medium tracking-[0.5em] text-glow md:text-sm"
              initial={{ opacity: 0, y: 16, letterSpacing: "0.8em" }}
              animate={{
                opacity: phase === "idle" ? 1 : 0,
                y: 0,
                letterSpacing: "0.5em",
              }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {tx.pre}
            </motion.p>

            <div
              className="pointer-events-auto mt-2 md:mt-4"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <motion.button
                ref={btnRef}
                onClick={handleReal}
                disabled={phase !== "idle"}
                className={`group relative font-real font-extrabold uppercase leading-none tracking-[-0.02em] text-transparent transition-transform duration-300 ease-out ${
                  t.code === "tr"
                    ? "text-[13vw] md:text-[11vw] lg:text-[9vw]"
                    : "text-[26vw] md:text-[17vw] lg:text-[14vw]"
                }`}
                style={{ WebkitTextStroke: "1.5px rgba(220,226,235,0.92)" }}
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{
                  opacity: phase === "idle" ? 1 : 0,
                  scale: phase === "idle" ? 1 : 1.1,
                  y: 0,
                }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                aria-label="Reveal the experience"
              >
                <span
                  className="bg-gradient-to-b from-white via-mist to-glow bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                  style={{ WebkitTextStroke: "0" }}
                >
                  {tx.cta}
                </span>
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  {tx.cta}
                </span>
                <span className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-glow/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="hint"
                  className="pointer-events-none mt-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-fog md:mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { repeat: Infinity, duration: 2.4 }, delay: 1.4 }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-glow" />
                  {tx.clickToBuild}
                </motion.div>
              )}
              {building && (
                <motion.div
                  key="building"
                  className="pointer-events-none mt-2 font-mono text-[10px] tracking-[0.4em] text-glow md:mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {tx.assembling}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---- Done title + Enter ---- */}
          <AnimatePresence>
            {done && (
              <motion.div
                key="done"
                className="absolute inset-x-0 bottom-10 z-30 flex flex-col items-center gap-6 px-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-md font-display text-lg italic text-mist md:text-xl">
                  {tx.doneLine}
                </p>
                <button onClick={handleEnter} className="group flex flex-col items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.4em] text-mist transition-colors group-hover:text-white">
                    {tx.enter}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors group-hover:border-glow">
                    <motion.span
                      className="absolute inset-0 rounded-full border border-glow/40"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                    />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" className="text-mist group-hover:text-glow" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* corner brackets */}
          {[
            "left-6 top-6 border-l border-t",
            "right-6 top-6 border-r border-t",
            "left-6 bottom-6 border-l border-b",
            "right-6 bottom-6 border-r border-b",
          ].map((c, i) => (
            <div key={i} className={`pointer-events-none absolute h-6 w-6 border-glow/30 ${c}`} />
          ))}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
