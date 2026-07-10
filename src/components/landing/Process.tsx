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
            จากโจทย์ธุรกิจถึงระบบที่ขึ้นใช้งานจริง
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            ทุกโปรเจกต์ผ่านกระบวนการเดียวกัน — Requirement, Scope, พัฒนา, UAT, ส่งมอบ และดูแลต่อ
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* connector line — วาดตัวเองจากซ้ายไปขวาเมื่อเลื่อนมาถึง */}
          <Reveal
            variant="draw"
            delay={150}
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand-200 via-violet-200 to-sky-200 lg:block"
          />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 110} className="group relative">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white font-display text-lg font-bold text-brand-600 shadow-soft transition-all duration-300 ease-out-quart group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-lift">
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
