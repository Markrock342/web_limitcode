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

  if (!id || !job) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-lg font-semibold text-[#0b1f3a]">สรุปงาน</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {id ? "ไม่พบงานรหัสนี้ในชุดข้อมูลเดโม" : "เลือกงานจากรายการเพื่อดูรายละเอียด"}
          </p>
        </div>
        <Link
          href={`${BASE}/jobs`}
          className="inline-flex bg-[#0f2744] px-4 py-2.5 text-sm font-semibold text-white"
        >
          ไปรายการงาน
        </Link>
      </div>
    );
  }

  const customer = state.customers.find((c) => c.id === job.customerId);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-sky-600">{job.id}</p>
          <h1 className="mt-0.5 text-xl font-semibold text-[#0b1f3a]">{job.customer}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{job.type}</p>
        </div>
        <Link href={`${BASE}/jobs`} className="text-xs font-medium text-sky-600 hover:underline">
          ‹ รายการงาน
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLE[job.status]}`}>
          {job.status}
        </span>
        <span className="text-xs text-slate-500">
          {job.day} · {job.time} · {job.tech}
        </span>
      </div>

      <dl className="divide-y divide-slate-100 border-y border-slate-100 bg-white text-sm">
        {[
          ["ที่อยู่", job.address],
          ["ประเภทงาน", job.type],
          ["ช่างที่รับผิดชอบ", job.tech],
          ["หมายเหตุ", job.notes],
          ["โทรลูกค้า", customer?.phone ?? "—"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-6 px-4 py-3">
            <dt className="shrink-0 text-slate-400">{label}</dt>
            <dd className="text-right font-medium text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={cycleStatus}
          className="bg-[#0f2744] px-4 py-2.5 text-sm font-semibold text-white"
        >
          เลื่อนสถานะ · ตอนนี้: {job.status}
        </button>
        <Link
          href={`${BASE}/customers`}
          className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          ดูลูกค้า
        </Link>
      </div>
    </div>
  );
}
