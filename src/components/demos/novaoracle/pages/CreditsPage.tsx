"use client";

import { demoId, isoDateOffset, pick } from "@/components/demos/_shell/seed";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useNovaOracle } from "../store";

export function NovaCreditsPage() {
  const { state, setState } = useNovaOracle();
  const selected = state.users[0];

  function applyCredit(amount: number, note: string) {
    setState((current) => ({
      ...current,
      users: current.users.map((user) => user.id === selected.id ? { ...user, credits: Math.max(0, user.credits + amount) } : user),
      creditLedger: [{
        id: demoId("CR", current.creditLedger.length + 1),
        userId: selected.id,
        user: selected.name,
        amount,
        note,
        at: `${isoDateOffset(0)} 11:00`,
      }, ...current.creditLedger],
    }));
  }

  return (
    <RequireAuth session={state.session} basePath={BASE}>
      <div className="space-y-6">
        <header>
          <p className="text-xs font-bold tracking-[0.18em] text-violet-700">CREDIT OPERATIONS</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">เครดิตและ ledger</h1>
          <p className="mt-1 text-sm text-slate-600">จำลองการเติมและใช้เครดิตสำหรับ {selected.name}</p>
        </header>
        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border border-violet-200 bg-violet-50 p-5">
            <p className="text-sm font-semibold text-violet-900">เครดิตคงเหลือ</p>
            <p className="mt-2 font-display text-4xl font-bold text-violet-800">{selected.credits}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button type="button" onClick={() => applyCredit(100, "เติมเครดิตเดโม")} className="bg-violet-700 px-4 py-2.5 text-sm font-bold text-white">เติม +100</button>
              <button type="button" onClick={() => applyCredit(-10, pick(["สร้างบทความ", "เรียกใช้ Persona", "สรุปรายงาน"], state.creditLedger.length))} disabled={selected.credits < 10} className="border border-violet-300 bg-white px-4 py-2.5 text-sm font-bold text-violet-800 disabled:opacity-40">ใช้ -10</button>
            </div>
          </div>
          <div className="border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4"><p className="font-semibold text-slate-900">รายการล่าสุด</p></div>
            <ul className="divide-y divide-slate-100">
              {state.creditLedger.slice(0, 10).map((entry) => (
                <li key={entry.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div><p className="text-sm font-medium text-slate-800">{entry.note}</p><p className="text-xs text-slate-400">{entry.user} · {entry.at}</p></div>
                  <span className={`text-sm font-bold ${entry.amount > 0 ? "text-emerald-700" : "text-rose-600"}`}>{entry.amount > 0 ? "+" : ""}{entry.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </RequireAuth>
  );
}
