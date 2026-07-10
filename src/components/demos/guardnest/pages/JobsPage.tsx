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
          <h1 className="font-display text-2xl font-bold text-emerald-800">งานทั้งหมด</h1>
          <p className="mt-1 text-sm text-slate-600">{filtered.length} รายการ · กดการ์ดเพื่อดูสรุปงาน</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["ทั้งหมด", "รอเสนอราคา", "นัดหมาย", "กำลังทำ", "เสร็จแล้ว"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                filter === s
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((job) => (
          <Link
            key={job.id}
            href={`${BASE}/job?id=${encodeURIComponent(job.id)}`}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-emerald-700">{job.id}</p>
                <p className="mt-0.5 font-semibold text-slate-900">{job.customer}</p>
                <p className="mt-1 text-sm text-slate-600">{job.type}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[job.status]}`}>
                {job.status}
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {job.day} · {job.time} · {job.tech}
            </p>
            <p className="mt-2 text-xs font-semibold text-emerald-800">ดูสรุปงาน ›</p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white px-4 py-10 text-center text-sm text-slate-500">
            ไม่พบงานตามตัวกรอง
          </p>
        )}
      </div>
    </div>
  );
}
