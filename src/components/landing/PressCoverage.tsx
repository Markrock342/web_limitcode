"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon } from "@/components/Icon";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
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
    <section id="news" aria-labelledby="news-heading" className="scroll-mt-28 py-12 sm:py-16">
      <Container>
        <article
          aria-labelledby="press-feature-heading"
          className="relative overflow-hidden rounded-[2rem] bg-[#0b0a24] text-white shadow-[0_50px_120px_-50px_rgba(124,58,237,0.7)]"
        >
          {/* Aura — drifting violet / blue / fuchsia light */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 -top-32 size-[30rem] animate-aurora rounded-full bg-violet-600/45 blur-[110px]" />
            <div className="absolute -right-24 top-1/3 size-[26rem] animate-aurora rounded-full bg-brand-500/40 blur-[110px] [animation-delay:-6s]" />
            <div className="absolute -bottom-40 left-1/4 size-[28rem] animate-aurora rounded-full bg-fuchsia-600/30 blur-[120px] [animation-delay:-12s]" />
          </div>

          <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:p-14">
            <Reveal variant="scale">
              <figure className="relative">
                <div aria-hidden className="aura-ring absolute inset-[-12%] rounded-full opacity-80" />
                <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/20">
                  <Image
                    src={PRESS_FEATURE.image}
                    alt={t.press.imageAlt}
                    width={PRESS_FEATURE.imageWidth}
                    height={PRESS_FEATURE.imageHeight}
                    sizes="(min-width: 1024px) 460px, 100vw"
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="relative mt-3 text-xs leading-relaxed text-white/55">
                  {t.press.imageCredit} {PRESS_FEATURE.publisher}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-sm font-semibold text-violet-300">{t.press.tag}</p>
              <h2 id="news-heading" className="mt-2 text-base font-medium text-white/70">
                {t.press.title}
              </h2>
              <h3
                id="press-feature-heading"
                className="mt-4 text-pretty bg-gradient-to-r from-white via-violet-100 to-sky-200 bg-clip-text font-display text-[clamp(1.7rem,1.2rem+1.8vw,2.5rem)] font-bold leading-snug tracking-tight text-transparent"
              >
                {t.press.featureTitle}
              </h3>
              <p className="mt-5 text-base leading-loose text-white/75 sm:text-lg">{t.press.summary}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="inline-flex items-center rounded-lg bg-white px-3.5 py-2">
                  <Image src={PRESS_FEATURE.logo} alt={PRESS_FEATURE.publisher} width={1204} height={153} sizes="132px" className="h-auto w-[132px]" />
                </span>
                <div className="text-sm leading-relaxed text-white/65">
                  <p className="font-medium text-white/90">{t.press.category}</p>
                  <p>
                    <time dateTime={PRESS_FEATURE.publishedAt}>{publishedDate}</time> · {t.press.byline}{" "}
                    <span lang="th">{PRESS_FEATURE.author}</span>
                  </p>
                </div>
              </div>

              <a
                href={PRESS_FEATURE.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby="press-external-note"
                className="btn-sheen mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-10px_rgba(139,92,246,0.9)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
              >
                <span>{t.press.readMore}</span>
                <Icon name="arrow" className="size-4 shrink-0 -rotate-45" />
              </a>
              <p id="press-external-note" className="mt-3 text-sm leading-relaxed text-white/50">
                {t.press.sourceNote}
              </p>
            </Reveal>
          </div>
        </article>
      </Container>
    </section>
  );
}
