"use client";

import Link from "next/link";
import { BASE, DAYS, STATUS_STYLE, useGuardNest } from "../store";

export function GuardCalendarPage() {
  const { state } = useGuardNest();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-[#0b1f3a]">ปฏิทินทีม</h1>
        <p className="mt-0.5 text-sm text-slate-500">งานแยกตามวัน จ.–ศ. · กดรหัสงานเพื่อเปิดสรุป</p>
      </div>

      <div className="overflow-x-auto bg-white shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
        <div className="grid min-w-[640px] grid-cols-5 divide-x divide-slate-100">
          {DAYS.map((day) => {
            const dayJobs = state.jobs.filter((j) => j.day === day);
            return (
              <div key={day} className="min-h-48">
                <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-2 text-center text-xs font-semibold text-[#0b1f3a]">
                  {day}
                  <span className="ml-1 font-normal text-slate-400">({dayJobs.length})</span>
                </div>
                <ul className="space-y-0 divide-y divide-slate-50">
                  {dayJobs.map((j) => (
                    <li key={j.id}>
                      <Link
                        href={`${BASE}/job?id=${encodeURIComponent(j.id)}`}
                        className="block px-3 py-2.5 transition hover:bg-sky-50/60"
                      >
                        <p className="text-[11px] font-semibold text-sky-600">{j.time}</p>
                        <p className="mt-0.5 text-xs font-medium text-slate-800">{j.tech}</p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">{j.type}</p>
                        <span
                          className={`mt-1.5 inline-block px-1.5 py-0.5 text-[10px] font-medium ${STATUS_STYLE[j.status]}`}
                        >
                          {j.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                  {dayJobs.length === 0 && (
                    <li className="px-3 py-8 text-center text-[11px] text-slate-300">ว่าง</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
