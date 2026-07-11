"use client";

import Link from "next/link";
import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useVenueHive, venueBrand } from "../store";

export function VenueLoginPage() {
  const { state, setState } = useVenueHive();
  return <DemoLoginPage brandName={venueBrand.name} subtitle="ค้นหาและขอจองสถานที่จัดงาน" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass={venueBrand.accent} />;
}

export function VenueAccountPage() {
  const { state } = useVenueHive();
  const mine = state.events.filter((event) => event.client === state.session.name);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><div><p className="text-xs font-bold tracking-widest text-[#6B3F3F]">VENUEHIVE ACCOUNT</p><h1 className="font-display text-3xl font-bold text-slate-900">{state.session.name}</h1></div><section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">คำขอจองของคุณ</p><p className="mt-1 text-3xl font-bold text-[#6B3F3F]">{mine.length}</p><div className="mt-4 space-y-2">{mine.slice(0, 5).map((event) => <div key={event.id} className="flex justify-between border-t border-slate-100 py-3 text-sm"><span>{event.venueName} · {event.date}</span><span className="font-semibold">{event.status}</span></div>)}</div><Link href={`${BASE}/book`} className="mt-5 inline-flex rounded-full bg-[#6B3F3F] px-4 py-2 text-sm font-semibold text-white">ขอจองสถานที่</Link></section></div></RequireAuth>;
}

export function VenueConfirmPage() {
  const { state } = useVenueHive();
  const event = state.events.find((item) => item.id === state.lastBookedId);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center"><p className="text-sm font-semibold text-emerald-700">ส่งคำขอแล้ว</p><h1 className="mt-2 font-display text-3xl font-bold text-slate-900">ทีมงานจะติดต่อกลับ</h1><p className="mt-4 text-sm text-slate-600">{event ? `${event.venueName} · ${event.date} · ${event.guests} คน` : "เลือกสถานที่และส่งคำขอของคุณได้จากหน้าจอง"}</p><Link href={`${BASE}/account`} className="mt-6 inline-flex rounded-full bg-[#6B3F3F] px-5 py-2.5 text-sm font-semibold text-white">ดูบัญชีของฉัน</Link></div></RequireAuth>;
}

export function VenueStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useVenueHive();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
