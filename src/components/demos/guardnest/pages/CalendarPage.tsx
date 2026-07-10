"use client";

import Link from "next/link";
import { BASE, DAYS, STATUS_STYLE, useGuardNest } from "../store";

export function GuardCalendarPage() {
  const { state } = useGuardNest();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-emerald-800">ปฏิทินทีม</h1>
        <p className="mt-1 text-sm text-slate-600">งานแยกตามวัน จ.–ศ. · กดการ์ดเพื่อเปิดสรุปงาน</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-5">
        {DAYS.map((day) => {
          const dayJobs = state.jobs.filter((j) => j.day === day);
          return (
            <div key={day} className="min-h-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <p className="mb-2 text-center text-xs font-bold text-emerald-800">{day}</p>
              <div className="space-y-1.5">
                {dayJobs.map((j) => (
                  <Link
                    key={j.id}
                    href={`${BASE}/job?id=${encodeURIComponent(j.id)}`}
                    className="block w-full rounded-lg bg-emerald-50 px-2 py-1.5 text-left text-[11px] text-emerald-900 ring-1 ring-emerald-100 transition hover:bg-emerald-100"
                  >
                    <span className="font-semibold">{j.time}</span>
                    <br />
                    {j.tech}
                    <br />
                    <span className="text-emerald-700">{j.type}</span>
                    <br />
                    <span className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[j.status]}`}>
                      {j.status}
                    </span>
                  </Link>
                ))}
                {dayJobs.length === 0 && (
                  <p className="py-6 text-center text-[11px] text-slate-400">ว่าง</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
