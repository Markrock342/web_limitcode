"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BASE, nextJobStatus, STATUS_STYLE, type JobStatus, useShineAuto } from "../store";

export function ShineJobPage() {
  const { state, setState } = useShineAuto();
  const search = useSearchParams();
  const id = search.get("id");
  const job = state.jobs.find((j) => j.id === id) ?? null;

  function setStatus(next: JobStatus) {
    if (!job) return;
    setState((s) => ({
      ...s,
      jobs: s.jobs.map((j) => (j.id === job.id ? { ...j, status: next } : j)),
    }));
  }

  if (!id) {
    return (
      <div className="rounded-2xl border border-[#D5DEEA] bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-[#142840]">รายละเอียดงาน</h1>
        <p className="mt-2 text-sm text-slate-500">เลือกงานจากรายการเพื่อดูรายละเอียด</p>
        <Link
          href={`${BASE}/jobs`}
          className="mt-5 inline-flex rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-white"
        >
          ไปรายการงาน
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="rounded-2xl border border-[#D5DEEA] bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-[#142840]">ไม่พบงาน</h1>
        <p className="mt-2 text-sm text-slate-500">รหัสงานนี้ไม่มีในชุดข้อมูลเดโม</p>
        <Link
          href={`${BASE}/jobs`}
          className="mt-5 inline-flex rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-white"
        >
          กลับรายการงาน
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[16/9]">
          <Image src={job.img} alt={job.packageName} fill priority className="object-cover" sizes="500px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142840] via-[#142840]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-xs font-semibold text-sky-100/90">{job.code}</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white">{job.packageName}</h1>
            <p className="mt-1 text-sm text-sky-50/90">
              {job.car} · {job.plate}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[job.status]}`}>{job.status}</span>
        <Link href={`${BASE}/jobs`} className="text-xs font-semibold text-[#1F3A5F]">
          ‹ รายการงาน
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl bg-[#E8EEF5] p-3">
          <p className="text-slate-500">ลูกค้า</p>
          <p className="mt-0.5 font-semibold text-[#142840]">{job.customer}</p>
        </div>
        <div className="rounded-xl bg-[#E8EEF5] p-3">
          <p className="text-slate-500">เบย์</p>
          <p className="mt-0.5 font-semibold text-[#142840]">{job.bayName}</p>
        </div>
        <div className="rounded-xl bg-[#E8EEF5] p-3">
          <p className="text-slate-500">วันเวลา</p>
          <p className="mt-0.5 font-semibold text-[#142840]">
            {job.date} {job.time}
          </p>
        </div>
        <div className="rounded-xl bg-[#E8EEF5] p-3">
          <p className="text-slate-500">รหัสงาน</p>
          <p className="mt-0.5 font-semibold text-[#142840]">{job.id}</p>
        </div>
      </div>

      {job.note && (
        <div className="rounded-xl border border-[#D5DEEA] bg-white p-3 text-sm text-slate-600">
          <p className="text-xs font-semibold text-[#1F3A5F]">โน้ต</p>
          <p className="mt-1">{job.note}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {(["รอคิว", "กำลังทำ", "เสร็จ"] as JobStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
              job.status === s ? "bg-[#1F3A5F] text-white" : "bg-[#E8EEF5] text-[#1F3A5F]"
            }`}
          >
            {s}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setStatus(nextJobStatus(job.status))}
          className="rounded-full border border-[#1F3A5F] px-3.5 py-2 text-xs font-semibold text-[#1F3A5F]"
        >
          เลื่อนขั้นถัดไป
        </button>
      </div>
    </div>
  );
}
