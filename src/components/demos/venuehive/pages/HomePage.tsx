"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useVenueHive } from "../store";

export function VenueHomePage() {
  const { state, setState } = useVenueHive();
  const pending = state.events.filter((e) => e.status === "รออนุมัติ").length;
  const approved = state.events.filter((e) => e.status === "อนุมัติแล้ว").length;
  const quotesPending = state.quotes.filter((q) => q.status === "รออนุมัติ").length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#6B3F3F] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image src="/img/resto-hero.jpg" alt="" fill priority className="object-cover opacity-40" sizes="(max-width:1024px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A2A2A] via-[#6B3F3F]/88 to-[#6B3F3F]/35" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-rose-100/90 uppercase">VenueHive · ม็อกอัพ</p>
            <h1 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              จองห้องจัดเลี้ยง
              <br />
              อีเวนต์ชัด ใบเสนอราคาครบ
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-rose-50/90 sm:text-base">
              เลือกฮอลล์ ขอจอง แล้วทีมหลังบ้านอนุมัติอีเวนต์และใบเสนอราคาใน flow เดียว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/venues`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#6B3F3F] transition hover:-translate-y-0.5"
              >
                ดูห้องจัดเลี้ยง
              </Link>
              <Link
                href={`${BASE}/book`}
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                ขอจองเลย
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "รออนุมัติ", v: String(pending) },
              { k: "อนุมัติแล้ว", v: String(approved) },
              { k: "ใบเสนอราคา", v: String(quotesPending) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-rose-100/80 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#6B3F3F]">ฮอลล์แนะนำ</h2>
            <p className="mt-1 text-sm text-slate-600">กดการ์ดเพื่อเริ่มขอจองห้องนั้น</p>
          </div>
          <Link href={`${BASE}/venues`} className="text-sm font-semibold text-[#6B3F3F] hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.venues.slice(0, 3).map((v) => (
            <Link
              key={v.id}
              href={`${BASE}/book`}
              onClick={() => setState((st) => ({ ...st, venueId: v.id }))}
              className="group overflow-hidden rounded-2xl border border-[#E8D5D5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={v.img}
                  alt={v.name}
                  fill
                  sizes="280px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5">
                <p className="font-display font-bold text-[#4A2A2A]">{v.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{v.blurb}</p>
                <p className="mt-2 text-[11px] font-medium text-[#6B3F3F]">
                  {v.capacity} ที่ · ฿{v.price.toLocaleString()}/วัน
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-[#E8D5D5] bg-[#F6EEEE] sm:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[180px] sm:min-h-full">
          <Image src="/img/food-2.jpg" alt="บรรยากาศงาน" fill className="object-cover" sizes="400px" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#4A2A2A]">หลังบ้านอีเวนต์</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            อนุมัติ/ปฏิเสธคำขอจอง จัดการใบเสนอราคา และดู KPI การใช้งานฮอลล์
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`${BASE}/events`} className="rounded-full bg-[#6B3F3F] px-4 py-2 text-xs font-semibold text-white">
              รายการอีเวนต์
            </Link>
            <Link href={`${BASE}/quotes`} className="rounded-full border border-[#6B3F3F]/30 px-4 py-2 text-xs font-semibold text-[#6B3F3F]">
              ใบเสนอราคา
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
