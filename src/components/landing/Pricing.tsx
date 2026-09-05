"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Container, CropFrame, LineButton, SectionTag } from "@/components/ui";
import type { IconName } from "@/lib/site";

const PLANS = [
  { id: "website", icon: "globe" },
  { id: "booking", icon: "calendar" },
  { id: "crm", icon: "layers" },
] as const satisfies ReadonlyArray<{ id: "website" | "booking" | "crm"; icon: IconName }>;

export function Pricing() {
  const { t } = useLocale();

  return (
    <section
      id="pricing"
      data-analytics-region="pricing"
      data-track-view="pricing_view"
      data-track-source="homepage"
      className="scroll-mt-20 border-y border-slate-200/80 bg-[#f7f9fc] py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Reveal>
            <SectionTag>{t.pricing.tag}</SectionTag>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-bold tracking-tight text-ink">
              {t.pricing.title}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">{t.pricing.body}</p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <CropFrame className="overflow-hidden border border-slate-200 bg-white">
            <div className="grid grid-cols-[4rem_1fr] border-b border-slate-200 bg-[#eef5fd] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-800 sm:grid-cols-[5rem_1fr_0.8fr] sm:px-7">
              <span>{t.pricing.columns.no}</span>
              <span>{t.pricing.columns.scope}</span>
              <span className="hidden sm:block">{t.pricing.columns.budget}</span>
            </div>

            {PLANS.map((plan, index) => {
              const copy = t.pricing.packages[plan.id];
              const featured = plan.id === "booking";

              return (
                <article
                  key={plan.id}
                  className={`grid gap-6 border-b border-slate-200 px-5 py-8 last:border-b-0 sm:px-7 lg:grid-cols-[4.75rem_0.85fr_0.75fr_1.35fr] lg:gap-8 lg:py-10 ${
                    featured ? "bg-brand-50/55" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between lg:block">
                    <span className="font-display text-sm font-bold tabular-nums text-brand-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex size-9 items-center justify-center border border-brand-100 bg-white text-brand-600 lg:mt-5">
                      <Icon name={plan.icon} className="size-4.5" />
                    </span>
                  </div>

                  <div>
                    {featured ? (
                      <span className="inline-flex bg-accent-500 px-2.5 py-1 text-[11px] font-bold text-ink">
                        {t.pricing.recommended}
                      </span>
                    ) : null}
                    <h3 className={`${featured ? "mt-3" : ""} font-display text-xl font-bold text-ink`}>{copy.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                    <p className="mt-4 text-xs font-semibold text-brand-800">{t.pricing.fit}: {copy.fit}</p>
                  </div>

                  <div className="self-start lg:pt-1">
                    <p className="text-xs font-medium text-slate-500">{t.pricing.estimate}</p>
                    <p className="mt-1 font-display text-[clamp(1.65rem,1.25rem+1vw,2.15rem)] font-extrabold tracking-tight text-ink">
                      {copy.range}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{t.pricing.currency}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-ink">{t.pricing.includes}</p>
                    <ul className="mt-3 grid gap-2">
                      {copy.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                          <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </CropFrame>
        </Reveal>

        <Reveal className="mt-6 grid overflow-hidden bg-[#0b1f3a] text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-200">
              {t.pricing.scopeNoteLabel}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{t.pricing.scopeNote}</p>
          </div>
          <div className="border-t border-white/10 bg-white/5 px-6 py-8 sm:px-8 lg:border-t-0 lg:border-l lg:py-10">
            <p className="font-display text-lg font-bold">{t.pricing.prepareTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              {t.pricing.prepare.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1.5 bg-accent-500" />
                  {item}
                </li>
              ))}
            </ul>
            <LineButton className="mt-6 w-full sm:w-auto">{t.pricing.cta}</LineButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
