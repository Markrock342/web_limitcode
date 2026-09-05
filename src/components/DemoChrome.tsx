"use client";

import Link from "next/link";
import { DEMOS, type Demo } from "@/lib/demos";
import { LINE_URL } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { LineGlyph } from "./ui";

export function DemoChrome({
  demo,
  children,
}: {
  demo: Demo;
  children: React.ReactNode;
}) {
  const { t } = useLocale();
  const others = DEMOS.filter((d) => d.slug !== demo.slug && !d.openSource);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-ink text-white">
        <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/showcase" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
            <Icon name="arrow" className="size-4 rotate-180" />
            <span className="hidden sm:inline">{t.demo.back}</span>
            <span className="sm:hidden">{t.demo.backShort}</span>
          </Link>

          <div className="hidden min-w-0 items-center gap-2 text-xs text-white/60 md:flex">
            <Logo className="size-6" />
            <span className="hidden lg:inline">{t.demo.from}</span>
            <span className="font-display font-bold text-white">LIMIT CODE STUDIO</span>
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
              DEMO
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher tone="onDark" size="compact" />
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#06C755] px-3.5 py-1.5 text-xs font-semibold text-white"
            >
              <LineGlyph className="size-4" />
              <span className="hidden sm:inline">{t.demo.want}</span>
              <span className="sm:hidden">{t.demo.lineShort}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1">{children}</div>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-ink">{t.demo.moreTitle}</p>
              <p className="mt-1 text-sm text-slate-600">{t.demo.moreBody}</p>
            </div>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50"
            >
              {t.demo.moreAll}
              <Icon name="arrow" className="size-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((d) => {
              const href = d.liveUrl ?? `/demo/${d.slug}`;
              const linkClass =
                "group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft";
              const content = (
                <>
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${d.swatch} text-white`}
                  >
                    <Icon name={d.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold text-ink">{d.name}</span>
                    <span className="block truncate text-xs text-slate-500">{t.showcase.categories[d.category]}</span>
                  </span>
                </>
              );

              return d.liveUrl ? (
                <a
                  key={d.slug}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {content}
                </a>
              ) : (
                <Link key={d.slug} href={href} className={linkClass}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-slate-700">
              <span className="font-semibold text-ink">{t.demo.interest}</span> {t.demo.interestBody}
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#06C755] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <LineGlyph className="size-4" />
              {t.demo.consult}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
