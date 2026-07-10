"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BASE, STATUS_STYLE, updateJobStatus, useGuardNest } from "../store";

export function GuardJobPage() {
  const { state, setState } = useGuardNest();
  const search = useSearchParams();
  const id = search.get("id");
  const job = state.jobs.find((j) => j.id === id) ?? null;

  function cycleStatus() {
    if (!job) return;
    setState((s) => updateJobStatus(s, job.id));
  }

  if (!id) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-emerald-800">สรุปงาน</h1>
        <p className="mt-2 text-sm text-slate-600">เลือกงานจากรายการเพื่อดูรายละเอียด</p>
        <Link
          href={`${BASE}/jobs`}
          className="mt-5 inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
        >
          ไปรายการงาน
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-emerald-800">ไม่พบงาน</h1>
        <p className="mt-2 text-sm text-slate-600">รหัสงานนี้ไม่มีในชุดข้อมูลเดโม</p>
        <Link
          href={`${BASE}/jobs`}
          className="mt-5 inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
        >
          กลับรายการงาน
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-emerald-700">{job.id}</p>
          <h1 className="font-display text-xl font-bold text-emerald-900">{job.customer}</h1>
          <p className="mt-0.5 text-sm text-slate-600">{job.type}</p>
        </div>
        <Link href={`${BASE}/jobs`} className="text-xs font-semibold text-emerald-800">
          ‹ รายการงาน
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[job.status]}`}>
          {job.status}
        </span>
        <span className="text-xs text-slate-500">
          {job.day} · {job.time} · {job.tech}
        </span>
      </div>

      <dl className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">ที่อยู่</dt>
          <dd className="text-right font-medium">{job.address}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">ประเภทงาน</dt>
          <dd className="text-right font-medium">{job.type}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">ช่างที่รับผิดชอบ</dt>
          <dd className="text-right font-medium">{job.tech}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">หมายเหตุ</dt>
          <dd className="text-right font-medium">{job.notes}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={cycleStatus}
          className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white"
        >
          สถานะ: {job.status} · กดเพื่อเลื่อนสถานะ
        </button>
        <Link
          href={`${BASE}/customers`}
          className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800"
        >
          ดูลูกค้า
        </Link>
      </div>
    </div>
  );
}
