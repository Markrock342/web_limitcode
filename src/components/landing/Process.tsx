"use client";

import { PROCESS } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { t } = useLocale();

  return (
    <section id="process" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>{t.process.tag}</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.process.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.process.body}</p>
        </Reveal>

        <div className="relative mt-14">
          <Reveal
            variant="draw"
            delay={120}
            className="absolute left-0 right-0 top-3 hidden h-px bg-slate-200 lg:block"
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS.map((p, i) => {
              const copy = t.process.items[p.step as keyof typeof t.process.items];
              return (
                <Reveal as="li" key={p.step} delay={i * 90} className="relative">
                  <p className="font-display text-sm font-bold text-brand-600">{p.step}</p>
                  <h3 className="mt-3 font-display text-base font-bold text-ink">{copy.title}</h3>
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
