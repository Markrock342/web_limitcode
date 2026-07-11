"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { DAY_FULL, DAYS, BASE, useIronPulse } from "../store";

export function IronBookClassPage() {
  const { state, setState } = useIronPulse();
  const classes = state.classes.filter((item) => item.day === state.day);

  function toggleBooking(id: string) {
    setState((current) => ({
      ...current,
      classes: current.classes.map((item) => {
        if (item.id !== id) return item;
        if (item.mine) return { ...item, mine: false, booked: Math.max(0, item.booked - 1) };
        return item.booked >= item.seats ? item : { ...item, mine: true, booked: item.booked + 1 };
      }),
    }));
  }

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="member">
      <div className="mx-auto max-w-4xl space-y-5">
        <header>
          <p className="text-xs font-bold tracking-[0.18em] text-lime-700">CLASS RESERVATION</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-zinc-900">จองคลาสของคุณ</h1>
          <p className="mt-1 text-sm text-slate-600">เลือกวันและยืนยันที่นั่งได้ทันที · ข้อมูลเป็นเดโมในเบราว์เซอร์</p>
        </header>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day, index) => (
            <button key={day} type="button" onClick={() => setState((current) => ({ ...current, day }))} className={`px-4 py-2 text-sm font-bold ${state.day === day ? "bg-zinc-900 text-lime-100" : "border border-slate-200 bg-white text-slate-600"}`}>
              {DAY_FULL[index]}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {classes.map((item) => {
            const full = item.booked >= item.seats;
            return (
              <article key={item.id} className="border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold text-zinc-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.time} น. · เหลือ {item.seats - item.booked} ที่</p>
                  </div>
                  <span className="text-xs font-bold text-lime-700">{item.booked}/{item.seats}</span>
                </div>
                <button type="button" disabled={!item.mine && full} onClick={() => toggleBooking(item.id)} className={`mt-5 w-full py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 ${item.mine ? "bg-orange-500 text-white" : "bg-lime-200 text-zinc-900"}`}>
                  {item.mine ? "ยกเลิกการจอง" : full ? "คลาสเต็ม" : "จองที่นั่ง"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </RequireAuth>
  );
}
