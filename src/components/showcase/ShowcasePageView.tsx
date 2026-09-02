"use client";

import { Container, LineButton } from "@/components/ui";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function ShowcasePageView() {
  const { t } = useLocale();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Container className="py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-soft">
            <span className="size-1.5 rounded-full bg-brand-500" />
            {t.showcase.pageKicker}
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            {t.showcase.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{t.showcase.pageBody}</p>
          <div className="mt-7">
            <LineButton>{t.showcase.pageCta}</LineButton>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <ShowcaseGrid />
        </Container>
      </section>
    </main>
  );
}
