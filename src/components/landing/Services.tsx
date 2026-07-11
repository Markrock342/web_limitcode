import { SERVICES } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>ระบบที่เราทำ</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            โฟกัสระบบที่ธุรกิจบริการต้องใช้จริง
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ไม่รับทำทุกอย่าง — เราเชี่ยวชาญ Web App และหลังบ้านที่ช่วยให้ทีมทำงานเป็นระบบ
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-0 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 70}>
              <article className="border-t border-slate-200 py-8">
                <div className="flex items-center gap-3">
                  <Icon name={s.icon} className="size-5 text-brand-600" />
                  <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <p className="mt-4 text-sm text-slate-500">
                  {s.points.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
