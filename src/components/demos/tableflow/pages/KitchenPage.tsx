"use client";

import { COL_STYLE, KITCHEN_COLS, useTableFlow } from "../store";

export function TableKitchenPage() {
  const { state, setState } = useTableFlow();

  function moveOrder(id: string, dir: -1 | 1) {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => {
        if (o.id !== id) return o;
        const i = KITCHEN_COLS.indexOf(o.col as (typeof KITCHEN_COLS)[number]);
        if (i < 0) return o;
        const next = KITCHEN_COLS[Math.min(KITCHEN_COLS.length - 1, Math.max(0, i + dir))];
        return { ...o, col: next };
      }),
    }));
  }

  function markDone(id: string) {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, col: "เสร็จแล้ว" } : o)),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">Kitchen Board</h1>
        <p className="mt-1 text-sm text-slate-600">เลื่อนสถานะ ใหม่ → กำลังทำ → พร้อมเสิร์ฟ</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {KITCHEN_COLS.map((col) => (
          <div key={col} className={`rounded-2xl border p-3 ${COL_STYLE[col]}`}>
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-slate-700">{col}</p>
            <div className="space-y-2">
              {state.orders
                .filter((o) => o.col === col)
                .map((o) => (
                  <div key={o.id} className="rounded-xl border border-white/80 bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-amber-800">{o.table}</p>
                      <p className="text-[10px] text-slate-400">{o.id}</p>
                    </div>
                    <p className="mt-1 text-sm font-medium">{o.items}</p>
                    <p className="mt-0.5 text-xs text-slate-500">฿{o.total}</p>
                    <div className="mt-2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveOrder(o.id, -1)}
                        disabled={col === "ใหม่"}
                        className="flex-1 rounded-lg bg-slate-100 py-1 text-[11px] font-semibold disabled:opacity-30"
                      >
                        ← ย้อน
                      </button>
                      {col === "พร้อมเสิร์ฟ" ? (
                        <button
                          type="button"
                          onClick={() => markDone(o.id)}
                          className="flex-1 rounded-lg bg-emerald-600 py-1 text-[11px] font-semibold text-white"
                        >
                          เสร็จแล้ว
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => moveOrder(o.id, 1)}
                          className="flex-1 rounded-lg bg-amber-700 py-1 text-[11px] font-semibold text-white"
                        >
                          ไปต่อ →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
