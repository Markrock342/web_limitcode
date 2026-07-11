"use client";

import Link from "next/link";
import { BASE, DATES, fmtDay, useSmashLane } from "../store";

export function SmashHomePage() {
  const { state } = useSmashLane();
  const date = DATES[state.dateIdx];
  const day = state.bookings.filter((b) => b.date === date && b.paid && b.status === "confirmed");
  const queue = day.filter((b) => b.court === null).length;
  const revenue = day.reduce((s, b) => s + b.price, 0);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        ม็อกอัพหลายหน้า — ลองจองจากเมนูลูกค้า แล้วไปจัดคอร์ทที่หลังบ้าน ข้อมูลถูกเก็บในเบราว์เซอร์
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-[#3953A4]">ยินดีต้อนรับสู่ SmashLane Arena</h1>
        <p className="mt-1 text-slate-600">วันนี้ {fmtDay(date)} · ลูกค้าเลือกเวลา สนามจัดเลขคอร์ทให้</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "จองวันนี้", v: String(day.length) },
          { k: "รอจัดคอร์ท", v: String(queue) },
          { k: "รายได้วันนี้", v: `฿${revenue.toLocaleString()}` },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#3953A4]">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`${BASE}/book`} className="rounded-2xl bg-[#3953A4] p-5 text-white shadow-sm transition hover:-translate-y-0.5">
          <p className="font-display text-lg font-bold">เริ่มจองคอร์ท</p>
          <p className="mt-1 text-sm text-white/80">เลือกวัน ชั่วโมง แล้วไปชำระเงิน</p>
        </Link>
        <Link href={`${BASE}/admin`} className="rounded-2xl border border-[#EB8824] bg-orange-50 p-5 text-[#EB8824] shadow-sm transition hover:-translate-y-0.5">
          <p className="font-display text-lg font-bold">เปิดหลังบ้าน</p>
          <p className="mt-1 text-sm text-orange-700/80">จัดคอร์ทให้คิวที่รอ</p>
        </Link>
      </div>
    </div>
  );
}
