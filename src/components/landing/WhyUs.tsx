import { WHY } from "@/lib/site";
import { Container, SectionTag, LineButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function WhyUs() {
  return (
    <section id="why" className="scroll-mt-20 bg-gradient-to-b from-brand-50/60 to-white py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-24">
          <SectionTag>ทำไมต้องเรา</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            ทำไมธุรกิจควรเริ่มกับเรา
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            เราไม่ได้แค่ทำเว็บสวย ๆ แล้วจบ แต่ช่วยคิดตั้งแต่ต้น วางระบบให้ใช้งานได้จริง
            และพร้อมดูแลต่อเนื่องในระยะยาว
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "ทีมเล็ก", v: "คล่องตัว" },
              { k: "คุยง่าย", v: "ทำงานไว" },
              { k: "ดูแลต่อ", v: "หลังส่งมอบ" },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft">
                <p className="font-display text-base font-bold text-brand-600">{x.k}</p>
                <p className="mt-1 text-xs text-slate-500">{x.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 hidden lg:block">
            <LineButton>ปรึกษาฟรีผ่าน LINE OA</LineButton>
          </div>
        </Reveal>

        <div className="space-y-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:border-brand-200 hover:shadow-lift">
                <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={w.icon} className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
