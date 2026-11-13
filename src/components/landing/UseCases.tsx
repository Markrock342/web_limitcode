"use client";

import type { CSSProperties } from "react";
import { USE_CASES } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

/** สีประจำแถว — ตัวเลข ไอคอน และเส้นวิ่งใช้ชุดเดียวกัน */
const ACCENTS = [
  { text: "from-violet-600 to-fuchsia-500", chip: "from-violet-500 to-fuchsia-500", fix: "text-violet-700", flow: "#8b5cf6", wash: "hover:bg-violet-50/70" },
  { text: "from-brand-600 to-sky-500", chip: "from-brand-500 to-sky-500", fix: "text-brand-700", flow: "#1479ef", wash: "hover:bg-sky-50/70" },
  { text: "from-emerald-600 to-teal-500", chip: "from-emerald-500 to-teal-500", fix: "text-emerald-700", flow: "#10b981", wash: "hover:bg-emerald-50/70" },
  { text: "from-orange-600 to-amber-500", chip: "from-orange-500 to-amber-500", fix: "text-orange-700", flow: "#f97316", wash: "hover:bg-orange-50/70" },
  { text: "from-fuchsia-600 to-pink-500", chip: "from-fuchsia-500 to-pink-500", fix: "text-fuchsia-700", flow: "#d946ef", wash: "hover:bg-fuchsia-50/70" },
];

export function UseCases() {
  const { t } = useLocale();

  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 size-[30rem] animate-aurora rounded-full bg-violet-300/30 blur-[110px]" />
        <div className="absolute -right-40 bottom-0 size-[30rem] animate-aurora rounded-full bg-sky-300/30 blur-[110px] [animation-delay:-9s]" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionHeading tag={t.useCases.tag} title={t.useCases.title} body={t.useCases.body} />
        </Reveal>

        <div className="mt-10 hidden grid-cols-[4.5rem_1fr_7rem_1fr] gap-6 border-b border-slate-200 pb-3 text-xs font-semibold text-slate-500 lg:grid">
          <span />
          <span>{t.useCases.before}</span>
          <span />
          <span>{t.useCases.after}</span>
        </div>

        <ul className="mt-6 lg:mt-0">
          {USE_CASES.map((u, i) => {
            const copy = t.useCases.items[u.id];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <Reveal as="li" key={u.id} delay={i * 70} variant={i % 2 === 0 ? "left" : "right"}>
                <div
                  className={`group grid items-center gap-4 border-b border-slate-200 px-2 py-7 transition-colors duration-300 lg:grid-cols-[4.5rem_1fr_7rem_1fr] lg:gap-6 lg:py-8 ${accent.wash}`}
                >
                  <span className={`bg-gradient-to-br ${accent.text} bg-clip-text font-display text-4xl font-extrabold leading-none text-transparent lg:text-5xl`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 lg:hidden">{t.useCases.before}</p>
                    <h3 className="font-display text-xl font-bold text-ink">{copy.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{copy.pain}</p>
                  </div>

                  <div aria-hidden className="hidden items-center gap-1 lg:flex">
                    <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <span className="flow-line absolute inset-0" style={{ "--flow": accent.flow } as CSSProperties} />
                    </span>
                    <Icon name="arrow" className={`size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${accent.fix}`} />
                  </div>

                  <div className="flex items-start gap-3">
                    <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent.chip} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon name={u.icon} className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 lg:hidden">{t.useCases.after}</p>
                      <p className={`text-lg font-semibold leading-snug ${accent.fix}`}>{copy.fix}</p>
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
