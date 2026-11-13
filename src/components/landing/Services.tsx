"use client";

import { SERVICES } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { ErpServiceTeaser } from "@/components/services/ErpServiceTeaser";

/** สีประจำบริการ — ไอคอน เส้นบน และจุดหน้ารายการใช้ชุดเดียวกัน */
const ACCENTS = [
  { chip: "from-brand-500 to-sky-500", bar: "from-brand-500 to-sky-400", dot: "bg-sky-500" },
  { chip: "from-emerald-500 to-teal-500", bar: "from-emerald-500 to-teal-400", dot: "bg-emerald-500" },
  { chip: "from-violet-500 to-indigo-500", bar: "from-violet-500 to-indigo-400", dot: "bg-violet-500" },
  { chip: "from-fuchsia-500 to-pink-500", bar: "from-fuchsia-500 to-pink-400", dot: "bg-fuchsia-500" },
];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading tag={t.services.tag} title={t.services.title} body={t.services.body} />
        </Reveal>

        <ErpServiceTeaser />

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {SERVICES.map((s, i) => {
            const copy = t.services.items[s.id as keyof typeof t.services.items];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <Reveal key={s.id} delay={i * 80} className="h-full">
                <div className="group relative h-full pt-6">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-slate-200" />
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 h-0.5 w-12 bg-gradient-to-r ${accent.bar} transition-all duration-500 ease-out group-hover:w-full`}
                  />
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.chip} text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1`}
                  >
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.desc}</p>
                  <ul className="mt-5 grid gap-2">
                    {copy.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${accent.dot}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
