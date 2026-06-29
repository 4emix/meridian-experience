"use client";

import { useT, type Lang } from "@/lib/i18n";

export default function LangToggle({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const { lang, setLang } = useT();

  const base =
    tone === "dark"
      ? { active: "text-ink bg-mist", idle: "text-fog hover:text-mist" }
      : { active: "text-ink bg-mist", idle: "text-fog hover:text-mist" };

  const Item = ({ code, label }: { code: Lang; label: string }) => {
    const isActive = lang === code;
    return (
      <button
        onClick={() => setLang(code)}
        aria-pressed={isActive}
        className={`rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] transition-colors ${
          isActive ? base.active : base.idle
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-line/70 bg-ink/40 p-0.5 backdrop-blur-sm ${className}`}
    >
      <Item code="tr" label="TR" />
      <Item code="en" label="ENG" />
    </div>
  );
}
