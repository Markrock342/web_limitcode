"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useVenueHive } from "../store";

export function VenueAdminPage() {
  const { state } = useVenueHive();
  const pending = state.events.filter((e) => e.status === "รออนุมัติ").length;
  const approved = state.events.filter((e) => e.status === "อนุมัติแล้ว").length;
  const quoteSum = state.quotes.filter((q) => q.status === "อนุมัติแล้ว").reduce((a, q) => a + q.amount, 0);

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/office-hero.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#4A2A2A]/75" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">แอดมินภาพรวม</h1>
            <p className="mt-1 text-sm text-rose-50/90">KPI ฮอลล์ อีเวนต์ และใบเสนอราคา</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "รออนุมัติ", v: String(pending), href: `${BASE}/events` },
          { k: "อนุมัติแล้ว", v: String(approved), href: `${BASE}/events` },
          { k: "มูลค่าอนุมัติ", v: `฿${(quoteSum / 1000).toFixed(0)}k`, href: `${BASE}/quotes` },
        ].map((x) => (
          <Link
            key={x.k}
            href={x.href}
            className="rounded-2xl border border-[#E8D5D5] bg-white p-4 shadow-sm transition hover:border-[#6B3F3F]/40"
          >
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#6B3F3F]">{x.v}</p>
          </Link>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#E8D5D5] bg-white">
        <div className="grid sm:grid-cols-[160px_1fr]">
          <div className="relative min-h-[140px]">
            <Image src="/img/resto-hero.jpg" alt="" fill className="object-cover" sizes="160px" />
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-[#4A2A2A]">ฮอลล์ทั้งหมด {state.venues.length} ห้อง</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {state.venues.slice(0, 4).map((v) => (
                <li key={v.id}>
                  {v.name} · {v.capacity} ที่ · ฿{v.price.toLocaleString()}
                </li>
              ))}
            </ul>
            <Link href={`${BASE}/venues`} className="mt-3 inline-block text-sm font-semibold text-[#6B3F3F] underline">
              เปิดแกลเลอรีฮอลล์
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`${BASE}/quotes`} className="rounded-2xl bg-[#F6EEEE] p-4 text-[#6B3F3F] ring-1 ring-[#E8D5D5]">
          <p className="font-display font-bold">ใบเสนอราคา {state.quotes.length} ใบ</p>
          <p className="mt-1 text-sm text-[#6B3F3F]/80">อนุมัติ / แก้สถานะ</p>
        </Link>
        <Link href={`${BASE}/book`} className="rounded-2xl bg-[#6B3F3F] p-4 text-white">
          <p className="font-display font-bold">ขอจองใหม่</p>
          <p className="mt-1 text-sm text-white/80">ฝั่งลูกค้า</p>
        </Link>
      </div>
    </div>
  );
}
