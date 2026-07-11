"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useTableFlow } from "../store";

export function TableAccountPage() {
  const { state } = useTableFlow();
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><div><p className="text-xs font-bold tracking-widest text-amber-700">MY TABLEFLOW</p><h1 className="font-display text-3xl font-bold text-amber-950">สวัสดี {state.session.name}</h1><p className="mt-1 text-sm text-slate-600">บัญชี {state.session.role} · ดูข้อมูลเดโมและรายการจองล่าสุด</p></div><section className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm font-semibold text-amber-950">การจองของคุณ</p><div className="mt-3 space-y-2">{state.reservations.slice(0, 4).map((reservation) => <div key={reservation.id} className="flex justify-between rounded-xl bg-white px-3 py-3 text-sm"><span>{reservation.name} · {reservation.size} ท่าน</span><span className="font-semibold text-amber-800">{reservation.time} · {reservation.status}</span></div>)}</div></section></div></RequireAuth>;
}
