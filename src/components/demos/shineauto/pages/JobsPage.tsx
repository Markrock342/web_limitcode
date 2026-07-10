"use client";

import Image from "next/image";
import Link from "next/link";
import type { JobStatus } from "../store";
import { BASE, nextJobStatus, STATUS_STYLE, useShineAuto } from "../store";

const FILTERS: Array<JobStatus | "ทั้งหมด"> = ["ทั้งหมด", "รอคิว", "กำลังทำ", "เสร็จ"];

export function ShineJobsPage() {
  const { state, setState } = useShineAuto();
  const filtered =
    state.jobFilter === "ทั้งหมด" ? state.jobs : state.jobs.filter((j) => j.status === state.jobFilter);

  function advance(id: string) {
    setState((s) => ({
      ...s,
      jobs: s.jobs.map((j) => (j.id === id ? { ...j, status: nextJobStatus(j.status) } : j)),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/work-3.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#142840]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">งานวันนี้</h1>
            <p className="mt-1 text-sm text-sky-50/90">{filtered.length} งาน · กดเลื่อนสถานะ รอคิว → กำลังทำ → เสร็จ</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setState((s) => ({ ...s, jobFilter: f }))}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              state.jobFilter === f ? "bg-[#1F3A5F] text-white" : "bg-white text-[#1F3A5F] ring-1 ring-[#D5DEEA]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#D5DEEA] bg-[#E8EEF5] px-4 py-12 text-center text-sm text-slate-500">
            ไม่มีงานในตัวกรองนี้
          </div>
        ) : (
          filtered.map((j) => (
            <article
              key={j.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#D5DEEA] bg-white shadow-sm sm:flex-row"
            >
              <div className="relative h-28 w-full shrink-0 sm:h-auto sm:w-36">
                <Image src={j.img} alt="" fill className="object-cover" sizes="144px" />
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display font-bold text-[#142840]">
                    {j.car} <span className="font-normal text-slate-400">· {j.plate}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {j.packageName} · {j.bayName} · {j.date} {j.time}
                  </p>
                  <p className="text-xs text-slate-400">
                    {j.code} · {j.customer}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[j.status]}`}>
                    {j.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => advance(j.id)}
                    className="rounded-full bg-[#1F3A5F] px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    เลื่อนสถานะ
                  </button>
                  <Link
                    href={`${BASE}/job?id=${j.id}`}
                    className="rounded-full border border-[#D5DEEA] px-3 py-1.5 text-[11px] font-semibold text-[#1F3A5F]"
                  >
                    รายละเอียด
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
