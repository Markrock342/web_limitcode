"use client";

import Link from "next/link";
import { BASE, useQuickDrop } from "../store";

export function QuickHomePage() {
  const { state } = useQuickDrop();
  const active = state.orders.filter((o) => o.status === "picking" || o.status === "delivering").length;
  const done = state.orders.filter((o) => o.status === "done").length;
  const online = state.couriers.filter((c) => c.online).length;
  const pending = state.orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
        ม็อกอัพหลายหน้า — เลื่อนสถานะออเดอร์ มอบหมายไรเดอร์ ดูโซนคิว และสรุป KPI ข้อมูลเก็บในเบราว์เซอร์
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-800">ยินดีต้อนรับสู่ QuickDrop Logistics</h1>
        <p className="mt-1 text-slate-600">คอนโซลจัดส่ง · ออเดอร์ · ไรเดอร์ · โซน</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { k: "ออเดอร์ทั้งหมด", v: String(state.orders.length) },
          { k: "รอดำเนินการ", v: String(pending) },
          { k: "กำลังส่ง / จัดของ", v: String(active) },
          { k: "ไรเดอร์ออนไลน์", v: String(online) },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-indigo-800">{x.v}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-500">ส่งสำเร็จวันนี้ {done} ออเดอร์</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`${BASE}/orders`}
          className="rounded-2xl bg-indigo-700 p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">เปิดรายการออเดอร์</p>
          <p className="mt-1 text-sm text-white/80">เลื่อนสถานะและมอบหมายไรเดอร์</p>
        </Link>
        <Link
          href={`${BASE}/summary`}
          className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-indigo-800 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">สรุปวัน</p>
          <p className="mt-1 text-sm text-indigo-700/80">ดู KPI ประจำวัน</p>
        </Link>
      </div>
    </div>
  );
}
