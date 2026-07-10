"use client";

import { CheckCircle2, Search } from "lucide-react";
import { useIronPulse } from "../store";

export function IronCheckinPage() {
  const { state, setState } = useIronPulse();
  const filtered = state.members.filter((m) => m.name.includes(state.query.trim()) || state.query.trim() === "");

  function checkIn(id: string) {
    setState((s) => ({
      ...s,
      members: s.members.map((m) => (m.id === id ? { ...m, checkedIn: true } : m)),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-lime-800">Check-in</h1>
        <p className="mt-1 text-sm text-slate-600">ค้นหาชื่อสมาชิกแล้วกดเช็คอิน</p>
      </div>
      <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search className="size-4 text-slate-400" />
        <input
          value={state.query}
          onChange={(e) => setState((s) => ({ ...s, query: e.target.value }))}
          placeholder="ค้นหาชื่อสมาชิก…"
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </label>
      <ul className="space-y-3">
        {filtered.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">{m.plan}</p>
            </div>
            {m.checkedIn ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-lime-800">
                <CheckCircle2 className="size-4" /> Check-in แล้ววันนี้
              </span>
            ) : (
              <button
                type="button"
                onClick={() => checkIn(m.id)}
                disabled={m.status === "expired"}
                className="rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-bold text-lime-100 hover:bg-zinc-800 disabled:opacity-40"
              >
                Check-in
              </button>
            )}
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            ไม่พบสมาชิก
          </p>
        )}
      </ul>
    </div>
  );
}
