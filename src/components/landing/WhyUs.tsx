import { WHY } from "@/lib/site";
import { Container, SectionTag, LineButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function WhyUs() {
  return (
    <section id="why" className="scroll-mt-20 bg-slate-50/70 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <Reveal variant="left" className="lg:sticky lg:top-24">
          <SectionTag>ทำไมต้องเรา</SectionTag>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            ทีมเล็กที่รับงานได้ครบ เว็บไซต์ ระบบ และของที่ใช้อยู่ทุกวัน
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            คุยตรง ล็อก scope ได้ และส่งของที่ใช้จริง — ทั้งหน้าเว็บที่ลูกค้าเห็น
            และหลังบ้านที่ทีมใช้ ดูแลต่อได้หลังขึ้นโปรดักชัน
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { k: "Scope ชัด", v: "ก่อนลงมือ" },
              { k: "Demo รายสัปดาห์", v: "เห็นความคืบหน้า" },
              { k: "ดูแลต่อ", v: "หลังส่งมอบ" },
            ].map((x) => (
              <div key={x.k}>
                <dt className="font-display font-bold text-brand-700">{x.k}</dt>
                <dd className="text-slate-500">{x.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 hidden lg:block">
            <LineButton>ปรึกษาฟรีผ่าน LINE OA</LineButton>
          </div>
        </Reveal>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {WHY.map((w, i) => (
            <Reveal as="li" key={w.title} variant="right" delay={i * 50}>
              <div className="flex gap-4 py-6">
                <Icon name={w.icon} className="mt-1 size-5 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
