"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, usePawCare } from "../store";

export function PawConfirmPage() {
  const { state, setState } = usePawCare();
  const booking = state.pendingBooking;
  function finalize() {
    if (!booking) return;
    setState((s) => ({ ...s, appointments: [{ ...booking, status: "รอตรวจ" }, ...s.appointments], patients: s.patients.some((p) => p.pet === booking.pet && p.owner === booking.owner) ? s.patients : [...s.patients, { id: `PET-${s.patients.length + 1}`, pet: booking.pet, species: booking.species, breed: "-", owner: booking.owner, phone: booking.phone, note: "", img: "/img/spa-1.jpg" }], lastBookedId: booking.id, pendingBooking: null, slot: null, owner: "", pet: "", phone: "" }));
  }
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><header><p className="text-xs font-bold tracking-[.18em] text-[#5B4B8A]">STEP 2 OF 2</p><h1 className="mt-2 font-display text-3xl font-bold text-[#3D3260]">ยืนยันการนัดหมาย</h1></header>{booking ? <section className="overflow-hidden rounded-2xl border border-[#E4DDF0] bg-white"><div className="bg-[#5B4B8A] px-6 py-4 text-white"><p className="text-xs text-violet-100">หมายเลขนัด</p><p className="font-display text-xl font-bold">{booking.id}</p></div><dl className="grid gap-4 p-6 text-sm sm:grid-cols-2"><div><dt className="text-slate-400">สัตว์เลี้ยง</dt><dd className="mt-1 font-semibold">{booking.pet} · {booking.owner}</dd></div><div><dt className="text-slate-400">บริการ</dt><dd className="mt-1 font-semibold">{booking.service}</dd></div><div><dt className="text-slate-400">วันและเวลา</dt><dd className="mt-1 font-semibold">{booking.date} · {booking.time}</dd></div><div><dt className="text-slate-400">สัตวแพทย์</dt><dd className="mt-1 font-semibold">{booking.vet}</dd></div></dl><div className="flex gap-3 border-t border-[#E4DDF0] bg-[#F7F4FC] p-5"><Link href={`${BASE}/book`} className="rounded-full border border-[#5B4B8A]/30 px-4 py-2.5 text-sm font-semibold text-[#5B4B8A]">แก้ไข</Link><button type="button" onClick={finalize} className="rounded-full bg-[#5B4B8A] px-5 py-2.5 text-sm font-semibold text-white">ยืนยันนัด</button></div></section> : state.lastBookedId ? <section className="rounded-2xl bg-emerald-50 p-6 text-emerald-900"><h2 className="font-display text-xl font-bold">บันทึกนัดเรียบร้อย</h2><Link href={`${BASE}/account`} className="mt-3 inline-block font-semibold underline">ดูนัดของฉัน</Link></section> : <section className="rounded-2xl border border-dashed border-[#E4DDF0] p-8 text-center text-sm text-slate-500"><Link href={`${BASE}/book`} className="font-semibold text-[#5B4B8A]">เริ่มจองคิว →</Link></section>}</div></RequireAuth>;
}
