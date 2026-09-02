"use client";

import { Container, LineButton, SectionTag } from "@/components/ui";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function ShowcasePageView() {
  const { t } = useLocale();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f7f9fc]">
        <div className="pointer-events-none absolute inset-0 -z-10 sheet-wash mask-[radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <Container className="py-16 sm:py-20">
          <SectionTag>{t.showcase.pageKicker}</SectionTag>
          <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,1.4rem+2.4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
            {t.showcase.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{t.showcase.pageBody}</p>
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
