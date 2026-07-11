"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, STATUS_STYLE, useFreshFold } from "../store";

export function FreshAccountPage() {
  const { state } = useFreshFold();
  const staff = state.session.role === "staff";
  const orders = staff ? state.orders : state.orders.filter((order) => order.memberUsername === state.session.username);
  return <RequireAuth session={state.session} basePath={BASE} mode="any"><div className="space-y-5"><header className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold tracking-[.18em] text-[#2C5F4F]">MY FRESHFOLD</p><h1 className="mt-1 font-display text-3xl font-bold text-[#1A3D34]">{staff ? "งานซักทั้งหมด" : "งานซักของฉัน"}</h1></div><Link href={`${BASE}/pickup`} className="rounded-full bg-[#2C5F4F] px-4 py-2.5 text-sm font-semibold text-white">เรียกรับผ้า</Link></header><section className="overflow-hidden rounded-2xl border border-[#C8DED6] bg-white"><div className="border-b border-[#C8DED6] bg-[#F4FAF7] px-5 py-3 text-sm font-semibold text-[#1A3D34]">{orders.length} รายการ</div>{orders.length ? <div className="divide-y divide-[#E8F2EE]">{orders.map((order) => <article key={order.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-semibold text-slate-800">{order.packageName}</p><p className="mt-1 text-sm text-slate-500">{order.id} · {order.pickupDate} · {order.address}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[order.status]}`}>{order.status}</span></article>)}</div> : <div className="p-10 text-center text-sm text-slate-500">ยังไม่มีงานซักในบัญชีนี้</div>}</section></div></RequireAuth>;
}
