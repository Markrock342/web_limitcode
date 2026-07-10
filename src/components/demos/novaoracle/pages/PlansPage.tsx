"use client";

import { PLANS } from "../store";

export function NovaPlansPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-violet-800">แพ็กเกจ & เครดิต</h1>
        <p className="mt-1 text-sm text-slate-600">เปรียบเทียบ Free · Pro · Business</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl border p-5 shadow-sm ${
              p.id === "Pro" ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-sm font-semibold text-violet-700">{p.id}</p>
            <p className="mt-1 font-display text-3xl font-bold text-slate-900">{p.price}</p>
            <p className="text-xs text-slate-500">/ เดือน</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-violet-600">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-5 w-full rounded-full bg-violet-700 py-2 text-xs font-bold text-white hover:bg-violet-600"
            >
              เลือกแพ็กเกจ (เดโม)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
