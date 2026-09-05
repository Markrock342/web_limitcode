"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LOCALE_META, LOCALE_ORDER, type Locale } from "@/lib/i18n/config";

type Tone = "ink" | "onDark";
type Size = "full" | "compact";

export function LanguageSwitcher({
  tone = "ink",
  size = "full",
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const meta = LOCALE_META[locale];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  const ink = tone === "ink";
  const pill = size === "full" ? meta.pill : meta.code;

  return (
    <div ref={rootRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t.lang.aria}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-9 items-center whitespace-nowrap rounded-full text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${
          size === "compact" ? "gap-1.5 px-2.5" : "gap-2 px-3"
        } ${
          ink
            ? "bg-black focus-visible:ring-offset-white"
            : "bg-black ring-1 ring-white/35 focus-visible:ring-offset-ink"
        }`}
      >
        <GlobeMark className="size-[18px] shrink-0" />
        <span
          className={`font-display text-[11px] font-bold leading-none tracking-[0.14em] ${
            locale === "en" || size === "compact" ? "uppercase" : ""
          }`}
        >
          {pill}
        </span>
        <ChevronDown className={`size-3 shrink-0 opacity-90 transition-transform duration-200 ease-out-quart ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <ul
          id={menuId}
          role="listbox"
          aria-label={t.lang.aria}
          className="absolute right-0 z-50 mt-2 min-w-[11.5rem] overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-lift"
        >
          {LOCALE_ORDER.map((id) => {
            const item = LOCALE_META[id];
            const active = id === locale;
            return (
              <li key={id} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(id)}
                  className={`flex w-full items-center justify-between gap-4 px-3.5 py-2.5 text-left transition-colors ${
                    active ? "bg-brand-50 text-ink" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-display text-[13px] font-semibold">{item.pill}</span>
                  <span className="font-display text-[10px] font-bold tracking-[0.16em] text-slate-400">
                    {item.code}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function GlobeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.2 7.2c2.2 1.4 5.4 2.2 6.8 2.2s4.6-.8 6.8-2.2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.2 16.8c2.2-1.4 5.4-2.2 6.8-2.2s4.6.8 6.8 2.2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path d="M2.2 4.4 6 8.2l3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
