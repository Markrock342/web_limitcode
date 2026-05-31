import { LINE_ID } from "@/lib/site";
import { Container, LineButton, GhostButton, LineGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-[28rem] rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-0 -z-10 size-[24rem] rounded-full bg-sky-300/30 blur-3xl" />

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-soft backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
              </span>
              ทีมฟรีแลนซ์สายพัฒนา · คุยง่าย วางระบบเป็น
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              รับทำเว็บไซต์ แอป และ
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient">ระบบหลังบ้าน</span> สำหรับธุรกิจ
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              LIMIT CODE STUDIO ช่วยวางแผน ออกแบบ และพัฒนาระบบดิจิทัลให้ธุรกิจใช้งานได้จริง
              ตั้งแต่เว็บไซต์ทั่วไป เว็บขายของ ระบบจอง ไปจนถึงระบบหลังบ้านเฉพาะทาง
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LineButton>ปรึกษาฟรีผ่าน LINE OA</LineButton>
              <GhostButton href="/#services">
                ดูบริการของเรา
                <Icon name="arrow" className="size-4" />
              </GhostButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#06C755] text-white">
                <LineGlyph className="size-5" />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-slate-500">ติดต่อหลักผ่าน LINE OA</p>
                <p className="font-display text-lg font-bold tracking-tight text-ink">{LINE_ID}</p>
              </div>
            </div>
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
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* main browser card */}
      <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
          <span className="size-3 rounded-full bg-rose-400" />
          <span className="size-3 rounded-full bg-amber-400" />
          <span className="size-3 rounded-full bg-emerald-400" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-slate-100" />
        </div>
        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-7 w-20 rounded-full bg-gradient-to-r from-brand-500 to-violet-500" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["from-rose-400 to-orange-400", "from-sky-400 to-cyan-400", "from-emerald-400 to-teal-400"].map(
              (g) => (
                <div key={g} className="space-y-2 rounded-xl border border-slate-100 p-3">
                  <div className={`h-10 rounded-lg bg-gradient-to-br ${g}`} />
                  <div className="h-2 w-3/4 rounded-full bg-slate-200" />
                  <div className="h-2 w-1/2 rounded-full bg-slate-100" />
                </div>
              )
            )}
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-2.5 w-20 rounded-full bg-slate-200" />
              <div className="h-2.5 w-10 rounded-full bg-brand-200" />
            </div>
            <div className="flex items-end gap-2">
              {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-brand-500 to-violet-400"
                  style={{ height: `${h * 0.6}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating badges */}
      <div className="absolute -left-4 top-16 hidden animate-float-slow rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lift sm:block">
        <p className="text-xs text-slate-500">ระบบจอง</p>
        <p className="font-display text-sm font-bold text-emerald-600">+ Dashboard</p>
      </div>
      <div className="absolute -right-3 bottom-10 hidden animate-float-slow rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lift [animation-delay:1.5s] sm:block">
        <p className="text-xs text-slate-500">เริ่มจาก</p>
        <p className="font-display text-sm font-bold text-brand-600">MVP ก่อนได้</p>
      </div>
    </div>
  );
}
