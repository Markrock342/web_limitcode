"use client";

import Link from "next/link";
import { BASE, jobsBreakdown, useBlueRoute } from "../store";

export function BlueBreakdownPage() {
  const { state } = useBlueRoute();
  const list = jobsBreakdown(state.jobs);
  const open = list.filter((j) => j.status === "กำลังซ่อม").length;
  const closed = list.filter((j) => j.status === "ปิดงานแล้ว").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-[#16234A]">เสียกลางทาง</h1>
          <p className="mt-1 text-sm text-[#6B7693]">
            {list.length} รายการ · เปิด {open} · ปิดแล้ว {closed}
          </p>
        </div>
        <Link
          href={`${BASE}/jobs`}
          className="rounded-full border border-[#E3E7F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#2E4A8A]"
        >
          รายการงานทั้งหมด
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {list.map((job) => (
          <Link
            key={job.id}
            href={`${BASE}/job?id=${job.id}`}
            className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display font-bold text-[#16234A]">{job.jobNum}</p>
                <p className="mt-0.5 text-sm text-[#6B7693]">
                  เบอร์รถ {job.vehicle} · {job.plate}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  job.status === "กำลังซ่อม"
                    ? "bg-emerald-50 text-[#1FA97A]"
                    : "bg-rose-50 text-[#E5544B]"
                }`}
              >
                {job.status}
              </span>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-[#1A2240]">{job.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#6B7693]">
              <span className="rounded-full bg-rose-50 px-2 py-1 font-semibold text-rose-600">
                เสียกลางทาง
              </span>
              <span className="rounded-full bg-[#F5F7FC] px-2 py-1">{job.tech}</span>
              <span className="rounded-full bg-[#F5F7FC] px-2 py-1">{job.opened}</span>
            </div>
            {job.costs.length > 0 && (
              <p className="mt-3 text-xs text-[#6B7693]">
                ค่าใช้จ่ายพิเศษ ฿
                {job.costs.reduce((s, c) => s + c.amount, 0).toLocaleString()}
              </p>
            )}
            <p className="mt-3 text-xs font-semibold text-[#2E4A8A]">ดูสรุปงาน ›</p>
          </Link>
        ))}
        {list.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6B7693]">
            ไม่มีงานเสียกลางทางในเดโม
          </p>
        )}
      </div>
    </div>
  );
}
