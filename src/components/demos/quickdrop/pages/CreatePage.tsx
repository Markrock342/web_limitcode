"use client";

import Link from "next/link";
import { demoId } from "@/components/demos/_shell/seed";
import { BASE, STATUS_LABEL, ZONES, useQuickDrop } from "../store";

export function QuickCreatePage() {
  const { state, setState } = useQuickDrop();
  function createOrder() {
    if (!state.createName.trim() || !state.createPhone.trim() || !state.createAddress.trim()) return;
    setState((s) => {
      const id = demoId("O", 1042 + s.orders.length, 4);
      return { ...s, orders: [{ id, code: `QD-${1042 + s.orders.length}`, customer: s.createName.trim(), phone: s.createPhone.trim(), address: s.createAddress.trim(), zone: s.createZone, status: "pending", courierId: null, memberUsername: s.session.loggedIn ? s.session.username : undefined }, ...s.orders], lastCreatedId: id, createName: "", createPhone: "", createAddress: "" };
    });
  }
  return <div className="mx-auto max-w-3xl space-y-6"><header><p className="text-xs font-bold tracking-[.18em] text-indigo-600">CREATE DELIVERY</p><h1 className="mt-1 font-display text-3xl font-bold text-indigo-950">สร้างรายการจัดส่ง</h1><p className="mt-2 text-sm text-slate-600">กรอกจุดรับส่งและข้อมูลผู้รับ ทีม QuickDrop จะเริ่มจัดคิวให้ทันที</p></header>
    <section className="grid gap-5 rounded-3xl border border-indigo-100 bg-white p-5 sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">ชื่อผู้รับ<input value={state.createName} onChange={(e) => setState((s) => ({ ...s, createName: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-indigo-500" placeholder="ชื่อ-นามสกุล" /></label><label className="text-sm font-semibold text-slate-700">เบอร์โทร<input value={state.createPhone} onChange={(e) => setState((s) => ({ ...s, createPhone: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-indigo-500" placeholder="08x-xxx-xxxx" /></label></div><label className="text-sm font-semibold text-slate-700">ที่อยู่จัดส่ง<textarea value={state.createAddress} onChange={(e) => setState((s) => ({ ...s, createAddress: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-indigo-500" rows={3} placeholder="บ้านเลขที่ อาคาร ชั้น หรือจุดนัดรับ" /></label><label className="text-sm font-semibold text-slate-700">โซนจัดส่ง<select value={state.createZone} onChange={(e) => setState((s) => ({ ...s, createZone: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-indigo-500">{ZONES.map((zone) => <option key={zone.id}>{zone.name}</option>)}</select></label><button type="button" onClick={createOrder} disabled={!state.createName.trim() || !state.createPhone.trim() || !state.createAddress.trim()} className="rounded-full bg-indigo-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40">สร้างรายการจัดส่ง</button></section>
    {state.lastCreatedId && <section className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-900">สร้างรายการ {state.lastCreatedId} แล้ว · สถานะเริ่มต้น: {STATUS_LABEL.pending} {state.session.loggedIn ? <Link href={`${BASE}/account`} className="ml-2 font-semibold underline">ดูรายการของฉัน</Link> : <Link href={`${BASE}/login`} className="ml-2 font-semibold underline">เข้าสู่ระบบเพื่อติดตาม</Link>}</section>}
  </div>;
}
