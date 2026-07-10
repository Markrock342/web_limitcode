"use client";

import Link from "next/link";
import { BASE, useTableFlow } from "../store";

export function TableHomePage() {
  const { state } = useTableFlow();
  const waiting = state.reservations.filter((r) => r.status === "รอโต๊ะ").length;
  const kitchenOpen = state.orders.filter((o) => o.col !== "เสร็จแล้ว").length;
  const soldOut = state.menu.filter((m) => m.soldOut).length;
  const revenue = state.orders.filter((o) => o.col === "เสร็จแล้ว").reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        ม็อกอัพหลายหน้า — จองโต๊ะ เลื่อนสถานะครัว แก้เมนู sold-out/ราคา ข้อมูลเก็บในเบราว์เซอร์
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">ยินดีต้อนรับสู่ TableFlow Bistro</h1>
        <p className="mt-1 text-slate-600">หน้าร้านจองโต๊ะ · ครัวเลื่อนออเดอร์ · CMS เมนู</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { k: "รอโต๊ะ", v: String(waiting) },
          { k: "ออเดอร์ครัว", v: String(kitchenOpen) },
          { k: "เมนูหมด", v: String(soldOut) },
          { k: "ยอดเสร็จ", v: `฿${revenue.toLocaleString()}` },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-amber-900">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`${BASE}/reserve`}
          className="rounded-2xl bg-amber-700 p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">จองโต๊ะ</p>
          <p className="mt-1 text-sm text-white/80">เลือกจำนวนท่านและเวลา</p>
        </Link>
        <Link
          href={`${BASE}/kitchen`}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">เปิด Kitchen Board</p>
          <p className="mt-1 text-sm text-amber-800/80">เลื่อนสถานะออเดอร์</p>
        </Link>
      </div>
    </div>
  );
}
