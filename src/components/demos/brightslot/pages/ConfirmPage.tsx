"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useBrightSlot } from "../store";

export function BrightConfirmPage() {
  const { state, setState } = useBrightSlot();
  const booking = state.pendingBooking;
  function finalize() {
    if (!booking) return;
    setState((current) => ({ ...current, bookings: [booking, ...current.bookings], pendingBooking: null, lastBookingId: booking.id }));
  }
  return (
    <RequireAuth session={state.session} basePath={BASE} mode="member">
      <div className="mx-auto max-w-2xl space-y-5">
        <header><p className="text-xs font-bold tracking-[0.18em] text-[#1B3A5C]">STEP 2 OF 2</p><h1 className="mt-1 font-display text-3xl font-bold text-[#12283F]">ยืนยันการจองคาบ</h1><p className="mt-1 text-sm text-slate-600">ตรวจสอบรายละเอียดก่อนส่งคำขอให้สถาบันอนุมัติ</p></header>
        {booking ? <section className="overflow-hidden rounded-2xl border border-[#D8E2EC] bg-white"><div className="bg-[#1B3A5C] p-6 text-white"><p className="text-xs text-sky-100">รหัสคำขอ</p><p className="font-display text-xl font-bold">{booking.id}</p></div><dl className="grid gap-4 p-6 text-sm sm:grid-cols-2"><div><dt className="text-slate-400">ผู้เรียน</dt><dd className="mt-1 font-semibold">{booking.student}</dd></div><div><dt className="text-slate-400">วิชา</dt><dd className="mt-1 font-semibold">{booking.subject}</dd></div><div><dt className="text-slate-400">ติวเตอร์</dt><dd className="mt-1 font-semibold">{booking.tutor}</dd></div><div><dt className="text-slate-400">เวลา</dt><dd className="mt-1 font-semibold">{booking.slot}</dd></div></dl><div className="flex gap-3 border-t border-[#D8E2EC] bg-[#F7F9FC] p-5"><Link href={`${BASE}/book`} className="rounded-full border border-[#1B3A5C]/25 px-4 py-2.5 text-sm font-semibold text-[#1B3A5C]">แก้ไข</Link><button type="button" onClick={finalize} className="rounded-full bg-[#1B3A5C] px-5 py-2.5 text-sm font-semibold text-white">ยืนยันและส่งคำขอ</button></div></section> : state.lastBookingId ? <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h2 className="font-display text-xl font-bold text-emerald-900">ส่งคำขอเรียบร้อย</h2><p className="mt-1 text-sm text-emerald-800">คำขอ {state.lastBookingId} รอการอนุมัติจากสถาบัน</p><Link href={`${BASE}/account`} className="mt-4 inline-block rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">ดูคาบของฉัน</Link></section> : <section className="rounded-2xl border border-dashed border-[#D8E2EC] bg-white p-8 text-center"><p className="text-sm text-slate-600">ยังไม่มีรายการรอยืนยัน</p><Link href={`${BASE}/book`} className="mt-3 inline-block font-semibold text-[#1B3A5C]">เริ่มจองคาบ →</Link></section>}
      </div>
    </RequireAuth>
  );
}
