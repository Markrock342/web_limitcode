"use client";

import { useTableFlow } from "../store";

export function TableMenuPage() {
  const { state, setState } = useTableFlow();

  function toggleSoldOut(id: string) {
    setState((s) => ({
      ...s,
      menu: s.menu.map((m) => (m.id === id ? { ...m, soldOut: !m.soldOut } : m)),
    }));
  }

  function setPrice(id: string, price: number) {
    setState((s) => ({
      ...s,
      menu: s.menu.map((m) =>
        m.id === id ? { ...m, price: Number.isFinite(price) ? price : m.price } : m,
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">เมนู CMS</h1>
        <p className="mt-1 text-sm text-slate-600">เปิด/ปิด sold-out และแก้ราคา</p>
      </div>

      <div className="space-y-2">
        {state.menu.map((m) => (
          <div
            key={m.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
          >
            <div className="min-w-0 flex-1">
              <p className={`font-semibold ${m.soldOut ? "text-slate-400 line-through" : ""}`}>{m.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-slate-500">฿</span>
                <input
                  type="number"
                  value={m.price}
                  onChange={(e) => setPrice(m.id, Number(e.target.value))}
                  className="w-24 rounded-lg border border-amber-200 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleSoldOut(m.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                m.soldOut ? "bg-rose-600 text-white" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {m.soldOut ? "หมดแล้ว · กดเปิดขาย" : "พร้อมขาย · กดหมด"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
