"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, STATUS_LABEL, STATUS_STYLE, useQuickDrop } from "../store";

export function QuickAccountPage() {
  const { state } = useQuickDrop();
  const staff = state.session.role === "staff";
  const orders = staff ? state.orders : state.orders.filter((order) => order.memberUsername === state.session.username);
  return <RequireAuth session={state.session} basePath={BASE} mode="any"><div className="space-y-5">
    <header className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold tracking-[.18em] text-indigo-700">MY QUICKDROP</p><h1 className="mt-1 font-display text-3xl font-bold text-indigo-950">{staff ? "รายการส่งทั้งหมด" : "รายการส่งของฉัน"}</h1></div><Link href={`${BASE}/create`} className="rounded-full bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white">สร้างรายการส่ง</Link></header>
    <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white"><div className="border-b border-indigo-100 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-950">{orders.length} รายการ</div>{orders.length ? <div className="divide-y divide-indigo-50">{orders.map((order) => <article key={order.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-semibold text-slate-800">{order.code} · {order.customer}</p><p className="mt-1 text-sm text-slate-500">{order.address} · โซน {order.zone}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[order.status]}`}>{STATUS_LABEL[order.status]}</span></article>)}</div> : <div className="p-10 text-center text-sm text-slate-500">ยังไม่มีรายการส่งในบัญชีนี้</div>}</section>
  </div></RequireAuth>;
}
