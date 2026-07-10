"use client";

import { useState } from "react";
import Link from "next/link";
import { BASE, addCustomerNote, useGuardNest } from "../store";

export function GuardCustomersPage() {
  const { state, setState } = useGuardNest();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function submitNote(customerId: string) {
    const note = drafts[customerId] ?? "";
    setState((s) => addCustomerNote(s, customerId, note));
    setDrafts((d) => ({ ...d, [customerId]: "" }));
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-emerald-800">ลูกค้า</h1>
        <p className="mt-1 text-sm text-slate-600">
          {state.customers.length} ราย · เพิ่มโน้ตหน้างานได้ทันที
        </p>
      </div>

      <div className="space-y-3">
        {state.customers.map((c) => {
          const jobs = state.jobs.filter((j) => j.customerId === c.id);
          return (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-bold text-emerald-900">{c.name}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{c.address}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.phone}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                  {jobs.length} งาน
                </span>
              </div>

              {jobs.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {jobs.map((j) => (
                    <Link
                      key={j.id}
                      href={`${BASE}/job?id=${encodeURIComponent(j.id)}`}
                      className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      {j.id} · {j.status}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">โน้ต</p>
                <ul className="mt-2 space-y-1.5">
                  {c.notes.map((n, i) => (
                    <li key={`${c.id}-${i}`} className="rounded-xl bg-emerald-50/80 px-3 py-2 text-sm text-emerald-900">
                      {n}
                    </li>
                  ))}
                  {c.notes.length === 0 && (
                    <li className="text-sm text-slate-400">ยังไม่มีโน้ต</li>
                  )}
                </ul>
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={drafts[c.id] ?? ""}
                  onChange={(e) => setDrafts((d) => ({ ...d, [c.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitNote(c.id);
                  }}
                  placeholder="เพิ่มโน้ตหน้างาน…"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="button"
                  onClick={() => submitNote(c.id)}
                  className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  บันทึก
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
