"use client";

import Link from "next/link";
import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, nestBrand, useNestDesk } from "../store";

export function NestLoginPage() {
  const { state, setState } = useNestDesk();
  return <DemoLoginPage brandName={nestBrand.name} subtitle="จองโต๊ะและห้องประชุม · บัญชีเดโม" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass={nestBrand.accent} />;
}

export function NestAccountPage() {
  const { state } = useNestDesk();
  const mine = state.bookings.filter((booking) => booking.member === state.session.name);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><div><p className="text-xs font-bold tracking-widest text-[#3D4F6F]">NESTDESK ACCOUNT</p><h1 className="font-display text-3xl font-bold text-slate-900">{state.session.name}</h1></div><section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">การจองของคุณ</p><p className="mt-1 text-3xl font-bold text-[#3D4F6F]">{mine.length}</p><div className="mt-4 space-y-2">{mine.slice(0, 5).map((booking) => <div key={booking.id} className="flex justify-between border-t border-slate-100 py-3 text-sm"><span>{booking.spaceName} · {booking.date}</span><span className="font-semibold">{booking.slot}</span></div>)}</div><Link href={`${BASE}/book`} className="mt-5 inline-flex rounded-full bg-[#3D4F6F] px-4 py-2 text-sm font-semibold text-white">จองพื้นที่เพิ่ม</Link></section></div></RequireAuth>;
}

export function NestConfirmPage() {
  const { state } = useNestDesk();
  const booking = state.bookings.find((item) => item.id === state.lastBookedId);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center"><p className="text-sm font-semibold text-emerald-700">จองสำเร็จ</p><h1 className="mt-2 font-display text-3xl font-bold text-slate-900">แล้วพบกันที่ NestDesk</h1><p className="mt-4 text-sm text-slate-600">{booking ? `${booking.spaceName} · ${booking.date} · ${booking.slot}` : "เลือกพื้นที่และส่งการจองของคุณได้จากหน้าจอง"}</p><Link href={`${BASE}/account`} className="mt-6 inline-flex rounded-full bg-[#3D4F6F] px-5 py-2.5 text-sm font-semibold text-white">ดูบัญชีของฉัน</Link></div></RequireAuth>;
}

export function NestStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useNestDesk();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
