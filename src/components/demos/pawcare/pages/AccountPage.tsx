"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, STATUS_STYLE, usePawCare } from "../store";

export function PawAccountPage() {
  const { state } = usePawCare();
  const staff = state.session.role === "staff";
  const appointments = staff ? state.appointments : state.appointments.filter((appointment) => appointment.owner === state.session.name);
  return <RequireAuth session={state.session} basePath={BASE} mode="any"><div className="space-y-5"><header className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold tracking-[.18em] text-[#5B4B8A]">MY PAWCARE</p><h1 className="mt-1 font-display text-3xl font-bold text-[#3D3260]">{staff ? "นัดหมายทั้งหมด" : "นัดของสัตว์เลี้ยงฉัน"}</h1></div><Link href={`${BASE}/book`} className="rounded-full bg-[#5B4B8A] px-4 py-2.5 text-sm font-semibold text-white">จองคิวใหม่</Link></header><section className="overflow-hidden rounded-2xl border border-[#E4DDF0] bg-white"><div className="border-b border-[#E4DDF0] bg-[#F7F4FC] px-5 py-3 text-sm font-semibold text-[#3D3260]">{appointments.length} รายการ</div>{appointments.length ? <div className="divide-y divide-[#F0ECF7]">{appointments.map((appointment) => <article key={appointment.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-semibold text-slate-800">{appointment.pet} · {appointment.service}</p><p className="mt-1 text-sm text-slate-500">{appointment.date} · {appointment.time} · {appointment.vet}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[appointment.status]}`}>{appointment.status}</span></article>)}</div> : <div className="p-10 text-center text-sm text-slate-500">ยังไม่มีนัดในบัญชีนี้</div>}</section></div></RequireAuth>;
}
