"use client";

import { SERVICES } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, CropFrame, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{t.services.tag}</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold tracking-tight text-ink">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.services.body}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => {
            const copy = t.services.items[s.id as keyof typeof t.services.items];
            return (
              <Reveal key={s.id} delay={(i % 2) * 70}>
                <CropFrame className="h-full border border-slate-200 bg-white p-6 sm:p-7">
                  <span className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r ${s.accent}`} />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center border border-brand-100 bg-brand-50 text-brand-600">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-ink">{copy.title}</h3>
                    </div>
                    <span className="font-mono text-[11px] font-semibold tabular-nums text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {copy.points.map((p) => (
                      <li
                        key={p}
                        className="border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </CropFrame>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
