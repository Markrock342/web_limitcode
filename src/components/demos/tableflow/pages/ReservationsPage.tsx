"use client";

import type { Reservation } from "../store";
import { useTableFlow } from "../store";

const STATUS_STYLE: Record<Reservation["status"], string> = {
  รอโต๊ะ: "bg-amber-100 text-amber-900",
  นั่งแล้ว: "bg-emerald-100 text-emerald-800",
  ยกเลิก: "bg-slate-100 text-slate-500",
};

export function TableReservationsPage() {
  const { state, setState } = useTableFlow();

  function setStatus(id: string, status: Reservation["status"]) {
    setState((s) => ({
      ...s,
      reservations: s.reservations.map((r) => (r.id === id ? { ...r, status } : r)),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">รายการจอง</h1>
        <p className="mt-1 text-sm text-slate-600">{state.reservations.length} รายการวันนี้</p>
      </div>

      <div className="space-y-2">
        {state.reservations.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
          >
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-slate-500">
                {r.id} · {r.size} ท่าน · {r.time}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[r.status]}`}>
                {r.status}
              </span>
              <button
                type="button"
                onClick={() => setStatus(r.id, "นั่งแล้ว")}
                className="rounded-lg bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white"
              >
                นั่งแล้ว
              </button>
              <button
                type="button"
                onClick={() => setStatus(r.id, "รอโต๊ะ")}
                className="rounded-lg bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-900"
              >
                รอโต๊ะ
              </button>
              <button
                type="button"
                onClick={() => setStatus(r.id, "ยกเลิก")}
                className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
