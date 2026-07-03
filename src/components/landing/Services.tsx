import { SERVICES } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { SpotlightCard } from "@/components/SpotlightCard";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>บริการของเรา</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            ครบทุกระบบที่ธุรกิจต้องใช้
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            เลือกได้ตั้งแต่เว็บไซต์หน้าเดียว ไปจนถึงระบบหลังบ้านเฉพาะทาง เราช่วยดูแลให้ตั้งแต่ต้นจนจบ
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <SpotlightCard
                as="article"
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
              >
                <div
                  className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-soft transition-transform duration-300 ease-out-quart group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <Icon name={s.icon} className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
