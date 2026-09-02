"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Phase = "typing" | "output" | "hold" | "deleting";

const TYPE_MS = 58;
const DELETE_MS = 26;
const LINE_MS = 280;
const HOLD_MS = 1500;

export function HeroTerminal({ className = "" }: { className?: string }) {
  const { t, locale } = useLocale();
  const sequences = t.terminal.sequences;
  const [seqIdx, setSeqIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shownOut, setShownOut] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  const seq = sequences[seqIdx] ?? sequences[0];
  const out = [
    { text: seq.ok, tone: "ok" as const },
    { text: seq.info, tone: "info" as const },
  ];

  useEffect(() => {
    setSeqIdx(0);
    setTyped(0);
    setShownOut(0);
    setPhase("typing");
  }, [locale]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setTyped(sequences[0].cmd.length);
        setShownOut(2);
        setPhase("hold");
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [locale, sequences]);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < seq.cmd.length) {
        timer = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("output"), 160);
      }
    } else if (phase === "output") {
      if (shownOut < out.length) {
        timer = setTimeout(() => setShownOut((n) => n + 1), LINE_MS);
      } else {
        timer = setTimeout(() => setPhase("hold"), HOLD_MS);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => {
        setShownOut(0);
        setPhase("deleting");
      }, 420);
    } else if (typed > 0) {
      timer = setTimeout(() => setTyped((n) => n - 1), DELETE_MS);
    } else {
      timer = setTimeout(() => {
        setSeqIdx((i) => (i + 1) % sequences.length);
        setPhase("typing");
      }, DELETE_MS);
    }
    return () => clearTimeout(timer);
  }, [reduced, typed, shownOut, phase, seq.cmd, out.length, sequences.length]);

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
        <span className="ml-auto font-mono text-[10px] text-emerald-400/80">{t.terminal.deploy}</span>
      </div>
      <div className="px-3.5 py-3 font-mono text-[11px] leading-5">
        <p className="whitespace-nowrap">
          <span className="text-emerald-400">➜</span>{" "}
          <span className="text-sky-300">~</span>{" "}
          <span className="text-white/90">{seq.cmd.slice(0, typed)}</span>
          {!reduced && <span className="animate-caret text-brand-300">▍</span>}
        </p>
        {out.map((line, i) => (
          <p
            key={`${locale}-${seqIdx}-${i}`}
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
