import { USE_CASES } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function UseCases() {
  return (
    <section className="scroll-mt-20 border-y border-slate-100 py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionTag>ปัญหาที่เราแก้</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            ถ้าธุรกิจคุณยังทำงานแบบนี้ เราช่วยได้
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ไม่ขายคำว่า “รับทำเว็บ” — เราเริ่มจากสถานการณ์จริงที่ทีมเจอทุกวัน แล้วเปลี่ยนเป็นระบบ
          </p>
        </Reveal>

        <ul className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {USE_CASES.map((u, i) => (
            <Reveal as="li" key={u.title} delay={(i % 3) * 60}>
              <div className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="font-display text-sm font-bold text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <Icon name={u.icon} className="mt-0.5 size-5 shrink-0 text-brand-600" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{u.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                        {u.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
