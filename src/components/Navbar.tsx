"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LineButton } from "./ui";
import { BrandWordmark, Logo } from "./Logo";

export function Navbar() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const progressRef = useRef<HTMLDivElement | null>(null);

  const nav = [
    { href: "/#services", sectionId: "services", label: t.nav.services },
    { href: "/#pricing", sectionId: "pricing", label: t.nav.pricing },
    { href: "/#why", sectionId: "why", label: t.nav.why },
    { href: "/#process", sectionId: "process", label: t.nav.process },
    { href: "/#clients", sectionId: "clients", label: t.nav.clients },
    { href: "/showcase", label: t.nav.showcase },
    { href: "/company-profile", label: t.nav.profile },
    { href: "/contact", label: t.nav.contact },
  ];

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

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref(pathname);
      return;
    }

    const sections = nav.filter((item): item is typeof item & { sectionId: string } => Boolean(item.sectionId));
    let raf = 0;
    const updateActiveSection = () => {
      raf = 0;
      const current = sections
        .map((item) => ({ item, top: document.getElementById(item.sectionId)?.getBoundingClientRect().top ?? Infinity }))
        .filter(({ top }) => top <= 96)
        .sort((a, b) => b.top - a.top)[0]?.item;
      setActiveHref(current?.href ?? "");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateActiveSection);
    };

    raf = requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname, t]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const close = () => {
      if (mq.matches) setOpen(false);
    };
    close();
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <>
      <header
        data-analytics-region="navbar"
        className={`fixed inset-x-0 top-0 z-50 overflow-x-clip transition-all ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          ref={progressRef}
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-sky-400"
          style={{ transform: "scaleX(0)" }}
        />
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 overflow-x-clip px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-20 flex min-w-0 items-center gap-2 sm:gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="size-8 sm:size-9" />
          <BrandWordmark className="hidden text-[13px] min-[400px]:inline sm:text-[15px] 2xl:text-base" />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center overflow-hidden xl:flex">
          <div className="flex max-w-full items-center justify-center gap-0.5">
            {nav.map((item) => (
              (() => {
                const active = activeHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    onClick={() => setActiveHref(item.href)}
                    className={`relative whitespace-nowrap px-2 py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-left after:bg-brand-500 after:transition-transform after:duration-300 after:ease-out-quart 2xl:px-3 2xl:text-sm ${
                      active ? "text-brand-700 after:scale-x-100" : "text-slate-600 after:scale-x-0 hover:text-brand-700 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })()
            ))}
          </div>
        </div>

        <div className="relative z-20 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher size="compact" />
          <LineButton iconOnly className="xl:hidden">
            {t.nav.line}
          </LineButton>
          <span className="hidden xl:inline-flex">
            <LineButton className="px-4 py-2 text-sm">{t.nav.line}</LineButton>
          </span>
          <button
            type="button"
            aria-label={t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 xl:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
        </nav>

        {open && (
          <div className="border-t border-slate-200/70 bg-white xl:hidden">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">
              {nav.map((item) => (
                (() => {
                  const active = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "location" : undefined}
                      onClick={() => {
                        setActiveHref(item.href);
                        setOpen(false);
                      }}
                      className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                        active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })()
              ))}
              <LineButton className="mt-2 w-full">{t.nav.line}</LineButton>
            </div>
          </div>
        )}
      </header>
      <div aria-hidden className="h-16 shrink-0" />
    </>
  );
}
