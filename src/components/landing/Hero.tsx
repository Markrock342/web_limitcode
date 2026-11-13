"use client";

import Image from "next/image";
import Link from "next/link";
import { SYSTEM_DEMOS } from "@/lib/demos";
import { SITE_URL } from "@/lib/seo";
import { LINE_ID } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, LineButton, GhostButton } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { BrandWordmark, Logo } from "@/components/Logo";
import { HeroTerminal } from "@/components/HeroTerminal";
import { Typewriter } from "@/components/Typewriter";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const { t } = useLocale();
  const phrases = [...t.hero.phrases];

  return (
    <section className="relative isolate overflow-hidden" data-analytics-region="hero">
      <div aria-hidden className="hero-backdrop absolute inset-0 -z-20" />
      <div aria-hidden className="hero-dots absolute inset-0 -z-10" />

      <Container className="grid items-center gap-14 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_1.08fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <div className="hero-in flex items-center gap-3" style={delay(0)}>
            <Logo className="size-10 shrink-0" />
            <div className="min-w-0">
              <BrandWordmark className="text-base" />
              <p className="text-sm text-slate-600">{t.hero.eyebrow}</p>
            </div>
          </div>

          <h1
            className="hero-in mt-6 font-display text-[clamp(2.1rem,1.4rem+3.6vw,3.9rem)] font-extrabold leading-[1.12] tracking-tight text-ink"
            style={delay(80)}
          >
            <span className="block">
              {t.hero.lead}{" "}
              <span className="inline-block min-h-[1.12em] max-w-full text-brand-600">
                <Typewriter key={phrases.join("|")} phrases={phrases} />
              </span>
            </span>
            {t.hero.trail ? <span className="block">{t.hero.trail}</span> : null}
          </h1>

          <p className="hero-in mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600" style={delay(160)}>
            {t.hero.body}
          </p>

          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(240)}>
            <LineButton className="btn-sheen-auto w-full sm:w-auto" trackingSource="hero">
              {t.hero.ctaLine}
            </LineButton>
            <GhostButton href="/showcase" className="w-full sm:w-auto">
              {t.hero.ctaGhost}
              <Icon name="arrow" className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
            </GhostButton>
          </div>

          <p className="hero-in mt-4 text-sm text-slate-500" style={delay(280)}>
            {t.hero.lineHint} <span className="font-semibold text-ink">{LINE_ID}</span>
          </p>

          <dl
            className="hero-in mt-10 hidden max-w-xl grid-cols-3 gap-3 border-t border-line pt-6 sm:grid"
            style={delay(340)}
          >
            {t.why.stats.map((stat) => (
              <div key={stat.k} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Icon name="check" className="size-3" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm font-semibold text-ink">{stat.k}</dt>
                  <dd className="text-xs text-slate-500">{stat.v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-in min-w-0" style={delay(200)}>
          <HeroVisual previewLabel={t.showcase.previewAlt} badge={t.showcase.demoBadge} />
        </div>
      </Container>
    </section>
  );
}

const HERO_DEMO = SYSTEM_DEMOS.find((demo) => demo.slug === "erp")!;
const HERO_DEMO_HREF = `/demo/${HERO_DEMO.slug}`;
const SITE_HOST = new URL(SITE_URL).host;

function HeroVisual({ previewLabel, badge }: { previewLabel: string; badge: string }) {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-6 sm:pb-12 lg:max-w-none lg:pl-6">
      {/* Second project peeking out behind — gives depth */}
      <div
        aria-hidden
        className="absolute -right-2 -top-6 hidden w-[58%] rotate-[4deg] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-float sm:block lg:-right-6"
      >
        <div className="relative aspect-[16/11]">
          <Image src="/showcase/nursego.jpg" alt="" fill sizes="340px" className="object-cover object-top" />
        </div>
      </div>

      {/* Main browser window */}
      <Link
        href={HERO_DEMO_HREF}
        data-track-event="work_open"
        data-track-source="hero"
        data-track-item={HERO_DEMO.slug}
        data-track-kind="demo"
        className="group relative block overflow-hidden rounded-2xl border border-line bg-white shadow-float transition-transform duration-500 ease-out-quart hover:-translate-y-1 sm:mr-[10%] sm:mt-10"
      >
        <div className="flex items-center gap-2 border-b border-line bg-slate-50/90 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1 text-[11px] text-slate-500">
            <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-emerald-600" fill="currentColor" aria-hidden>
              <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z" />
            </svg>
            <span className="truncate">{SITE_HOST}{HERO_DEMO_HREF}</span>
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-slate-100">
          <Image
            src={HERO_DEMO.preview!}
            alt={`${previewLabel} ${HERO_DEMO.name}`}
            fill
            sizes="(max-width:1024px) 100vw, 620px"
            className="object-cover object-top transition-transform duration-700 ease-out-quart group-hover:scale-[1.02]"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </Link>

      {/* Project label card */}
      <div className="relative z-10 mt-4 sm:absolute sm:-left-4 sm:top-[46%] sm:mt-0 sm:max-w-[290px] lg:-left-2">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-white/95 p-3.5 shadow-float backdrop-blur">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-600" />
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold text-brand-700">{badge}</span>
            <span className="mt-0.5 block text-pretty text-sm font-semibold leading-snug text-ink">{HERO_DEMO.name}</span>
          </span>
        </div>
      </div>

      {/* Terminal — deploy pipeline */}
      <div className="absolute -bottom-2 right-0 z-10 hidden w-[264px] sm:block lg:right-2">
        <HeroTerminal />
      </div>
    </div>
  );
}
