"use client";

import Image from "next/image";
import Link from "next/link";
import { CLIENT_WORK, DEMOS, SYSTEM_DEMOS, type Demo } from "@/lib/demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, CropFrame, LineButton, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

const LIVE_ORDER = ["sirikanchana", "nursego", "kindgo", "horasard"];
const FEATURED_LIVE = LIVE_ORDER.map((slug) => CLIENT_WORK.find((item) => item.slug === slug)).filter(
  (item): item is Demo => Boolean(item),
);
const FEATURED_DEMOS = ["court-booking", "field-crm", "erp"]
  .map((slug) => SYSTEM_DEMOS.find((item) => item.slug === slug))
  .filter((item): item is Demo => Boolean(item));

export function ShowcasePreview() {
  const { t } = useLocale();
  const featuredCount = FEATURED_LIVE.length + FEATURED_DEMOS.length;

  return (
    <section id="showcase" data-analytics-region="homepage_showcase" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionTag>{t.showcase.tag}</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-bold tracking-tight text-ink">
            {t.showcase.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{t.showcase.body}</p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#07883c]">
              01 · {t.showcase.liveBadge}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">{t.showcase.liveTitle}</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">{t.showcase.liveBody}</p>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/showcase" className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 transition hover:gap-3">
              {t.showcase.seeAll}
              <Icon name="arrow" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {FEATURED_LIVE.map((work, index) => (
            <Reveal key={work.slug} delay={(index % 2) * 70}>
              <LiveWorkCard work={work} label={t.showcase.liveBadge} openLabel={t.showcase.openLive} alt={t.showcase.previewAlt} />
            </Reveal>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden border border-brand-100 bg-brand-50/70 px-5 py-8 sm:px-8 sm:py-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <div className="relative grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                02 · {t.showcase.demoBadge}
              </p>
              <h3 className="mt-2 max-w-lg font-display text-2xl font-bold tracking-tight text-ink">{t.showcase.demoTitle}</h3>
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-2xl leading-relaxed text-slate-600 lg:justify-self-end">{t.showcase.demoBody}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_DEMOS.map((demo, index) => (
            <Reveal key={demo.slug} delay={index * 60}>
              <DemoWorkCard demo={demo} label={t.showcase.demoBadge} openLabel={t.showcase.openDemo} alt={t.showcase.previewAlt} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {localeMore(DEMOS.length - featuredCount, t.showcase.more)}{" "}
            <Link href="/showcase" className="font-semibold text-brand-700 hover:underline">
              {t.showcase.moreLink}
            </Link>
          </p>
          <LineButton className="w-full sm:w-auto">{t.hero.ctaLine}</LineButton>
        </Reveal>
      </Container>
    </section>
  );
}

function LiveWorkCard({ work, label, openLabel, alt }: { work: Demo; label: string; openLabel: string; alt: string }) {
  return (
    <a
      href={work.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-track-event="work_open"
      data-track-source="homepage_showcase"
      data-track-item={work.slug}
      data-track-kind="live"
      className="group block"
    >
      <CropFrame className="border border-slate-200 bg-slate-100">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={work.preview!}
            alt={`${alt} ${work.name}`}
            fill
            sizes="(max-width:640px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.025]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-2 bg-[#087f3a] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
            <span className="size-1.5 rounded-full bg-white" />
            {label}
          </span>
        </div>
      </CropFrame>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h4 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-brand-700">{work.name}</h4>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{work.tagline}</p>
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700">
          {openLabel}
          <Icon name="arrow" className="size-3.5 -rotate-45" />
        </span>
      </div>
    </a>
  );
}

function DemoWorkCard({ demo, label, openLabel, alt }: { demo: Demo; label: string; openLabel: string; alt: string }) {
  return (
    <Link
      href={`/demo/${demo.slug}`}
      data-track-event="work_open"
      data-track-source="homepage_showcase"
      data-track-item={demo.slug}
      data-track-kind="demo"
      className="group block"
    >
      <CropFrame className="border border-slate-200 bg-slate-100">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={demo.preview!}
            alt={`${alt} ${demo.name}`}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.025]"
          />
        </div>
      </CropFrame>
      <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-brand-600">{label}</p>
      <h4 className="mt-1 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">{demo.name}</h4>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{demo.tagline}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        {openLabel}
        <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function localeMore(count: number, moreWord: string) {
  return `+ ${count} ${moreWord}`;
}
