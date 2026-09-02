"use client";

import { USE_CASES } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function UseCases() {
  const { t } = useLocale();

  return (
    <section className="scroll-mt-20 border-y border-slate-200/80 bg-[#f7f9fc] py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{t.useCases.tag}</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold tracking-tight text-ink">
            {t.useCases.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.useCases.body}</p>
        </Reveal>

        <ul className="mt-14 overflow-hidden border border-slate-200 bg-white">
          {USE_CASES.map((u, i) => {
            const copy = t.useCases.items[u.id];
            return (
              <Reveal as="li" key={u.id} delay={(i % 3) * 60} className="border-b border-slate-200 last:border-b-0">
                <div className="spec-row grid grid-cols-[3.25rem_1fr] gap-4 px-5 py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-6 sm:px-7 sm:py-7">
                  <span className="font-display text-sm font-bold tabular-nums text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center border border-brand-100 bg-brand-50 text-brand-600">
                        <Icon name={u.icon} className="size-4" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-ink">{copy.title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                          {copy.desc}
                        </p>
                      </div>
                    </div>
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
