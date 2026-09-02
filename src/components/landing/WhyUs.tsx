"use client";

import { WHY } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag, LineButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function WhyUs() {
  const { t } = useLocale();

  return (
    <section id="why" className="scroll-mt-20 bg-slate-50/70 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <Reveal variant="left" className="lg:sticky lg:top-24">
          <SectionTag>{t.why.tag}</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.why.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.why.body}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {t.why.stats.map((x) => (
              <div key={x.k}>
                <dt className="font-display font-bold text-brand-700">{x.k}</dt>
                <dd className="text-slate-500">{x.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 hidden lg:block">
            <LineButton>{t.why.line}</LineButton>
          </div>
        </Reveal>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {WHY.map((w, i) => {
            const copy = t.why.items[w.id];
            return (
              <Reveal as="li" key={w.id} variant="right" delay={i * 50}>
                <div className="flex gap-4 py-6">
                  <Icon name={w.icon} className="mt-1 size-5 shrink-0 text-brand-600" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{copy.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
