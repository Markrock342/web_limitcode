"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BASE, useStayNest } from "../store";

export function StayConfirmPage() {
  const { state } = useStayNest();
  const id = useSearchParams().get("id");
  const booking = state.bookings.find((item) => item.id === id) ?? state.bookings[0];
  return <div className="mx-auto max-w-xl py-8 text-center"><div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div><p className="mt-5 text-xs font-bold tracking-[0.2em] text-emerald-700">BOOKING CONFIRMED</p><h1 className="mt-2 font-display text-3xl font-bold text-slate-900">จองห้องพักสำเร็จ</h1>{booking && <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-left"><p className="font-semibold">{booking.guest}</p><p className="mt-1 text-sm text-slate-600">{booking.id} · {booking.roomType} · {booking.nights} คืน</p><p className="mt-2 text-sm text-slate-600">{booking.checkIn} → {booking.checkOut} · {booking.pay}</p></div>}<div className="mt-5 flex justify-center gap-3"><Link href={`${BASE}/book`} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">จองเพิ่ม</Link><Link href={BASE} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">กลับหน้าแรก</Link></div></div>;
}
