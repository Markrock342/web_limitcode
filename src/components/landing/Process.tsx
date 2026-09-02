"use client";

import { PROCESS } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { t } = useLocale();

  return (
    <section id="process" className="scroll-mt-20 border-y border-slate-200/80 bg-[#f7f9fc] py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{t.process.tag}</SectionTag>
          <h2 className="mt-5 font-display text-[clamp(1.75rem,1.2rem+2vw,2.35rem)] font-bold tracking-tight text-ink">
            {t.process.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t.process.body}</p>
        </Reveal>

        <div className="relative mt-14">
          <Reveal
            variant="draw"
            delay={120}
            className="absolute left-4 right-4 top-[15px] hidden h-px bg-slate-300 lg:block"
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS.map((p, i) => {
              const copy = t.process.items[p.step as keyof typeof t.process.items];
              return (
                <Reveal as="li" key={p.step} delay={i * 90} className="relative">
                  <span className="relative z-10 mb-4 inline-flex size-8 items-center justify-center border border-brand-200 bg-white font-mono text-[11px] font-bold tabular-nums text-brand-700">
                    {p.step}
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">{copy.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
