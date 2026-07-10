"use client";

import type { OrderCol } from "../store";
import { COLS, COL_STYLE, useTableFlow } from "../store";

export function TableOrdersPage() {
  const { state, setState } = useTableFlow();

  function setCol(id: string, col: OrderCol) {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, col } : o)),
    }));
  }

  const totalOpen = state.orders.filter((o) => o.col !== "เสร็จแล้ว").reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-amber-900">ออเดอร์ทั้งหมด</h1>
          <p className="mt-1 text-sm text-slate-600">
            {state.orders.length} รายการ · ค้าง ฿{totalOpen.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {state.orders.map((o) => (
          <div
            key={o.id}
            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-3 ${COL_STYLE[o.col]}`}
          >
            <div>
              <p className="font-semibold">
                {o.table} · {o.items}
              </p>
              <p className="text-xs text-slate-500">
                {o.id} · ฿{o.total.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {COLS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCol(o.id, c)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    o.col === c ? "bg-amber-700 text-white" : "bg-white/80 text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
