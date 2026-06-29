"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (a: number, b: number, x: number) => {
  const e = clamp01((x - a) / (b - a));
  return e * e * (3 - 2 * e);
};

/**
 * Hero that scrubs a pre-rendered Higgsfield orbit video by scroll position.
 * Scroll maps directly to video.currentTime, so playback tracks the scroll at
 * whatever rate the user moves — smooth 60fps feel via a per-frame seek loop.
 */
export default function VideoScrubHero() {
  const { t } = useT();
  const tx = t.intro;
  const h = t.hero;

  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  const progress = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const video = videoRef.current!;
    const stage = stageRef.current!;

    let duration = 0;
    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const updateOverlay = (el: HTMLElement | null, opacity: number, ty = 0) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(0, ${ty}px, 0)`;
      el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      // ease the scrubbed time toward the scroll target for buttery motion
      progress.current += (target.current - progress.current) * 0.18;
      const p = progress.current;

      if (duration > 0) {
        const tt = p * (duration - 0.04);
        if (Math.abs(video.currentTime - tt) > 0.001) {
          try {
            video.currentTime = tt;
          } catch {
            /* seeking; ignore */
          }
        }
      }

      updateOverlay(titleRef.current, 1 - smooth(0.02, 0.26, p), -smooth(0.02, 0.26, p) * 40);
      updateOverlay(hintRef.current, 1 - smooth(0.0, 0.09, p));
      updateOverlay(outroRef.current, smooth(0.62, 0.93, p), (1 - smooth(0.62, 0.93, p)) * 30);
    };
    loop();

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stage,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        target.current = self.progress;
      },
    });
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      st.kill();
    };
  }, [t.code]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[500vh]">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0 bp-grid opacity-50" />

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          src="/hero-build.mp4"
          poster="/hero-iso.png"
          muted
          playsInline
          preload="auto"
        />

        {/* scrims: keep whole model visible (contain) while overlays stay legible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[42%] bg-gradient-to-b from-ink via-ink/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[24%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        {/* headline */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 top-[11%] z-20 flex flex-col items-center px-6 text-center"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-glow" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-glow">{h.kicker}</span>
            <span className="h-px w-10 bg-glow" />
          </div>
          <h1 className="font-display text-[12vw] font-medium leading-[0.9] tracking-[-0.02em] text-mist md:text-[7vw]">
            {h.h1.a} <span className="italic text-glow">{h.h1.em}</span> {h.h1.b}
          </h1>
          <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-fog md:text-base">
            {h.paragraph}
          </p>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-fog">{tx.clickToBuild}</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
            <span className="mt-1.5 h-1.5 w-1.5 animate-bounce rounded-full bg-glow" />
          </span>
        </div>

        {/* outro + data strip */}
        <div ref={outroRef} style={{ opacity: 0 }} className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto mb-6 max-w-md px-6 text-center">
            <p className="font-display text-lg italic text-mist md:text-xl">{tx.doneLine}</p>
          </div>
          <div className="border-y border-line/70 bg-graphite/60 backdrop-blur-sm">
            <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-line/70 md:grid-cols-4">
              {h.strip.map(([k, v]) => (
                <div key={k} className="px-6 py-4 md:px-8">
                  <div className="font-mono text-[9px] tracking-[0.3em] text-fog">{k}</div>
                  <div className="mt-1 font-sans text-sm text-mist">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* corner ticks */}
        {[
          "left-5 top-5 border-l border-t",
          "right-5 top-5 border-r border-t",
          "left-5 bottom-5 border-l border-b",
          "right-5 bottom-5 border-r border-b",
        ].map((c, i) => (
          <div key={i} className={`pointer-events-none absolute h-5 w-5 border-glow/40 ${c}`} />
        ))}
      </div>
    </section>
  );
}
