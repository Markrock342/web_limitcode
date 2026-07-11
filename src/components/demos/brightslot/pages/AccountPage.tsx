"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { STATUS_STYLE, BASE, useBrightSlot } from "../store";

export function BrightAccountPage() {
  const { state } = useBrightSlot();
  const isStaff = state.session.role === "staff";
  const bookings = isStaff ? state.bookings : state.bookings.filter((booking) => booking.memberUsername === state.session.username);

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="member">
      <div className="mx-auto max-w-3xl space-y-5">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-bold tracking-[0.18em] text-[#1B3A5C]">MY BRIGHTSLOT</p><h1 className="mt-1 font-display text-3xl font-bold text-[#12283F]">{isStaff ? "รายการจองทั้งหมด" : "คาบเรียนของฉัน"}</h1><p className="mt-1 text-sm text-slate-600">{state.session.name} · {isStaff ? "มุมมองผู้ดูแล" : "คำขอของคุณจะปรากฏที่นี่"}</p></div>
          {!isStaff && <Link href={`${BASE}/book`} className="rounded-full bg-[#1B3A5C] px-4 py-2.5 text-sm font-semibold text-white">จองคาบเพิ่ม</Link>}
        </header>
        <section className="overflow-hidden rounded-2xl border border-[#D8E2EC] bg-white">
          {bookings.length ? <div className="divide-y divide-slate-100">{bookings.map((booking) => <article key={booking.id} className="flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-display font-bold text-[#12283F]">{booking.subject} · {booking.tutor}</p><p className="mt-1 text-sm text-slate-500">{booking.student} · {booking.slot}</p><p className="mt-1 text-xs text-slate-400">{booking.id}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[booking.status]}`}>{booking.status}</span></article>)}</div> : <div className="p-10 text-center"><p className="text-sm font-medium text-slate-700">ยังไม่มีคาบเรียนในบัญชีนี้</p><Link href={`${BASE}/book`} className="mt-3 inline-block text-sm font-semibold text-[#1B3A5C]">เริ่มจองคาบ →</Link></div>}
        </section>
      </div>
    </RequireAuth>
  );
}
