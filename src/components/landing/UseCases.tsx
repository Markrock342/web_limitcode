"use client";

import { USE_CASES } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function UseCases() {
  const { t } = useLocale();

  return (
    <section className="scroll-mt-20 border-y border-slate-100 py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{t.useCases.tag}</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.useCases.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.useCases.body}</p>
        </Reveal>

        <ul className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {USE_CASES.map((u, i) => {
            const copy = t.useCases.items[u.id];
            return (
              <Reveal as="li" key={u.id} delay={(i % 3) * 60}>
                <div className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="font-display text-sm font-bold text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <Icon name={u.icon} className="mt-0.5 size-5 shrink-0 text-brand-600" />
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
