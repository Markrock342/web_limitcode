"use client";

import Link from "next/link";
import { BASE, DATES, HOURS, fmtDay, useSmashLane } from "../store";

export function SmashAdminPage() {
  const { state, setState } = useSmashLane();
  const date = DATES[state.dateIdx];
  const queue = state.bookings.filter((b) => b.date === date && b.paid && b.court === null);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#3953A4]">คิวรอจัดคอร์ท</h1>
          <p className="mt-1 text-sm text-slate-600">{fmtDay(date)} · {queue.length} รายการ</p>
        </div>
        <Link href={`${BASE}/admin/grid`} className="rounded-full bg-[#3953A4] px-4 py-2 text-sm font-semibold text-white">
          เปิดตารางคอร์ท
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {DATES.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setState((s) => ({ ...s, dateIdx: i }))}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              i === state.dateIdx ? "bg-[#3953A4] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {i === 0 ? "วันนี้" : fmtDay(d)}
          </button>
        ))}
      </div>

      {queue.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
          ไม่มีคิวรอ —{" "}
          <Link href={`${BASE}/book`} className="font-semibold text-[#3953A4]">
            ลองจองจากฝั่งลูกค้า
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {HOURS.map((h) => {
            const items = queue.filter((b) => b.hour === h);
            if (!items.length) return null;
            return (
              <section key={h} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h2 className="font-display font-bold text-slate-800">
                  {String(h).padStart(2, "0")}:00 · {items.length} คิว
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((b) => (
                    <Link
                      key={b.id}
                      href={`${BASE}/admin/grid?hour=${h}&focus=${b.id}`}
                      className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-left text-xs hover:border-[#EB8824]"
                    >
                      <p className="font-bold text-[#EB8824]">{b.name}</p>
                      <p className="text-slate-500">
                        {b.code} · ฿{b.price}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
