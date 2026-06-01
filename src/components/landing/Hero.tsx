import Image from "next/image";
import Link from "next/link";
import { LINE_ID } from "@/lib/site";
import { Container, LineButton, GhostButton, LineGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

const HERO_SHOTS = [
  { src: "/showcase/dashboard.jpg", alt: "ตัวอย่างระบบหลังบ้าน LCS Business Dashboard", href: "/demo/dashboard", label: "ระบบหลังบ้าน" },
  { src: "/showcase/shop.jpg", alt: "ตัวอย่างเว็บขายของ SweetShop", href: "/demo/shop", label: "เว็บขายของ" },
  { src: "/showcase/restaurant.jpg", alt: "ตัวอย่างเว็บร้านอาหาร BISTRO CAFÉ", href: "/demo/restaurant", label: "เว็บร้านอาหาร" },
];

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
  const [main, ...rest] = HERO_SHOTS;

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* main — real dashboard screenshot */}
      <Link
        href={main.href}
        className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift transition-all hover:-translate-y-1 hover:shadow-[0_32px_64px_-24px_rgba(11,60,130,0.35)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(max-width:1024px) 100vw, 520px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            priority
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent px-4 pb-4 pt-16">
          <p className="text-xs font-medium text-white/70">ผลงานตัวอย่างจริง · กดดูได้</p>
          <p className="font-display text-sm font-bold text-white">{main.label}</p>
        </div>
      </Link>

      {/* secondary real screenshots */}
      {rest.map((shot, i) => (
        <Link
          key={shot.href}
          href={shot.href}
          className={`group absolute hidden overflow-hidden rounded-xl border-2 border-white bg-white shadow-lift transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(11,60,130,0.3)] sm:block ${
            i === 0 ? "-left-5 top-12 w-[42%]" : "-right-4 bottom-8 w-[44%]"
          }`}
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="220px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-2.5 pb-2 pt-8">
            <p className="text-[11px] font-semibold text-white">{shot.label}</p>
          </div>
        </Link>
      ))}

      {/* floating badges */}
      <div className="absolute -left-4 top-4 hidden animate-float-slow rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lift sm:block">
        <p className="text-xs text-slate-500">ระบบจอง</p>
        <p className="font-display text-sm font-bold text-emerald-600">+ Dashboard</p>
      </div>
      <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 animate-float-slow rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lift [animation-delay:1.5s] sm:block">
        <p className="text-xs text-slate-500">เริ่มจาก</p>
        <p className="font-display text-sm font-bold text-brand-600">MVP ก่อนได้</p>
      </div>
    </div>
  );
}
