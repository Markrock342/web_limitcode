"use client";

import { PROCESS } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Card, Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { t } = useLocale();

  return (
    <section id="process" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading tag={t.process.tag} title={t.process.title} body={t.process.body} />
        </Reveal>

        <Reveal className="mt-12">
          <Card className="relative px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <span aria-hidden className="absolute left-14 right-14 top-[3.75rem] hidden h-px bg-line lg:block" />
            <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {PROCESS.map((p) => {
                const copy = t.process.items[p.step as keyof typeof t.process.items];
                return (
                  <li key={p.step}>
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tabular-nums text-white ring-4 ring-white">
                      {Number(p.step)}
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-ink">{copy.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                  </li>
                );
              })}
            </ol>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
