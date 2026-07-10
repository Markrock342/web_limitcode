"use client";

import { PAY_STYLE, useStayNest } from "../store";

export function StayBookingsPage() {
  const { state } = useStayNest();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">การจอง</h1>
        <p className="mt-1 text-sm text-slate-600">{state.bookings.length} รายการ</p>
      </div>
      <div className="space-y-2">
        {state.bookings.map((b) => (
          <div
            key={b.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="text-xs text-amber-800">{b.id}</p>
              <p className="font-semibold">{b.guest}</p>
              <p className="text-sm text-slate-500">
                {b.roomType} · {b.nights} คืน · {b.checkIn} → {b.checkOut}
              </p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${PAY_STYLE[b.pay]}`}>{b.pay}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
