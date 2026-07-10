"use client";

import Link from "next/link";
import { BASE, TIMES, useTableFlow } from "../store";

export function TableReservePage() {
  const { state, setState } = useTableFlow();

  function addReservation() {
    if (!state.guest.trim()) return;
    const id = `R-${state.reservations.length + 10}`;
    setState((s) => ({
      ...s,
      reservations: [
        { id, name: s.guest.trim(), size: s.party, time: s.time, status: "รอโต๊ะ" },
        ...s.reservations,
      ],
      lastReserveId: id,
      guest: "",
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">จองโต๊ะ</h1>
        <p className="mt-1 text-sm text-slate-600">เลือกจำนวนท่าน เวลา และชื่อผู้จอง</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium text-slate-500">จำนวนท่าน</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 8].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setState((s) => ({ ...s, party: n }))}
              className={`size-10 rounded-xl text-sm font-bold ${
                state.party === n ? "bg-amber-700 text-white" : "bg-amber-50 text-amber-900 ring-1 ring-amber-200"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs font-medium text-slate-500">เวลา</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setState((s) => ({ ...s, time: t }))}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                state.time === t ? "bg-amber-700 text-white" : "bg-white text-amber-900 ring-1 ring-amber-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          value={state.guest}
          onChange={(e) => setState((s) => ({ ...s, guest: e.target.value }))}
          placeholder="ชื่อผู้จอง"
          className="mt-4 w-full rounded-xl border border-amber-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="button"
          onClick={addReservation}
          disabled={!state.guest.trim()}
          className="mt-3 w-full rounded-xl bg-amber-700 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
        >
          ยืนยันจองโต๊ะ
        </button>
        {state.lastReserveId && (
          <p className="mt-2 text-sm font-medium text-emerald-700">
            จองสำเร็จ {state.lastReserveId} —{" "}
            <Link href={`${BASE}/reservations`} className="underline">
              ดูรายการจอง
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
