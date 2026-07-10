"use client";

import Link from "next/link";
import { BASE, TUTORS, useBrightSlot } from "../store";

export function BrightAdminPage() {
  const { state } = useBrightSlot();
  const pending = state.bookings.filter((b) => b.status === "รออนุมัติ").length;
  const approved = state.bookings.filter((b) => b.status === "อนุมัติแล้ว").length;
  const busy = TUTORS.filter((t) => t.load >= 80).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-sky-800">แอดมินภาพรวม</h1>
        <p className="mt-1 text-sm text-slate-600">สรุปสถานะกวดวิชาและทางลัดหลังบ้าน</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "รออนุมัติ", v: String(pending), href: `${BASE}/schedule` },
          { k: "อนุมัติแล้ว", v: String(approved), href: `${BASE}/schedule` },
          { k: "ติวเตอร์โหลดสูง", v: String(busy), href: `${BASE}/tutors` },
        ].map((x) => (
          <Link
            key={x.k}
            href={x.href}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300"
          >
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-sky-800">{x.v}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`${BASE}/students`} className="rounded-2xl bg-sky-50 p-4 text-sky-800 ring-1 ring-sky-200">
          <p className="font-display font-bold">นักเรียน {state.students.length} คน</p>
          <p className="mt-1 text-sm text-sky-700/80">เปิด CMS รายชื่อ</p>
        </Link>
        <Link href={`${BASE}/book`} className="rounded-2xl bg-sky-700 p-4 text-white">
          <p className="font-display font-bold">จองคาบใหม่</p>
          <p className="mt-1 text-sm text-white/80">ฝั่งผู้ปกครอง</p>
        </Link>
      </div>
    </div>
  );
}
