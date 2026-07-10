"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { BASE, type JobStatus, useBlueRoute } from "../store";

export function BlueJobPage() {
  const { state, setState } = useBlueRoute();
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
      <div className="rounded-2xl border border-[#E3E7F0] bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-[#16234A]">สรุปงาน</h1>
        <p className="mt-2 text-sm text-[#6B7693]">เลือกงานจากรายการเพื่อดูรายละเอียด</p>
        <Link
          href={`${BASE}/jobs`}
          className="mt-5 inline-flex rounded-full bg-[#16234A] px-5 py-2.5 text-sm font-semibold text-white"
        >
          ไปรายการงาน
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="rounded-2xl border border-[#E3E7F0] bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-[#16234A]">ไม่พบงาน</h1>
        <p className="mt-2 text-sm text-[#6B7693]">รหัสงานนี้ไม่มีในชุดข้อมูลเดโม</p>
        <Link
          href={`${BASE}/jobs`}
          className="mt-5 inline-flex rounded-full bg-[#16234A] px-5 py-2.5 text-sm font-semibold text-white"
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
          <p className="font-display text-xl font-bold text-[#16234A]">{job.jobNum}</p>
          <p className="text-sm text-[#6B7693]">
            เบอร์รถ {job.vehicle} · {job.brand} {job.model}
          </p>
        </div>
        <Link href={`${BASE}/jobs`} className="text-xs font-semibold text-[#2E4A8A]">
          ‹ รายการงาน
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl bg-[#F5F7FC] p-3">
          <p className="text-[#6B7693]">ช่าง</p>
          <p className="mt-0.5 font-semibold">{job.tech}</p>
        </div>
        <div className="rounded-xl bg-[#F5F7FC] p-3">
          <p className="text-[#6B7693]">เลขไมล์</p>
          <p className="mt-0.5 font-semibold">{job.mile.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-[#F5F7FC] p-3">
          <p className="text-[#6B7693]">สถานะ</p>
          <p className="mt-0.5 inline-flex items-center gap-1 font-semibold">
            <CheckCircle2
              className={`size-3.5 ${job.status === "กำลังซ่อม" ? "text-[#1FA97A]" : "text-[#E5544B]"}`}
            />
            {job.status}
          </p>
        </div>
        <div className="rounded-xl bg-[#F5F7FC] p-3">
          <p className="text-[#6B7693]">เปิดงาน</p>
          <p className="mt-0.5 font-semibold">{job.opened}</p>
        </div>
      </div>

      {job.subtype === "เสียกลางทาง" && (
        <div className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
          ประเภท: เสียกลางทาง
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9AA3B8]">รายการแจ้งซ่อม</p>
        <p className="mt-1 text-sm">{job.desc}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9AA3B8]">
          รายงานการปฏิบัติงาน
        </p>
        <p className="mt-1 text-sm">{job.report}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9AA3B8]">
          รายการเบิกอะไหล่
        </p>
        {job.parts.length === 0 ? (
          <p className="mt-1 text-sm text-[#6B7693]">ไม่มีอะไหล่ในงานนี้</p>
        ) : (
          <ul className="mt-2 divide-y divide-[#F0F2F7] rounded-xl border border-[#E3E7F0] bg-white">
            {job.parts.map((p) => (
              <li key={p.name} className="flex justify-between px-3 py-2 text-sm">
                <span>{p.name}</span>
                <span className="font-semibold">×{p.qty}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9AA3B8]">
          ค่าใช้จ่ายอื่น ๆ
        </p>
        {job.costs.length === 0 ? (
          <p className="mt-1 text-sm text-[#6B7693]">ไม่มี</p>
        ) : (
          <ul className="mt-2 divide-y divide-[#F0F2F7] rounded-xl border border-[#E3E7F0] bg-white">
            {job.costs.map((c) => (
              <li key={c.name} className="flex justify-between px-3 py-2 text-sm">
                <span>{c.name}</span>
                <span className="font-semibold">฿{c.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {job.status === "กำลังซ่อม" ? (
          <button
            type="button"
            onClick={() => setStatus("ปิดงานแล้ว")}
            className="rounded-full bg-[#16234A] px-5 py-2.5 text-sm font-semibold text-white"
          >
            ปิดงานแล้ว
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStatus("กำลังซ่อม")}
            className="rounded-full border border-[#E3E7F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#16234A]"
          >
            เปิดงานใหม่
          </button>
        )}
        <Link
          href={`${BASE}/vehicles?q=${encodeURIComponent(job.vehicle)}`}
          className="rounded-full border border-[#E3E7F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#2E4A8A]"
        >
          ดูโปรไฟล์รถ
        </Link>
      </div>
    </div>
  );
}
