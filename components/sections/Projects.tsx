"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/lib/i18n";

const images = [
  "/projects/p01-goksu.png",
  "/projects/p02-gazi.png",
  "/projects/p03-dormitory.png",
  "/projects/p04-cooperative.png",
];

export default function Projects() {
  const { t: tr } = useT();
  const px = tr.projects;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = track.current!;
      const getScroll = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getScroll() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.kill();
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={root} className="relative h-screen overflow-hidden">
      <div ref={track} className="flex h-full w-max items-center will-change-transform">
        {/* intro panel */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-6 md:px-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.4em] text-glow">{px.idx}</span>
            <span className="font-mono text-[10px] tracking-[0.4em] text-fog">{px.tag}</span>
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-5xl font-medium leading-[0.95] text-mist md:text-7xl">
            {px.headingA} <span className="italic text-white">{px.headingEm}</span>
          </h2>
          <p className="mt-6 max-w-sm font-sans text-fog">{px.lead}</p>
          <div className="mt-10 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-fog">
            {px.scrollHint}
            <span className="inline-block h-px w-16 bg-line" />
          </div>
        </div>

        {px.items.map((p, i) => (
          <article
            key={p.id}
            className="group relative mx-4 flex h-[68vh] w-[78vw] shrink-0 flex-col justify-end overflow-hidden rounded-xl border border-line md:mx-6 md:w-[44vw]"
          >
            <img
              src={images[i % images.length]}
              alt={p.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blueprint/10 to-transparent mix-blend-screen" />
            {/* ghost number */}
            <div className="absolute right-6 top-4 font-display text-[9rem] leading-none text-white/[0.07] md:text-[12rem]">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="relative z-10 p-7 md:p-9">
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-glow">
                <span>{p.id}</span>
                <span className="h-px w-6 bg-glow/50" />
                <span className="text-fog">{p.type.toUpperCase()} · {p.year}</span>
              </div>
              <h3 className="font-display text-3xl font-medium text-white md:text-4xl">
                {p.name}
              </h3>
              <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-mist/80">
                {p.detail}
              </p>
            </div>
          </article>
        ))}

        {/* outro panel */}
        <div className="flex h-full w-[60vw] shrink-0 items-center px-10 md:w-[40vw]">
          <a href="#contact" className="group">
            <div className="font-mono text-[10px] tracking-[0.3em] text-fog">{px.next}</div>
            <div className="mt-3 font-display text-4xl italic text-mist transition-colors group-hover:text-white md:text-6xl">
              {px.buildYours}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
