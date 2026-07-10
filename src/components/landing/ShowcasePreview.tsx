import Link from "next/link";
import { DEMOS, SYSTEM_DEMOS } from "@/lib/demos";
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
            <SectionTag>ตัวอย่างระบบ</SectionTag>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {SYSTEM_DEMOS.length} ระบบม็อกอัพ กดลองใช้ได้จริง
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              ชื่อแบรนด์เป็นม็อกอัพทั้งหมด — มีทั้งฝั่งลูกค้าและหลังบ้าน/CMS ให้คลิกเล่นได้ในเบราว์เซอร์
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
          {SYSTEM_DEMOS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 80}>
              <DemoCard demo={d} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            รวมเดโมเว็บและ Live อื่น ๆ อีก {DEMOS.length - SYSTEM_DEMOS.length} รายการในหน้า{" "}
            <Link href="/showcase" className="font-semibold text-brand-700 hover:underline">
              ตัวอย่างทั้งหมด
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
