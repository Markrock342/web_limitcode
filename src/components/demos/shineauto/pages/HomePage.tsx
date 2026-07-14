"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useShineAuto } from "../store";

export function ShineHomePage() {
  const { state, setState } = useShineAuto();
  const waiting = state.jobs.filter((j) => j.status === "รอคิว").length;
  const working = state.jobs.filter((j) => j.status === "กำลังทำ").length;
  const done = state.jobs.filter((j) => j.status === "เสร็จ").length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#1F3A5F] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image src="/img/cars/porsche.jpg" alt="" fill priority className="object-cover opacity-40" sizes="(max-width:1024px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#142840] via-[#1F3A5F]/90 to-[#1F3A5F]/40" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-100/90 uppercase">ShineAuto Detail · ม็อกอัพ</p>
            <h1 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              จองคิวล้างรถ
              <br />
              เบย์ชัด สถานะงานครบ
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-sky-50/90 sm:text-base">
              เลือกแพ็กเกจ จองเบย์ แล้วติดตามงานจากรอคิว → กำลังทำ → เสร็จ พร้อมระบบสมาชิกสะสมแต้ม
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/book`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3A5F] transition hover:-translate-y-0.5"
              >
                จองคิวเลย
              </Link>
              <Link
                href={`${BASE}/jobs`}
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                ดูงานวันนี้
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "รอคิว", v: String(waiting) },
              { k: "กำลังทำ", v: String(working) },
              { k: "เสร็จ", v: String(done) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-sky-100/80 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#1F3A5F]">แพ็กเกจดีเทล</h2>
            <p className="mt-1 text-sm text-slate-600">กดการ์ดเพื่อเริ่มจองแพ็กเกจนั้น</p>
          </div>
          <Link href={`${BASE}/book`} className="text-sm font-semibold text-[#1F3A5F] hover:underline">
            จองทั้งหมด →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {state.packages.map((p) => (
            <Link
              key={p.id}
              href={`${BASE}/book`}
              onClick={() => setState((st) => ({ ...st, packageId: p.id }))}
              className="group overflow-hidden rounded-2xl border border-[#D5DEEA] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="220px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5">
                <p className="font-display font-bold text-[#142840]">{p.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.blurb}</p>
                <p className="mt-2 text-[11px] font-medium text-[#1F3A5F]">
                  {p.mins} นาที · ฿{p.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-[#D5DEEA] bg-[#E8EEF5] sm:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[180px] sm:min-h-full">
          <Image src="/img/cars/polish.jpg" alt="เบย์ล้างรถ" fill className="object-cover" sizes="400px" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#142840]">บอร์ดเบย์ + สมาชิก</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            ดูตารางเบย์ว่าง เลื่อนสถานะงาน และสะสมแต้มสมาชิกในระบบเดียว
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`${BASE}/bays`} className="rounded-full bg-[#1F3A5F] px-4 py-2 text-xs font-semibold text-white">
              ตารางเบย์
            </Link>
            <Link href={`${BASE}/members`} className="rounded-full border border-[#1F3A5F]/30 px-4 py-2 text-xs font-semibold text-[#1F3A5F]">
              สมาชิกสะสมแต้ม
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
