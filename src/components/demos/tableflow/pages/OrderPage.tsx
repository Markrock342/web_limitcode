"use client";

import { useMemo, useState } from "react";
import { money } from "@/components/demos/_shell/seed";
import { useTableFlow } from "../store";

export function TableOrderPage() {
  const { state, setState } = useTableFlow();
  const [selected, setSelected] = useState<string[]>([]);
  const [table, setTable] = useState("T1");
  const [done, setDone] = useState("");
  const available = state.menu.filter((item) => !item.soldOut);
  const total = useMemo(() => selected.reduce((sum, id) => sum + (state.menu.find((item) => item.id === id)?.price ?? 0), 0), [selected, state.menu]);

  function submit() {
    if (!selected.length) return;
    const items = selected.map((id) => state.menu.find((item) => item.id === id)?.name).filter(Boolean).join(" · ");
    const id = `O-${Date.now().toString().slice(-5)}`;
    setState((s) => ({ ...s, orders: [{ id, table, items, total, col: "ใหม่" }, ...s.orders] }));
    setDone(`ส่งออเดอร์ ${id} เข้าครัวแล้ว`);
    setSelected([]);
  }

  return <div className="mx-auto max-w-3xl space-y-5">
    <div><p className="text-xs font-bold tracking-widest text-amber-700">TABLEFLOW ORDER</p><h1 className="font-display text-3xl font-bold text-amber-950">สั่งอาหารที่โต๊ะ</h1><p className="mt-1 text-sm text-slate-600">เลือกเมนู แล้วส่งออเดอร์เข้าครัวทันที</p></div>
    <div className="grid gap-5 md:grid-cols-[1fr_280px]">
      <div className="grid gap-3 sm:grid-cols-2">{available.map((item) => { const active = selected.includes(item.id); return <button key={item.id} type="button" onClick={() => setSelected((items) => active ? items.filter((id) => id !== item.id) : [...items, item.id])} className={`rounded-2xl border p-4 text-left transition ${active ? "border-amber-600 bg-amber-50 ring-2 ring-amber-200" : "border-slate-200 bg-white hover:border-amber-300"}`}><p className="font-semibold text-slate-900">{item.name}</p><p className="mt-2 text-sm font-bold text-amber-800">{money(item.price)}</p></button>; })}</div>
      <aside className="h-fit rounded-2xl bg-amber-900 p-5 text-amber-50"><p className="text-xs font-bold tracking-wider text-amber-200">YOUR ORDER</p><label className="mt-4 block text-sm">โต๊ะ<input value={table} onChange={(e) => setTable(e.target.value)} className="mt-1 w-full rounded-lg border border-amber-600 bg-amber-950 px-3 py-2 text-white outline-none" /></label><div className="my-4 space-y-2 text-sm">{selected.length ? selected.map((id) => <p key={id}>{state.menu.find((item) => item.id === id)?.name}</p>) : <p className="text-amber-200">ยังไม่ได้เลือกเมนู</p>}</div><div className="border-t border-amber-700 pt-3 font-display text-xl font-bold">รวม {money(total)}</div><button type="button" disabled={!selected.length} onClick={submit} className="mt-4 w-full rounded-xl bg-amber-300 py-3 text-sm font-bold text-amber-950 disabled:opacity-40">ส่งเข้าครัว</button></aside>
    </div>
    {done && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{done}</p>}
  </div>;
}
