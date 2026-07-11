"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useStayNest } from "../store";

export function StayAccountPage() {
  const { state } = useStayNest();
  const bookings = state.bookings.filter((booking) => booking.guest === state.session.name);
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><div><p className="text-xs font-bold tracking-widest text-amber-700">MY STAYNEST</p><h1 className="font-display text-3xl font-bold text-slate-900">การจองของ {state.session.name}</h1><p className="mt-1 text-sm text-slate-600">ดูสถานะจองและรายละเอียดการเข้าพัก</p></div><div className="space-y-3">{bookings.length ? bookings.map((booking) => <section key={booking.id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex justify-between gap-3"><div><p className="font-semibold">{booking.roomType} · {booking.nights} คืน</p><p className="mt-1 text-sm text-slate-500">{booking.checkIn} → {booking.checkOut}</p></div><span className="h-fit rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">{booking.pay}</span></div><p className="mt-3 text-xs text-slate-400">{booking.id} · ผู้เข้าพัก {booking.guest}</p></section>) : <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">ยังไม่มีการจองในชื่อบัญชีนี้</p>}</div></div></RequireAuth>;
}
