"use client";

import { WHY } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag, LineButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function WhyUs() {
  const { t } = useLocale();

  return (
    <section id="why" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 sheet-wash" />
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <Reveal variant="left" className="lg:sticky lg:top-24">
          <SectionTag>{t.why.tag}</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold tracking-tight text-ink">
            {t.why.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.why.body}</p>
          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-3">
            {t.why.stats.map((x) => (
              <div key={x.k} className="bg-white px-4 py-4">
                <dt className="font-display text-sm font-bold text-brand-700">{x.k}</dt>
                <dd className="mt-1 text-xs leading-snug text-slate-500">{x.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 hidden lg:block">
            <LineButton>{t.why.line}</LineButton>
          </div>
        </Reveal>

        <ul className="border border-slate-200 bg-white">
          {WHY.map((w, i) => {
            const copy = t.why.items[w.id];
            return (
              <Reveal as="li" key={w.id} variant="right" delay={i * 50} className="border-b border-slate-200 last:border-b-0">
                <div className="spec-row flex gap-4 px-5 py-6 sm:px-6">
                  <span className="mt-0.5 font-mono text-[11px] font-semibold tabular-nums text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={w.icon} className="mt-0.5 size-5 shrink-0 text-brand-600" />
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
