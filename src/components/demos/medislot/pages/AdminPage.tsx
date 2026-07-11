"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useMediSlot } from "../store";

export function MediAdminPage() {
  const { state } = useMediSlot();
  const today = state.appointments.filter((a) => a.date === new Date().toISOString().slice(0, 10));
  const waiting = today.filter((a) => a.status === "รอ").length;
  const noShow = state.appointments.filter((a) => a.status === "ไม่มา").length;
  const activeDocs = state.schedule.filter((d) => d.active);

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="staff">
      <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-teal-800">แอดมินภาพรวม</h1>
        <p className="mt-1 text-sm text-slate-600">สรุปสถานะคลินิกและทางลัดหลังบ้าน</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "นัดวันนี้", v: String(today.length), href: `${BASE}/appointments` },
          { k: "รอเข้ารับบริการ", v: String(waiting), href: `${BASE}/appointments` },
          { k: "ไม่มา (ทั้งหมด)", v: String(noShow), href: `${BASE}/appointments` },
        ].map((x) => (
          <Link
            key={x.k}
            href={x.href}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300"
          >
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-teal-800">{x.v}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-teal-900">หมอที่เปิดรับวันนี้</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          {activeDocs.map((d) => (
            <li key={d.id}>
              {d.doctor} · {d.blocks.join(", ") || "ยังไม่มีบล็อก"}
            </li>
          ))}
          {activeDocs.length === 0 && <li className="text-slate-400">ไม่มีหมอเปิดรับ</li>}
        </ul>
        <Link href={`${BASE}/schedule`} className="mt-3 inline-block text-sm font-semibold text-teal-700 underline">
          แก้ตารางหมอ
        </Link>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`${BASE}/patients`} className="rounded-2xl bg-teal-50 p-4 text-teal-800 ring-1 ring-teal-200">
          <p className="font-display font-bold">ผู้ป่วย {state.patients.length} คน</p>
          <p className="mt-1 text-sm text-teal-700/80">เปิด CMS โน้ต</p>
        </Link>
        <Link href={`${BASE}/book`} className="rounded-2xl bg-teal-700 p-4 text-white">
          <p className="font-display font-bold">จองคิวใหม่</p>
          <p className="mt-1 text-sm text-white/80">ฝั่งผู้ป่วย</p>
        </Link>
      </div>
      </div>
    </RequireAuth>
  );
}
