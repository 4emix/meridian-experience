"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/sections/Nav";
import Studio from "@/components/sections/Studio";
import Stats from "@/components/sections/Stats";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

// Scroll-scrubbed Higgsfield orbit video (client-only).
const VideoScrubHero = dynamic(
  () => import("@/components/intro/VideoScrubHero"),
  { ssr: false }
);

export default function Page() {
  return (
    <LanguageProvider>
      <SmoothScroll started={true}>
        <Nav visible={true} />

        <main>
          <VideoScrubHero />
          <Studio />
          <Stats />
          <Expertise />
          <Projects />
          <Process />
          <Contact />
        </main>
      </SmoothScroll>
    </LanguageProvider>
  );
}
