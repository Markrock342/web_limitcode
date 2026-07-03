"use client";

import { useEffect, useState } from "react";

type Sequence = { cmd: string; out: { text: string; tone: "ok" | "info" }[] };

const SEQUENCES: Sequence[] = [
  {
    cmd: "npm run build",
    out: [
      { text: "✓ build สำเร็จใน 12s · 0 error", tone: "ok" },
      { text: "▲ พร้อมขึ้น production", tone: "info" },
    ],
  },
  {
    cmd: "git push origin main",
    out: [
      { text: "✓ ทดสอบผ่าน 48/48", tone: "ok" },
      { text: "● deploy อัตโนมัติสำเร็จ", tone: "info" },
    ],
  },
  {
    cmd: "npx prisma migrate deploy",
    out: [
      { text: "✓ ฐานข้อมูลพร้อมใช้งาน", tone: "ok" },
      { text: "● ระบบหลังบ้านออนไลน์", tone: "info" },
    ],
  },
];

const TYPE_MS = 62;
const LINE_MS = 340;
const HOLD_MS = 2600;

export function HeroTerminal({ className = "" }: { className?: string }) {
  const [seqIdx, setSeqIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shownOut, setShownOut] = useState(0);
  const [reduced, setReduced] = useState(false);

  const seq = SEQUENCES[seqIdx];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setTyped(SEQUENCES[0].cmd.length);
      setShownOut(SEQUENCES[0].out.length);
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (typed < seq.cmd.length) {
      t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    } else if (shownOut < seq.out.length) {
      t = setTimeout(() => setShownOut((n) => n + 1), LINE_MS);
    } else {
      t = setTimeout(() => {
        setTyped(0);
        setShownOut(0);
        setSeqIdx((i) => (i + 1) % SEQUENCES.length);
      }, HOLD_MS);
    }
    return () => clearTimeout(t);
  }, [reduced, typed, shownOut, seq]);

  return (
    <div
      aria-hidden
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b1226]/95 shadow-lift backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3.5 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] tracking-wide text-white/40">limitcode — zsh</span>
      </div>
      <div className="px-3.5 py-3 font-mono text-[11px] leading-5">
        <p className="whitespace-nowrap">
          <span className="text-emerald-400">➜</span>{" "}
          <span className="text-sky-300">~</span>{" "}
          <span className="text-white/90">{seq.cmd.slice(0, typed)}</span>
          {!reduced && <span className="animate-caret text-brand-300">▍</span>}
        </p>
        {seq.out.map((line, i) => (
          <p
            key={`${seqIdx}-${i}`}
            className={`h-5 whitespace-nowrap transition-opacity duration-300 ${
              i < shownOut ? "opacity-100" : "opacity-0"
            } ${line.tone === "ok" ? "text-emerald-300/90" : "text-brand-200/90"}`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
