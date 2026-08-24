"use client";

import { useEffect, useState } from "react";

type Phase = "typing" | "hold" | "deleting";

type Props = {
  phrases: string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
};

export function Typewriter({
  phrases,
  className = "",
  typeMs = 54,
  deleteMs = 28,
  holdMs = 1600,
}: Props) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  const phrase = phrases[index] ?? "";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setChars(phrases[0]?.length ?? 0);
        setPhase("hold");
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [phrases]);

  useEffect(() => {
    if (reduced || phrases.length === 0) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (chars < phrase.length) {
        t = setTimeout(() => setChars((n) => n + 1), typeMs);
      } else {
        t = setTimeout(() => setPhase("deleting"), holdMs);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), holdMs);
    } else if (chars > 0) {
      t = setTimeout(() => setChars((n) => n - 1), deleteMs);
    } else {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, deleteMs);
    }
    return () => clearTimeout(t);
  }, [reduced, phrases, phrase, chars, phase, typeMs, deleteMs, holdMs]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{phrase.slice(0, chars)}</span>
      {!reduced && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[0.08em] translate-y-[0.06em] bg-current animate-caret"
        />
      )}
    </span>
  );
}
