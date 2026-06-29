import type { Config } from "tailwindcss";
import path from "path";

// Resolve content globs relative to this config file (portable across the local
// preview launcher's cwd and the Vercel build's project-root cwd).
const here = (p: string) => path.join(__dirname, p).replace(/\\/g, "/");

const config: Config = {
  content: [
    here("app/**/*.{ts,tsx}"),
    here("components/**/*.{ts,tsx}"),
    here("lib/**/*.{ts,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        // BRIGHT theme. Token names kept from the original dark build, but
        // remapped to light values so every section re-themes at once.
        ink: "#f5f2ea", // page background — warm paper white
        graphite: "#ffffff", // card / panel surface
        smoke: "#efece2", // secondary surface
        line: "#ddd6c8", // hairline borders
        fog: "#6e747c", // muted text
        mist: "#23262b", // primary text (soft black)
        paper: "#15171b", // rare dark contrast block
        blueprint: "#ff5d2e", // accent (coral)
        glow: "#ff5d2e", // accent (coral) — used widely
        amber: "#0bb39b", // secondary accent (teal)
        // Emphasis text used `text-white` on the old dark theme; remap white
        // to deep ink so highlighted headings stay legible on the bright bg.
        white: "#15171b",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.35em",
        mega: "0.5em",
      },
    },
  },
  plugins: [],
};

export default config;
