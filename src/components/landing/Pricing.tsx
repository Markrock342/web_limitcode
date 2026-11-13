"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Container, LineButton } from "@/components/ui";
import type { IconName } from "@/lib/site";

const PLANS = [
  { id: "erp", icon: "dashboard" },
  { id: "website", icon: "globe" },
  { id: "booking", icon: "calendar" },
  { id: "crm", icon: "layers" },
] as const satisfies ReadonlyArray<{ id: "erp" | "website" | "booking" | "crm"; icon: IconName }>;

export function Pricing() {
  const { t } = useLocale();

  return (
    <section
      id="pricing"
      data-analytics-region="pricing"
      data-track-view="pricing_view"
      data-track-source="homepage"
      className="relative scroll-mt-20 overflow-hidden bg-[#0b0a24] py-16 text-white sm:py-24"
    >
      {/* Aura — violet and brand-blue light behind the price sheet */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 size-[34rem] animate-aurora rounded-full bg-violet-600/40 blur-[120px]" />
        <div className="absolute -right-32 top-1/4 size-[30rem] animate-aurora rounded-full bg-brand-500/35 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute -bottom-40 left-1/3 size-[32rem] animate-aurora rounded-full bg-fuchsia-600/25 blur-[130px] [animation-delay:-12s]" />
      </div>

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-violet-300">{t.pricing.tag}</p>
          <h2 className="mt-3 text-balance font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-bold leading-tight tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-white/70">{t.pricing.body}</p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] shadow-[0_40px_120px_-40px_rgba(124,58,237,0.65)] backdrop-blur-xl">
            <div className="hidden grid-cols-[1.15fr_1.35fr_0.9fr] gap-8 border-b border-white/10 px-8 py-4 text-xs font-semibold text-white/50 lg:grid">
              <span>{t.pricing.columns.scope}</span>
              <span>{t.pricing.includes}</span>
              <span className="text-right">{t.pricing.estimate}</span>
            </div>

            {PLANS.map((plan) => {
              const copy = t.pricing.packages[plan.id];
              const featured = plan.id === "booking";

              return (
                <article
                  key={plan.id}
                  className={`relative grid gap-6 border-b border-white/10 px-6 py-7 sm:px-8 lg:grid-cols-[1.15fr_1.35fr_0.9fr] lg:gap-8 ${
                    featured ? "bg-gradient-to-r from-violet-500/20 via-violet-500/10 to-transparent" : ""
                  }`}
                >
                  {featured ? <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-400 to-sky-400" /> : null}

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-brand-500 text-white shadow-[0_8px_24px_-6px_rgba(139,92,246,0.8)]">
                        <Icon name={plan.icon} className="size-5" />
                      </span>
                      <h3 className="font-display text-xl font-bold">{copy.title}</h3>
                      {featured ? (
                        <span className="rounded-full bg-violet-400/20 px-2.5 py-1 text-[11px] font-semibold text-violet-200 ring-1 ring-violet-300/40">
                          {t.pricing.recommended}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{copy.desc}</p>
                    <p className="mt-3 text-xs leading-relaxed text-white/50">
                      <span className="font-semibold text-white/75">{t.pricing.fit}:</span> {copy.fit}
                    </p>
                  </div>

                  <ul className="grid content-start gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {copy.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-violet-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="lg:text-right">
                    <p className="text-xs font-medium text-white/50 lg:hidden">{t.pricing.estimate}</p>
                    <p className="mt-1 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200 bg-clip-text whitespace-nowrap font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-transparent lg:mt-0 lg:text-[1.45rem] xl:text-[1.6rem]">
                      {copy.range}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{t.pricing.currency}</p>
                  </div>
                </article>
              );
            })}

            <div className="grid gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div>
                <p className="text-sm font-semibold">{t.pricing.scopeNoteLabel}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{t.pricing.scopeNote}</p>
              </div>
              <div>
                <p className="font-display text-base font-bold">{t.pricing.prepareTitle}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.pricing.prepare.map((item) => (
                    <li key={item} className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/85">
                      {item}
                    </li>
                  ))}
                </ul>
                <LineButton className="mt-5 w-full sm:w-auto" trackingSource="pricing">{t.pricing.cta}</LineButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
