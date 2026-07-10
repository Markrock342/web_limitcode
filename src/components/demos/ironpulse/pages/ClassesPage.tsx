"use client";

import { DAYS, DAY_FULL, useIronPulse } from "../store";

export function IronClassesPage() {
  const { state, setState } = useIronPulse();
  const dayClasses = state.classes.filter((c) => c.day === state.day);

  function toggleBook(id: string) {
    setState((s) => ({
      ...s,
      classes: s.classes.map((c) => {
        if (c.id !== id) return c;
        if (c.mine) return { ...c, mine: false, booked: Math.max(0, c.booked - 1) };
        if (c.booked >= c.seats) return c;
        return { ...c, mine: true, booked: c.booked + 1 };
      }),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-lime-800">คลาส</h1>
        <p className="mt-1 text-sm text-slate-600">จอง / ยกเลิกที่นั่งตามวัน</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {DAYS.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setState((s) => ({ ...s, day: d }))}
            className={`rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
              state.day === d ? "bg-zinc-900 text-lime-100" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {d}
            <span className="ml-1 hidden font-normal sm:inline">· {DAY_FULL[i]}</span>
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {dayClasses.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            ไม่มีคลาสวันนี้
          </p>
        )}
        {dayClasses.map((c) => (
          <li
            key={c.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-500">
                {c.time} · ที่นั่ง {c.booked}/{c.seats}
              </p>
            </div>
            <button
              type="button"
              disabled={!c.mine && c.booked >= c.seats}
              onClick={() => toggleBook(c.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold disabled:opacity-40 ${
                c.mine
                  ? "bg-orange-500 text-white hover:bg-orange-400"
                  : "bg-lime-50 text-lime-800 ring-1 ring-lime-200 hover:bg-lime-100"
              }`}
            >
              {c.mine ? "ยกเลิกที่นั่ง" : c.booked >= c.seats ? "เต็ม" : "จองที่นั่ง"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
