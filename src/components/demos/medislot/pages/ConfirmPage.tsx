"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, formatMediDate, useMediSlot } from "../store";

export function MediConfirmPage() {
  const { state, setState } = useMediSlot();
  const booking = state.pendingBooking;

  function finalize() {
    if (!booking) return;
    setState((current) => ({
      ...current,
      appointments: [{ ...booking, status: "รอ" }, ...current.appointments],
      patients: current.patients.some((patient) => patient.id === booking.patientId)
        ? current.patients
        : [...current.patients, { id: booking.patientId, name: booking.patient, phone: current.phone || "-", note: "" }],
      lastBookedId: booking.id,
      pendingBooking: null,
      slot: null,
      name: "",
      phone: "",
    }));
  }

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="member">
      <div className="mx-auto max-w-2xl space-y-5">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#0F6B6B]">STEP 2 OF 2</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[#0F3F3F]">ยืนยันการนัดหมาย</h1>
          <p className="mt-1 text-sm text-slate-600">ตรวจสอบรายละเอียดก่อนบันทึกนัดเข้าระบบคลินิก</p>
        </div>
        {booking ? (
          <section className="overflow-hidden rounded-2xl border border-[#D5E8E6] bg-white">
            <div className="bg-[#0F6B6B] px-6 py-4 text-white">
              <p className="text-xs text-teal-100">หมายเลขนัด</p>
              <p className="font-display text-xl font-bold">{booking.id}</p>
            </div>
            <dl className="grid gap-4 p-6 text-sm sm:grid-cols-2">
              <div><dt className="text-slate-400">ผู้รับบริการ</dt><dd className="mt-1 font-semibold text-slate-800">{booking.patient}</dd></div>
              <div><dt className="text-slate-400">บริการ</dt><dd className="mt-1 font-semibold text-slate-800">{booking.service}</dd></div>
              <div><dt className="text-slate-400">วันและเวลา</dt><dd className="mt-1 font-semibold text-slate-800">{formatMediDate(booking.date)} · {booking.time} น.</dd></div>
              <div><dt className="text-slate-400">ผู้ดูแล</dt><dd className="mt-1 font-semibold text-slate-800">{booking.doctor}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-3 border-t border-[#D5E8E6] bg-[#F4FAF9] p-5">
              <Link href={`${BASE}/book`} className="rounded-full border border-[#0F6B6B]/30 px-4 py-2.5 text-sm font-semibold text-[#0F6B6B]">แก้ไข</Link>
              <button type="button" onClick={finalize} className="rounded-full bg-[#0F6B6B] px-5 py-2.5 text-sm font-semibold text-white">ยืนยันและบันทึกนัด</button>
            </div>
          </section>
        ) : state.lastBookedId ? (
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="font-display text-xl font-bold text-emerald-900">บันทึกนัดเรียบร้อย</h2>
            <p className="mt-1 text-sm text-emerald-800">นัดหมาย {state.lastBookedId} อยู่ในบัญชีของคุณแล้ว</p>
            <Link href={`${BASE}/account`} className="mt-4 inline-block rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">ดูนัดของฉัน</Link>
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-[#D5E8E6] bg-white p-8 text-center">
            <p className="text-sm text-slate-600">ยังไม่มีรายการรอยืนยัน</p>
            <Link href={`${BASE}/book`} className="mt-3 inline-block font-semibold text-[#0F6B6B]">เริ่มจองคิว →</Link>
          </section>
        )}
      </div>
    </RequireAuth>
  );
}
