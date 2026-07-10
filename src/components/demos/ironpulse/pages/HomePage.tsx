"use client";

import Link from "next/link";
import { BASE, useIronPulse } from "../store";

export function IronHomePage() {
  const { state } = useIronPulse();
  const active = state.members.filter((m) => m.status === "active").length;
  const expired = state.members.filter((m) => m.status === "expired").length;
  const checkedIn = state.members.filter((m) => m.checkedIn).length;
  const seatsLeft = state.classes.reduce((n, c) => n + (c.seats - c.booked), 0);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm text-lime-800">
        ม็อกอัพหลายหน้า — ต่ออายุสมาชิก จองคลาส Check-in และแก้แพ็กเกจได้ ข้อมูลเก็บในเบราว์เซอร์
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-lime-800">ยินดีต้อนรับสู่ IronPulse Gym</h1>
        <p className="mt-1 text-slate-600">สมาชิก · คลาส · Check-in · แพ็กเกจ</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { k: "สมาชิกใช้งาน", v: String(active) },
          { k: "หมดอายุ", v: String(expired) },
          { k: "Check-in วันนี้", v: String(checkedIn) },
          { k: "ที่นั่งว่าง", v: String(seatsLeft) },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-lime-800">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`${BASE}/members`}
          className="rounded-2xl bg-zinc-900 p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">จัดการสมาชิก</p>
          <p className="mt-1 text-sm text-white/80">ต่ออายุและดูสถานะแพ็กเกจ</p>
        </Link>
        <Link
          href={`${BASE}/checkin`}
          className="rounded-2xl border border-lime-200 bg-lime-50 p-5 text-lime-800 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">Check-in หน้าร้าน</p>
          <p className="mt-1 text-sm text-lime-700/80">ค้นหาชื่อแล้วกดเช็คอิน</p>
        </Link>
      </div>
    </div>
  );
}
