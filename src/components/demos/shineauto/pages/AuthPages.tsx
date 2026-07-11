"use client";

import Link from "next/link";
import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, shineBrand, useShineAuto } from "../store";

export function ShineLoginPage() {
  const { state, setState } = useShineAuto();
  return <DemoLoginPage brandName={shineBrand.name} subtitle="จองคิวดูแลรถ · ตรวจสถานะงาน" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass={shineBrand.accent} />;
}

export function ShineAccountPage() {
  const { state } = useShineAuto();
  const mine = state.jobs.filter((job) => job.customer === state.session.name);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><div><p className="text-xs font-bold tracking-widest text-[#1F3A5F]">SHINEAUTO ACCOUNT</p><h1 className="font-display text-3xl font-bold text-slate-900">{state.session.name}</h1></div><section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">คิวบริการของคุณ</p><p className="mt-1 text-3xl font-bold text-[#1F3A5F]">{mine.length}</p><div className="mt-4 space-y-2">{mine.slice(0, 5).map((job) => <div key={job.id} className="flex justify-between border-t border-slate-100 py-3 text-sm"><span>{job.packageName} · {job.date} {job.time}</span><span className="font-semibold">{job.status}</span></div>)}</div><Link href={`${BASE}/book`} className="mt-5 inline-flex rounded-full bg-[#1F3A5F] px-4 py-2 text-sm font-semibold text-white">จองคิวเพิ่ม</Link></section></div></RequireAuth>;
}

export function ShineConfirmPage() {
  const { state } = useShineAuto();
  const job = state.jobs.find((item) => item.id === state.lastBookedId);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center"><p className="text-sm font-semibold text-emerald-700">จองคิวสำเร็จ</p><h1 className="mt-2 font-display text-3xl font-bold text-slate-900">รถของคุณอยู่ในคิวแล้ว</h1><p className="mt-4 text-sm text-slate-600">{job ? `${job.packageName} · ${job.date} ${job.time} · ${job.bayName}` : "เลือกแพ็กเกจและคิวบริการได้จากหน้าจอง"}</p><Link href={`${BASE}/account`} className="mt-6 inline-flex rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-white">ดูบัญชีของฉัน</Link></div></RequireAuth>;
}

export function ShineStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useShineAuto();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
