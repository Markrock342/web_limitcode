"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BASE, STATUS_STYLE, type JobStatus, useGuardNest } from "../store";

type Filter = "ทั้งหมด" | JobStatus;

export function GuardJobsPage() {
  const { state } = useGuardNest();
  const [filter, setFilter] = useState<Filter>("ทั้งหมด");

  const filtered = useMemo(() => {
    if (filter === "ทั้งหมด") return state.jobs;
    return state.jobs.filter((j) => j.status === filter);
  }, [state.jobs, filter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-[#0b1f3a]">งานทั้งหมด</h1>
          <p className="mt-0.5 text-sm text-slate-500">{filtered.length} รายการ</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {(["ทั้งหมด", "รอเสนอราคา", "นัดหมาย", "กำลังทำ", "เสร็จแล้ว"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                filter === s
                  ? "bg-[#0f2744] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">รหัส</th>
              <th className="px-4 py-3 font-medium">ลูกค้า / ที่อยู่</th>
              <th className="px-4 py-3 font-medium">ประเภท</th>
              <th className="px-4 py-3 font-medium">วัน·เวลา</th>
              <th className="px-4 py-3 font-medium">ช่าง</th>
              <th className="px-4 py-3 font-medium">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <Link
                    href={`${BASE}/job?id=${encodeURIComponent(job.id)}`}
                    className="font-medium text-sky-600 hover:underline"
                  >
                    {job.id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{job.customer}</p>
                  <p className="text-xs text-slate-400">{job.address}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{job.type}</td>
                <td className="px-4 py-3 text-slate-600">
                  {job.day} · {job.time}
                </td>
                <td className="px-4 py-3 text-slate-600">{job.tech}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[job.status]}`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-400">
                  ไม่พบงานตามตัวกรอง
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
