"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isoDateOffset, money } from "@/components/demos/_shell/seed";
import { BASE, useStayNest } from "../store";

const RATES = { Standard: 1800, Deluxe: 2600, Suite: 3900 };

export function StayBookPage() {
  const { setState } = useStayNest();
  const router = useRouter();
  const [guest, setGuest] = useState("");
  const [roomType, setRoomType] = useState<keyof typeof RATES>("Deluxe");
  const [nights, setNights] = useState(2);
  function book(e: React.FormEvent) {
    e.preventDefault();
    if (!guest.trim()) return;
    const id = `B-${Date.now().toString().slice(-5)}`;
    setState((s) => ({ ...s, bookings: [{ id, guest: guest.trim(), roomType, nights, pay: "มัดจำ", checkIn: isoDateOffset(3), checkOut: isoDateOffset(3 + nights) }, ...s.bookings], toast: `สร้างการจอง ${id} สำเร็จ` }));
    router.push(`${BASE}/confirm?id=${id}`);
  }
  return <div className="mx-auto max-w-3xl space-y-5"><div className="rounded-3xl bg-slate-900 p-7 text-white"><p className="text-xs font-bold tracking-[0.2em] text-amber-300">STAYNEST HOTEL</p><h1 className="mt-2 font-display text-3xl font-bold">เลือกห้องพักสำหรับการเข้าพักครั้งถัดไป</h1><p className="mt-2 text-sm text-slate-300">ยืนยันการจองในไม่กี่ขั้นตอน ข้อมูลจะอยู่ในเดโมนี้</p></div><form onSubmit={book} className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-[1fr_260px]"><div className="space-y-4"><label className="block text-sm font-medium">ชื่อผู้เข้าพัก<input required value={guest} onChange={(e) => setGuest(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-amber-500" placeholder="ชื่อ-นามสกุล" /></label><div><p className="text-sm font-medium">ประเภทห้อง</p><div className="mt-2 grid gap-2 sm:grid-cols-3">{(Object.keys(RATES) as (keyof typeof RATES)[]).map((type) => <button key={type} type="button" onClick={() => setRoomType(type)} className={`rounded-xl border p-3 text-left ${roomType === type ? "border-amber-500 bg-amber-50" : "border-slate-200"}`}><p className="font-semibold">{type}</p><p className="text-xs text-slate-500">{money(RATES[type])}/คืน</p></button>)}</div></div><label className="block text-sm font-medium">จำนวนคืน<select value={nights} onChange={(e) => setNights(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5">{[1,2,3,4,5].map((night) => <option key={night}>{night}</option>)}</select></label></div><aside className="rounded-2xl bg-amber-50 p-5"><p className="text-xs font-bold tracking-wider text-amber-800">BOOKING SUMMARY</p><p className="mt-4 font-display text-xl font-bold text-slate-900">{roomType}</p><p className="text-sm text-slate-600">{nights} คืน · เช็คอิน {isoDateOffset(3)}</p><p className="mt-5 text-2xl font-bold text-amber-800">{money(RATES[roomType] * nights)}</p><button className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">ยืนยันการจอง</button></aside></form></div>;
}
