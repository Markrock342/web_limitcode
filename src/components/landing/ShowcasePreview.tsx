"use client";

import Image from "next/image";
import Link from "next/link";
import { CLIENT_WORK, DEMOS, SYSTEM_DEMOS, type Demo } from "@/lib/demos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Card, Container, LineButton, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CASE_STUDY_SLUGS, caseStudyLabels, caseStudyPath } from "@/lib/case-studies";

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
    <section id="showcase" data-analytics-region="homepage_showcase" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading tag={t.showcase.tag} title={t.showcase.title} body={t.showcase.body} className="max-w-3xl" />
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <span className="size-2 rounded-full bg-emerald-500" />
              {t.showcase.liveBadge}
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

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {FEATURED_LIVE.map((work, index) => (
            <Reveal key={work.slug} delay={(index % 2) * 70} className="h-full">
              <LiveWorkCard work={work} label={t.showcase.liveBadge} openLabel={t.showcase.openLive} builtLabel={t.showcase.built} alt={t.showcase.previewAlt} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <p className="text-sm font-semibold text-brand-700">{t.showcase.demoBadge}</p>
            <h3 className="mt-2 max-w-lg font-display text-2xl font-bold tracking-tight text-ink">{t.showcase.demoTitle}</h3>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-2xl leading-relaxed text-slate-600 lg:justify-self-end">{t.showcase.demoBody}</p>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_DEMOS.map((demo, index) => (
            <Reveal key={demo.slug} delay={index * 60} className="h-full">
              <DemoWorkCard demo={demo} label={t.showcase.demoBadge} openLabel={t.showcase.openDemo} alt={t.showcase.previewAlt} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {localeMore(DEMOS.length - featuredCount, t.showcase.more)}{" "}
            <Link href="/showcase" className="font-semibold text-brand-700 hover:underline">
              {t.showcase.moreLink}
            </Link>
          </p>
          <LineButton className="w-full sm:w-auto" trackingSource="homepage_showcase">{t.hero.ctaLine}</LineButton>
        </Reveal>
      </Container>
    </section>
  );
}

function LiveWorkCard({
  work,
  label,
  openLabel,
  builtLabel,
  alt,
}: {
  work: Demo;
  label: string;
  openLabel: string;
  builtLabel: string;
  alt: string;
}) {
  const { locale } = useLocale();
  const hasStudy = CASE_STUDY_SLUGS.some(slug => slug === work.slug);
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <a
        href={work.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-track-event="work_open"
        data-track-source="homepage_showcase"
        data-track-item={work.slug}
        data-track-kind="live"
        className="group block flex-1"
      >
        <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-slate-100">
          <Image
            src={work.preview!}
            alt={`${alt} ${work.name}`}
            fill
            sizes="(max-width:640px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.025]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-card">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {label}
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-brand-700">{work.name}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{work.tagline}</p>
            </div>
            <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700">
              {openLabel}
              <Icon name="arrow" className="size-3.5 -rotate-45" />
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold text-slate-500">{builtLabel}</span>
            {work.features.map((feature) => (
              <span key={feature} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {feature}
              </span>
            ))}
          </div>
          {work.result ? (
            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold leading-relaxed text-emerald-900">{work.result}</p>
          ) : null}
          {work.quote ? (
            <figure className="mt-4 rounded-lg border border-line bg-slate-50 px-4 py-3">
              <blockquote className="text-sm leading-relaxed text-slate-700">“{work.quote.text}”</blockquote>
              <figcaption className="mt-2 text-xs font-semibold text-slate-600">
                {work.quote.by} · <span className="font-normal">{work.quote.role}</span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </a>
      {hasStudy ? (
        <Link
          href={caseStudyPath(work.slug)}
          className="flex min-h-12 items-center justify-between border-t border-line px-5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 sm:px-6"
        >
          {caseStudyLabels[locale].read}
          <Icon name="arrow" className="size-4" />
        </Link>
      ) : null}
    </Card>
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
      className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card hover:border-brand-200"
    >
      <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-slate-100">
        <Image
          src={demo.preview!}
          alt={`${alt} ${demo.name}`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out-quart group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-brand-600">{label}</p>
        <h4 className="mt-1 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">{demo.name}</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{demo.tagline}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-700">
          {openLabel}
          <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function localeMore(count: number, moreWord: string) {
  return `+ ${count} ${moreWord}`;
}
