"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LineButton } from "./ui";
import { BrandWordmark, Logo } from "./Logo";

const NAV = [
  { href: "/#services", label: "ระบบที่ทำ" },
  { href: "/#why", label: "ทำไมต้องเรา" },
  { href: "/#process", label: "ขั้นตอน" },
  { href: "/#clients", label: "ลูกค้าของเรา" },
  { href: "/showcase", label: "ตัวอย่างระบบ" },
  { href: "/company-profile", label: "Company Profile" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 8);
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* scroll progress */}
      <div
        ref={progressRef}
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-sky-400"
        style={{ transform: "scaleX(0)" }}
      />
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="size-9" />
          <BrandWordmark className="text-[13px] sm:text-base lg:text-[15px] xl:text-lg" />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 xl:justify-center lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700 xl:px-3.5 xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 lg:block">
          <LineButton className="px-4 py-2 text-sm xl:px-5 xl:py-2.5">ทัก LINE OA</LineButton>
        </div>

        <button
          type="button"
          aria-label="เมนู"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200/70 bg-white lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <LineButton className="mt-2 w-full">ทัก LINE OA</LineButton>
          </div>
        </div>
      )}
    </header>
  );
}
