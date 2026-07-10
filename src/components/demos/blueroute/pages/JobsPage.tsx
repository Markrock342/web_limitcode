"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BASE,
  jobsBreakdown,
  jobsForDay,
  jobsPending,
  type JobStatus,
  useBlueRoute,
} from "../store";

type Mode = "all" | "day" | "pending" | "breakdown";
type StatusFilter = "ทั้งหมด" | JobStatus;

function parseMode(raw: string | null): Mode {
  if (raw === "day" || raw === "pending" || raw === "breakdown") return raw;
  return "all";
}

export function BlueJobsPage() {
  const { state } = useBlueRoute();
  const search = useSearchParams();
  const mode = parseMode(search.get("mode"));
  const tech = search.get("tech");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ทั้งหมด");

  const title =
    mode === "day"
      ? "งานประจำวัน"
      : mode === "pending"
        ? "งานค้างซ่อม"
        : mode === "breakdown"
          ? "เสียกลางทาง"
          : "รายการงานทั้งหมด";

  const filtered = useMemo(() => {
    let list =
      mode === "day"
        ? jobsForDay(state.jobs, tech)
        : mode === "pending"
          ? jobsPending(state.jobs, tech)
          : mode === "breakdown"
            ? jobsBreakdown(state.jobs)
            : state.jobs;
    if (statusFilter !== "ทั้งหมด") list = list.filter((j) => j.status === statusFilter);
    return list;
  }, [state.jobs, mode, tech, statusFilter]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-[#16234A]">
            {title}
            {tech ? ` · ${tech}` : ""}
          </h1>
          <p className="mt-1 text-sm text-[#6B7693]">
            {filtered.length} รายการ · กดการ์ดเพื่อดูสรุปงาน
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["ทั้งหมด", "กำลังซ่อม", "ปิดงานแล้ว"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                statusFilter === s
                  ? "bg-[#16234A] text-white"
                  : "bg-white text-[#6B7693] ring-1 ring-[#E3E7F0]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {(
          [
            { id: "all" as const, label: "ทั้งหมด", href: `${BASE}/jobs` },
            { id: "day" as const, label: "วันนี้", href: `${BASE}/jobs?mode=day` },
            { id: "pending" as const, label: "ค้างซ่อม", href: `${BASE}/jobs?mode=pending` },
            { id: "breakdown" as const, label: "เสียกลางทาง", href: `${BASE}/breakdown` },
          ] as const
        ).map((m) => (
          <Link
            key={m.id}
            href={m.href}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              mode === m.id || (m.id === "breakdown" && mode === "breakdown")
                ? "bg-[#2E4A8A]/10 text-[#2E4A8A]"
                : "bg-white text-[#6B7693] ring-1 ring-[#E3E7F0]"
            }`}
          >
            {m.label}
          </Link>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {filtered.map((job) => (
          <Link
            key={job.id}
            href={`${BASE}/job?id=${job.id}`}
            className="rounded-2xl border border-[#E3E7F0] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
              <span className="rounded-full bg-[#F5F7FC] px-2 py-1">{job.tech}</span>
              {job.subtype === "เสียกลางทาง" && (
                <span className="rounded-full bg-rose-50 px-2 py-1 font-semibold text-rose-600">
                  เสียกลางทาง
                </span>
              )}
              <span className="rounded-full bg-[#F5F7FC] px-2 py-1">{job.opened}</span>
            </div>
            <p className="mt-3 text-xs font-semibold text-[#2E4A8A]">ดูสรุปงาน ›</p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white px-4 py-10 text-center text-sm text-[#6B7693]">
            ไม่พบรายการตามตัวกรอง
          </p>
        )}
      </div>
    </div>
  );
}
