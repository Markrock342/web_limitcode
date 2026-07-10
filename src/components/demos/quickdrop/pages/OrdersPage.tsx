"use client";

import Link from "next/link";
import {
  BASE,
  STATUS_LABEL,
  STATUS_STYLE,
  advanceOrder,
  assignCourier,
  useQuickDrop,
} from "../store";

export function QuickOrdersPage() {
  const { state, setState } = useQuickDrop();
  const onlineCouriers = state.couriers.filter((c) => c.online);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-800">ออเดอร์</h1>
        <p className="mt-1 text-sm text-slate-600">เลื่อนสถานะหรือมอบหมายไรเดอร์</p>
      </div>
      <ul className="space-y-3">
        {state.orders.map((o) => (
          <li key={o.id} className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Link
                  href={`${BASE}/order?id=${o.id}`}
                  className="font-mono text-xs text-indigo-500 hover:underline"
                >
                  {o.code}
                </Link>
                <p className="font-semibold text-slate-800">{o.customer}</p>
                <p className="text-xs text-slate-500">
                  โซน {o.zone}
                  {o.courierId && ` · ${state.couriers.find((c) => c.id === o.courierId)?.name ?? ""}`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[o.status]}`}>
                  {STATUS_LABEL[o.status]}
                </span>
                {o.status !== "done" && (
                  <button
                    type="button"
                    onClick={() => setState((s) => advanceOrder(s, o.id))}
                    className="rounded-full bg-indigo-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-600"
                  >
                    เลื่อนสถานะ →
                  </button>
                )}
                {!o.courierId && o.status !== "done" && (
                  <button
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        assignOrderId: s.assignOrderId === o.id ? null : o.id,
                      }))
                    }
                    className="rounded-full border border-[#ff6b4a]/40 px-3 py-1.5 text-xs font-bold text-[#ff6b4a] hover:bg-[#fff0ec]"
                  >
                    มอบหมาย
                  </button>
                )}
              </div>
            </div>
            {state.assignOrderId === o.id && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-indigo-50 pt-3">
                {onlineCouriers.length === 0 && (
                  <p className="text-xs text-slate-400">ไม่มีไรเดอร์ออนไลน์</p>
                )}
                {onlineCouriers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setState((s) => assignCourier(s, o.id, c.id))}
                    className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
