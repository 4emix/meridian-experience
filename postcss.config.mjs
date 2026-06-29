import { fileURLToPath } from "url";
import path from "path";

// Resolve the Tailwind config relative to THIS file so it works whether the
// dev launcher runs from a parent cwd (local preview) or from the project root
// (Vercel build).
const dir = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    tailwindcss: { config: path.join(dir, "tailwind.config.ts") },
    autoprefixer: {},
  },
};

export default config;
