"use client";

import { approveQuote, QUOTE_STYLE, useGuardNest } from "../store";

export function GuardQuotesPage() {
  const { state, setState } = useGuardNest();

  function toggle(id: string) {
    setState((s) => approveQuote(s, id));
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-emerald-800">ใบเสนอราคา</h1>
        <p className="mt-1 text-sm text-slate-600">
          {state.quotes.length} ใบ · กดปุ่มสถานะเพื่อสลับ ร่าง → รออนุมัติ → อนุมัติแล้ว
        </p>
      </div>

      <div className="space-y-3">
        {state.quotes.map((q) => (
          <div
            key={q.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="text-xs text-emerald-700">{q.id}</p>
              <p className="font-semibold text-slate-900">{q.customer}</p>
              <p className="text-sm text-slate-600">
                {q.service} · ฿{q.amount.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle(q.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-emerald-200 transition hover:bg-emerald-50 ${QUOTE_STYLE[q.status]}`}
            >
              {q.status} · กดเปลี่ยนสถานะ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
