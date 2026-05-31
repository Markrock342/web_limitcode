import { PROCESS } from "@/lib/site";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionTag>ขั้นตอนการทำงาน</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            ทำงานเป็นขั้นตอน เห็นภาพทุกสเต็ป
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ตั้งแต่คุยโจทย์ไปจนถึงส่งมอบและดูแลต่อ คุณรู้ตลอดว่าตอนนี้อยู่ตรงไหน
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand-200 via-violet-200 to-sky-200 lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 80} className="relative">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white font-display text-lg font-bold text-brand-600 shadow-soft">
                  {p.step}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
