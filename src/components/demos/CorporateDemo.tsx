"use client";

import Image from "next/image";
import { Target, Palette, Code2, Handshake, Phone, Mail, MapPin } from "lucide-react";

const SERVICES = [
  { Icon: Target, t: "วางกลยุทธ์", d: "วางแผนธุรกิจและทิศทางดิจิทัลให้ชัดเจนก่อนเริ่มลงมือ" },
  { Icon: Palette, t: "ออกแบบ", d: "ออกแบบประสบการณ์และภาพลักษณ์ให้ตรงกับแบรนด์ของคุณ" },
  { Icon: Code2, t: "พัฒนา", d: "พัฒนาเว็บและระบบด้วยเทคโนโลยีที่มั่นคงและขยายต่อได้" },
  { Icon: Handshake, t: "ให้คำปรึกษา", d: "ดูแลและให้คำแนะนำอย่างต่อเนื่องหลังส่งมอบงาน" },
];

const STATS = [
  { v: "15+", l: "ปีประสบการณ์" },
  { v: "320+", l: "โปรเจกต์สำเร็จ" },
  { v: "98%", l: "ลูกค้าพึงพอใจ" },
  { v: "40+", l: "องค์กรพันธมิตร" },
];

const WORKS = [
  { t: "ระบบ ERP องค์กร", c: "Enterprise", img: "/img/work-3.jpg" },
  { t: "แพลตฟอร์มทีมงาน", c: "Workspace", img: "/img/work-2.jpg" },
  { t: "เว็บไซต์สำนักงาน", c: "Corporate", img: "/img/work-1.jpg" },
];

export function CorporateDemo() {
  return (
    <div className="bg-[#0a1326] font-sans text-slate-300">
      {/* nav */}
      <header className="sticky top-12 z-30 border-b border-white/10 bg-[#0a1326]/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="font-display text-xl font-bold tracking-[0.2em] text-white">COMP<span className="text-amber-400">ANY</span></span>
          <nav className="hidden gap-7 text-sm font-medium text-slate-300 md:flex">
            <span className="cursor-pointer hover:text-amber-400">หน้าแรก</span>
            <span className="cursor-pointer hover:text-amber-400">เกี่ยวกับเรา</span>
            <span className="cursor-pointer hover:text-amber-400">บริการ</span>
            <span className="cursor-pointer hover:text-amber-400">ผลงาน</span>
            <span className="cursor-pointer hover:text-amber-400">ติดต่อ</span>
          </nav>
          <button className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2 text-sm font-bold text-stone-900 hover:from-amber-300">ขอใบเสนอราคา</button>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
        <div className="pointer-events-none absolute -right-20 top-0 size-[30rem] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold tracking-widest text-amber-300">BUSINESS SOLUTIONS</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              ร่วมพัฒนาอนาคต<br /><span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">ไปด้วยกัน</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-slate-400">เราช่วยองค์กรวางระบบ ออกแบบ และพัฒนาโซลูชันดิจิทัลที่ขับเคลื่อนธุรกิจของคุณให้เติบโตอย่างมั่นคง</p>
            <div className="mt-7 flex gap-3">
              <button className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3 font-bold text-stone-900 hover:from-amber-300">ปรึกษากับเรา</button>
              <button className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/5">ดูบริการ</button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl">
            <div className="relative h-72 overflow-hidden rounded-2xl">
              <Image src="/img/office-hero.jpg" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1326]/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section id="about" className="border-b border-white/10 py-14">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-4xl font-extrabold text-amber-400">{s.v}</p>
              <p className="mt-1 text-sm text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* services */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-amber-400">OUR SERVICES</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white">บริการของเรา</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all hover:-translate-y-1 hover:border-amber-400/40">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-400/10 text-amber-400"><Icon className="size-7" /></div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* works */}
      <section id="works" className="border-y border-white/10 bg-white/[0.02] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-400">PORTFOLIO</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">ผลงานของเรา</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WORKS.map((w) => (
              <article key={w.t} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={w.img} alt={w.t} fill sizes="(max-width:768px) 100vw, 360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold tracking-widest text-amber-400">{w.c}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{w.t}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-400">CONTACT</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">ติดต่อเรา</h2>
            <p className="mt-3 max-w-md text-slate-400">กรอกข้อมูลเพื่อให้ทีมที่ปรึกษาติดต่อกลับ พร้อมประเมินโซลูชันที่เหมาะกับองค์กรของคุณ</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li className="flex items-center gap-3"><Phone className="size-5 text-amber-400" /> 02-123-4567</li>
              <li className="flex items-center gap-3"><Mail className="size-5 text-amber-400" /> contact@company.co.th</li>
              <li className="flex items-center gap-3"><MapPin className="size-5 text-amber-400" /> 175 อาคารสำนักงาน ชั้น 20 ถนนสาทร กรุงเทพฯ 10120</li>
            </ul>
          </div>
          <form className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="ชื่อ-นามสกุล" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400" />
            <input placeholder="อีเมล" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400" />
            <textarea rows={4} placeholder="ข้อความ" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-amber-400" />
            <button className="w-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 py-3 font-bold text-stone-900 hover:from-amber-300">ส่งข้อความ</button>
          </form>
        </div>
      </section>
    </div>
  );
}
