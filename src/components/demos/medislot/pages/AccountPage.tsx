"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, formatMediDate, STATUS_STYLE, useMediSlot } from "../store";

export function MediAccountPage() {
  const { state } = useMediSlot();
  const isStaff = state.session.role === "staff";
  const appointments = isStaff
    ? state.appointments
    : state.appointments.filter((appointment) => appointment.memberUsername === state.session.username);

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="any">
      <div className="space-y-5">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#0F6B6B]">MY MEDISLOT</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-[#0F3F3F]">
              {isStaff ? "นัดหมายทั้งหมด" : "นัดหมายของฉัน"}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{state.session.name} · {isStaff ? "มุมมองพนักงาน" : "สมาชิก MediSlot"}</p>
          </div>
          {!isStaff && <Link href={`${BASE}/book`} className="rounded-full bg-[#0F6B6B] px-4 py-2.5 text-sm font-semibold text-white">จองคิวใหม่</Link>}
        </header>
        <section className="overflow-hidden rounded-2xl border border-[#D5E8E6] bg-white">
          <div className="border-b border-[#D5E8E6] bg-[#F4FAF9] px-5 py-3 text-sm font-semibold text-[#0F3F3F]">{appointments.length} รายการ</div>
          {appointments.length ? (
            <div className="divide-y divide-[#E6F4F3]">
              {appointments.map((appointment) => (
                <article key={appointment.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-800">{appointment.service}</p>
                    <p className="mt-1 text-sm text-slate-500">{isStaff && `${appointment.patient} · `}{formatMediDate(appointment.date)} · {appointment.time} น. · {appointment.doctor}</p>
                    <p className="mt-1 text-xs text-slate-400">{appointment.id}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[appointment.status]}`}>{appointment.status}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-sm text-slate-500">ยังไม่มีนัดในบัญชีนี้</div>
          )}
        </section>
      </div>
    </RequireAuth>
  );
}
