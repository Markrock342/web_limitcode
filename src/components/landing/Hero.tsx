import Image from "next/image";
import Link from "next/link";
import { LINE_ID } from "@/lib/site";
import { Container, LineButton, GhostButton, LineGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { HeroTerminal } from "@/components/HeroTerminal";
import { Typewriter } from "@/components/Typewriter";
import { DataFlowFrame } from "@/components/DataFlowFrame";

const HERO_PHRASES = ["ระบบจอง", "CRM / Job Order", "Admin Dashboard", "AI Workflow"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="beam-x top-[144px] [animation-delay:-4s]" />
        <span className="beam-x top-[288px] [animation-delay:1.8s] [animation-duration:11s]" />
        <span className="beam-y left-[336px] [animation-delay:-7s]" />
      </div>
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[28rem] animate-aurora rounded-full bg-brand-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-0 -z-10 size-[24rem] animate-aurora rounded-full bg-sky-300/20 blur-3xl [animation-delay:-9s]" />

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Reveal>
            <p className="text-sm font-medium text-brand-700">
              ฟรีแลนซ์ Software Studio · requirement → build → deploy
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
              พัฒนา{" "}
              <span className="mt-1 block min-h-[1.15em] text-brand-600 sm:mt-0 sm:inline-block sm:min-w-[18ch]">
                <Typewriter phrases={HERO_PHRASES} />
              </span>
              <span className="block">สำหรับธุรกิจบริการ</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              LIMIT CODE STUDIO โฟกัสระบบ ไม่ใช่รับทำเว็บทั่วไป — เปลี่ยนงานบน LINE, Excel
              และเอกสารกระจัดกระจาย ให้เป็น Web App ที่ทีมใช้ได้จริง
            </p>
          </Reveal>

          <Reveal delay={240}>
            <ol className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              {["01 Input", "02 Build", "03 Test", "04 Deploy"].map((step) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500" />
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LineButton className="btn-sheen-auto">ปรึกษาโจทย์ระบบฟรี</LineButton>
              <GhostButton href="/#services">
                ดูระบบที่เราทำ
                <Icon name="arrow" className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
              </GhostButton>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex size-6 items-center justify-center bg-[#06C755] text-white">
                <LineGlyph className="size-3.5" />
              </span>
              คุยโจทย์ระบบผ่าน LINE OA{" "}
              <span className="font-display font-bold text-ink">{LINE_ID}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <DataFlowFrame>
      <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
        <Link href="/demo/field-crm" className="group relative block overflow-hidden bg-slate-100">
          <div className="relative aspect-[16/10]">
            <Image
              src="/showcase/field-crm.jpg"
              alt="ตัวอย่างระบบ CRM / Job Order ทีมหน้างาน"
              fill
              sizes="(max-width:1024px) 100vw, 520px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent px-5 pb-5 pt-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">live system · กดดูได้</p>
            <p className="mt-0.5 font-display text-base font-bold text-white">
              GuardNest Field — CRM / Job Order
            </p>
          </div>
        </Link>

        <Reveal
          variant="scale"
          delay={400}
          className="relative z-30 mt-4 sm:absolute sm:-bottom-6 sm:-left-4 sm:mt-0 sm:w-[252px]"
        >
          <HeroTerminal />
        </Reveal>
      </div>
    </DataFlowFrame>
  );
}
