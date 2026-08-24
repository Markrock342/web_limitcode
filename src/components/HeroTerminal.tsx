"use client";

import { useEffect, useState } from "react";

type Sequence = { cmd: string; out: { text: string; tone: "ok" | "info" }[] };
type Phase = "typing" | "output" | "hold" | "deleting";

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

const TYPE_MS = 58;
const DELETE_MS = 26;
const LINE_MS = 280;
const HOLD_MS = 1500;

export function HeroTerminal({ className = "" }: { className?: string }) {
  const [seqIdx, setSeqIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shownOut, setShownOut] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  const seq = SEQUENCES[seqIdx];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setTyped(SEQUENCES[0].cmd.length);
        setShownOut(SEQUENCES[0].out.length);
        setPhase("hold");
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < seq.cmd.length) {
        t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("output"), 160);
      }
    } else if (phase === "output") {
      if (shownOut < seq.out.length) {
        t = setTimeout(() => setShownOut((n) => n + 1), LINE_MS);
      } else {
        t = setTimeout(() => setPhase("hold"), HOLD_MS);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => {
        setShownOut(0);
        setPhase("deleting");
      }, 420);
    } else if (typed > 0) {
      t = setTimeout(() => setTyped((n) => n - 1), DELETE_MS);
    } else {
      t = setTimeout(() => {
        setSeqIdx((i) => (i + 1) % SEQUENCES.length);
        setPhase("typing");
      }, DELETE_MS);
    }
    return () => clearTimeout(t);
  }, [reduced, typed, shownOut, phase, seq]);

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
        <span className="ml-auto font-mono text-[10px] text-emerald-400/80">deploy live</span>
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
