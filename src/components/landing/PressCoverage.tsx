"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon } from "@/components/Icon";
import { Container, CropFrame, SectionTag } from "@/components/ui";
import { PRESS_FEATURE } from "@/lib/press";

const DATE_LOCALES = {
  th: "th-TH-u-ca-gregory",
  en: "en-GB",
  zh: "zh-CN",
};

export function PressCoverage() {
  const { t, locale } = useLocale();
  const publishedDate = new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date(PRESS_FEATURE.publishedAt));

  return (
    <section id="news" aria-labelledby="news-heading" className="scroll-mt-28 pb-16 sm:pb-20">
      <Container>
        <SectionTag>{t.press.tag}</SectionTag>
        <div className="mt-5 max-w-3xl">
          <h2 id="news-heading" className="font-display text-[clamp(1.6rem,1.15rem+1.8vw,2.3rem)] font-bold tracking-tight text-ink">
            {t.press.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">{t.press.body}</p>
        </div>

        <CropFrame className="mt-8 border border-slate-200 bg-white">
          <article aria-labelledby="press-feature-heading" className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="min-w-0 border-b border-slate-200 bg-slate-50 md:border-r md:border-b-0">
              <figure>
                <Image
                  src={PRESS_FEATURE.image}
                  alt={t.press.imageAlt}
                  width={PRESS_FEATURE.imageWidth}
                  height={PRESS_FEATURE.imageHeight}
                  sizes="(min-width: 1152px) 455px, (min-width: 768px) 42vw, 100vw"
                  loading="lazy"
                  className="block h-auto w-full"
                />
                <figcaption className="border-b border-slate-200 px-6 py-3 text-xs leading-relaxed text-slate-500 sm:px-8">
                  {t.press.imageCredit} {PRESS_FEATURE.publisher}
                </figcaption>
              </figure>
              <div className="space-y-5 p-6 sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">{t.press.publisherLabel}</p>
                  <Image
                    src={PRESS_FEATURE.logo}
                    alt={PRESS_FEATURE.publisher}
                    width={1204}
                    height={153}
                    sizes="176px"
                    className="mt-3 h-auto w-44 max-w-full"
                  />
                </div>
                <div className="space-y-2 text-sm leading-relaxed text-slate-600">
                  <p className="font-medium text-ink">{t.press.category}</p>
                  <time dateTime={PRESS_FEATURE.publishedAt}>{publishedDate}</time>
                  <p>{t.press.byline} <span lang="th">{PRESS_FEATURE.author}</span></p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col items-start justify-center p-6 sm:p-8 lg:p-10">
              <h3 id="press-feature-heading" className="text-pretty text-2xl leading-relaxed font-semibold tracking-tight text-ink sm:text-3xl">
                {t.press.featureTitle}
              </h3>
              <p className="mt-4 text-base leading-loose text-slate-600 sm:text-lg">
                {t.press.summary}
              </p>
              <a
                href={PRESS_FEATURE.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby="press-external-note"
                className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-brand-300 py-2 font-semibold text-brand-700 transition-colors hover:border-brand-700 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                <span>{t.press.readMore}</span>
                <Icon name="arrow" className="size-5 shrink-0 -rotate-45" />
              </a>
              <p id="press-external-note" className="mt-3 text-sm leading-relaxed text-slate-500">
                {t.press.sourceNote}
              </p>
            </div>
          </article>
        </CropFrame>
      </Container>
    </section>
  );
}
