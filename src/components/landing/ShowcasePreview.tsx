import Link from "next/link";
import { DEMOS } from "@/lib/demos";
import { Container, SectionTag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { DemoCard } from "@/components/DemoCard";

export function ShowcasePreview() {
  return (
    <section id="showcase" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionTag>ผลงานตัวอย่าง</SectionTag>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              เรามีหลายแนวให้เลือกดู
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              เลือกแนวเว็บที่ใกล้เคียงกับธุรกิจของคุณ แล้วกดเข้าไปดูตัวอย่างจริงได้เลย
              ทุกตัวอย่างเปิดดูได้บนเว็บของทีม LIMIT CODE STUDIO
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:bg-brand-50"
            >
              ดูตัวอย่างทั้งหมด
              <Icon name="arrow" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 80}>
              <DemoCard demo={d} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
