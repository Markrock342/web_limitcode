"use client";

import { WHY } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Card, Container, LineButton, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function WhyUs() {
  const { t } = useLocale();

  return (
    <section id="why" data-analytics-region="why_us" className="scroll-mt-20 py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <SectionHeading tag={t.why.tag} title={t.why.title} body={t.why.body} />
          <div className="mt-8 hidden lg:block">
            <LineButton trackingSource="why_us">{t.why.line}</LineButton>
          </div>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
          {WHY.map((w, i) => {
            const copy = t.why.items[w.id];
            return (
              <Reveal as="li" key={w.id} delay={(i % 2) * 60}>
                <Card interactive className="h-full p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon name={w.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{copy.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
