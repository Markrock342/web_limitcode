"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import {
  BASE,
  COURTS,
  DATES,
  HOURS,
  ensureDateSeeded,
  fmtDay,
  tierFor,
  useSmashLane,
} from "../store";

export function SmashBookPage() {
  const { state, setState } = useSmashLane();
  const date = DATES[state.dateIdx];
  const dayBookings = state.bookings.filter((b) => b.date === date && b.paid);

  function capacityAt(hour: number) {
    const lockedN = state.locked.filter((k) => k.startsWith(`${date}|`) && k.endsWith(`|${hour}`)).length;
    return COURTS - lockedN;
  }
  function freeAt(hour: number) {
    return Math.max(0, capacityAt(hour) - dayBookings.filter((b) => b.hour === hour).length);
  }
  function toggleHour(h: number) {
    if (freeAt(h) <= 0 && !state.selectedHours.includes(h)) return;
    setState((s) => ({
      ...s,
      selectedHours: s.selectedHours.includes(h)
        ? s.selectedHours.filter((x) => x !== h)
        : [...s.selectedHours, h].sort((a, b) => a - b),
    }));
  }

  const total = state.selectedHours.reduce((s, h) => s + tierFor(h).price, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#3953A4]">จองคอร์ท</h1>
        <p className="mt-1 text-sm text-slate-600">เลือกวันและช่วงเวลา — ไม่ต้องเลือกเลขคอร์ท</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {DATES.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setState((s) => ensureDateSeeded(s, i))}
            className={`min-w-[88px] shrink-0 rounded-2xl border px-3 py-2.5 text-left ${
              i === state.dateIdx ? "border-[#3953A4] bg-[#3953A4] text-white" : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-[11px] opacity-80">{i === 0 ? "วันนี้" : fmtDay(d).split(" ")[0]}</p>
            <p className="font-display text-sm font-bold">{fmtDay(d).replace(/^.*\s/, "")}</p>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {HOURS.map((h) => {
          const free = freeAt(h);
          const selected = state.selectedHours.includes(h);
          const full = free <= 0;
          const tier = tierFor(h);
          return (
            <button
              key={h}
              type="button"
              disabled={full && !selected}
              onClick={() => toggleHour(h)}
              className={`flex w-full items-center justify-between border-t border-slate-100 px-4 py-3 text-left first:border-t-0 ${
                selected ? "bg-[#3953A4]/8" : full ? "bg-slate-50 text-slate-400" : "hover:bg-orange-50/50"
              }`}
            >
              <span>
                <span className="font-semibold">
                  {String(h).padStart(2, "0")}:00–{String(h + 1).padStart(2, "0")}:00
                </span>
                <span className="ml-2 text-xs text-slate-400">{tier.label}</span>
              </span>
              <span className="flex items-center gap-3 text-sm">
                <span className="font-bold text-[#EB8824]">฿{tier.price}</span>
                <span className={`text-xs font-semibold ${full ? "text-rose-500" : "text-emerald-600"}`}>
                  {full ? "เต็ม" : `ว่าง ${free}`}
                </span>
                <span
                  className={`grid size-5 place-items-center rounded border ${
                    selected ? "border-[#3953A4] bg-[#3953A4] text-white" : "border-slate-300"
                  }`}
                >
                  {selected && <Check className="size-3" />}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          {state.selectedHours.length
            ? `เลือก ${state.selectedHours.length} ชม. · รวม ฿${total.toLocaleString()}`
            : "เลือกอย่างน้อย 1 ช่วงเวลา"}
        </p>
        <Link
          href={`${BASE}/checkout`}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white ${
            state.selectedHours.length ? "bg-[#3953A4]" : "pointer-events-none bg-slate-300"
          }`}
        >
          ไปชำระเงิน
        </Link>
      </div>
    </div>
  );
}
