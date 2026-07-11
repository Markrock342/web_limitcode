"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { useState } from "react";
import { BASE, useBlueRoute } from "../store";

export function BluePartsPage() {
  const { state, setState } = useBlueRoute();
  const [query, setQuery] = useState("");
  const parts = state.parts.filter((part) => part.name.includes(query) || part.sku.includes(query));
  return <RequireAuth session={state.session} basePath={BASE}><div className="space-y-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold tracking-widest text-[#2E4A8A]">INVENTORY</p><h1 className="font-display text-2xl font-bold text-[#16234A]">คลังอะไหล่</h1><p className="mt-1 text-sm text-[#6B7693]">{state.parts.length} รายการ · กดปรับจำนวนสต็อกได้</p></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ค้นหาชื่อ / SKU" className="rounded-xl border border-[#E3E7F0] px-3 py-2 text-sm outline-none focus:border-[#2E4A8A]" /></div><div className="grid gap-3 md:grid-cols-2">{parts.map((part) => <section key={part.id} className="rounded-2xl border border-[#E3E7F0] bg-white p-4"><div className="flex justify-between gap-3"><div><p className="font-semibold text-[#16234A]">{part.name}</p><p className="mt-1 text-xs text-[#6B7693]">{part.sku} · {part.unit}</p></div><span className={`h-fit rounded-full px-2.5 py-1 text-xs font-bold ${part.stock <= part.reorderAt ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>{part.stock} คงเหลือ</span></div><div className="mt-4 flex gap-2"><button type="button" onClick={() => setState((s) => ({ ...s, parts: s.parts.map((item) => item.id === part.id ? { ...item, stock: Math.max(0, item.stock - 1) } : item) }))} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold">เบิก 1</button><button type="button" onClick={() => setState((s) => ({ ...s, parts: s.parts.map((item) => item.id === part.id ? { ...item, stock: item.stock + 1 } : item) }))} className="rounded-lg bg-[#16234A] px-3 py-1.5 text-xs font-semibold text-white">รับเข้า 1</button></div></section>)}</div></div></RequireAuth>;
}
