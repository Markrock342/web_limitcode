"use client";

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  TrendingUp,
} from "lucide-react";
import {
  BASE,
  approvedRevenue,
  openJobsCount,
  slaPercent,
  useGuardNest,
  type JobStatus,
} from "../store";

const TYPE_BARS = [
  { label: "กำจัดปลวก", pct: 42, count: 18 },
  { label: "พ่นแมลง", pct: 28, count: 12 },
  { label: "ตรวจประจำปี", pct: 18, count: 8 },
  { label: "วางเหยื่อ", pct: 12, count: 5 },
];

const AGE_BARS = [
  { label: "< 1 วัน", pct: 35, count: 7 },
  { label: "1–3 วัน", pct: 45, count: 9 },
  { label: "3–7 วัน", pct: 15, count: 3 },
  { label: "> 7 วัน", pct: 5, count: 1 },
];

const TREND = [2, 1, 3, 2, 4, 1, 3];

export function GuardHomePage() {
  const { state } = useGuardNest();
  const open = openJobsCount(state.jobs);
  const revenue = approvedRevenue(state.quotes);
  const sla = slaPercent(state.jobs);
  const pendingQuotes = state.quotes.filter((q) => q.status === "รออนุมัติ").length;
  const inProgress = state.jobs.filter((j) => j.status === "กำลังทำ").length;
  const done = state.jobs.filter((j) => j.status === "เสร็จแล้ว").length;
  const urgent = state.jobs.filter((j) => j.status === "รอเสนอราคา").length;

  const byStatus = (["รอเสนอราคา", "นัดหมาย", "กำลังทำ", "เสร็จแล้ว"] as JobStatus[]).map(
    (s) => ({ status: s, count: state.jobs.filter((j) => j.status === s).length }),
  );

  const kpis = [
    {
      label: "งานทั้งหมด",
      value: String(state.jobs.length),
      delta: "↑ 12% จากสัปดาห์ก่อน",
      icon: ClipboardList,
      iconBg: "bg-sky-100 text-sky-600",
    },
    {
      label: "งานเปิดอยู่",
      value: String(open),
      delta: `${urgent} รอเสนอราคา`,
      icon: Clock3,
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      label: "ปิดงานแล้ว",
      value: String(done),
      delta: `SLA ${sla}%`,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "รายได้เดือนนี้",
      value: `฿${(revenue / 1000).toFixed(1)}k`,
      delta: `${pendingQuotes} ใบรออนุมัติ`,
      icon: TrendingUp,
      iconBg: "bg-violet-100 text-violet-600",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold text-[#0b1f3a]">ภาพรวมทีมหน้างาน</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          GuardNest Field · ติดตามงาน Quotation และทีมช่าง
        </p>
      </div>

      {/* KPI row — like cover */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="flex items-start gap-3 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,39,68,0.06)]"
            >
              <span className={`flex size-10 shrink-0 items-center justify-center ${k.iconBg}`}>
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500">{k.label}</p>
                <p className="mt-0.5 text-2xl font-bold tracking-tight text-[#0b1f3a]">{k.value}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{k.delta}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-3 lg:grid-cols-3">
        <section className="bg-white p-4 shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
          <h2 className="text-sm font-semibold text-[#0b1f3a]">งานตามประเภท</h2>
          <p className="mt-0.5 text-[11px] text-slate-400">เดือนนี้</p>
          <ul className="mt-4 space-y-3">
            {TYPE_BARS.map((row) => (
              <li key={row.label}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-medium text-slate-800">{row.count}</span>
                </div>
                <div className="h-2 bg-slate-100">
                  <div className="h-full bg-sky-500" style={{ width: `${row.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-4 shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
          <h2 className="text-sm font-semibold text-[#0b1f3a]">งานค้างตามอายุ</h2>
          <p className="mt-0.5 text-[11px] text-slate-400">งานที่ยังไม่ปิด</p>
          <ul className="mt-4 space-y-3">
            {AGE_BARS.map((row) => (
              <li key={row.label}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="text-slate-600">{row.label}</span>
                  <span className="font-medium text-slate-800">{row.count}</span>
                </div>
                <div className="h-2 bg-slate-100">
                  <div className="h-full bg-amber-500" style={{ width: `${row.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-[12px]">
            <span className="text-slate-500">
              ค้างทั้งหมด <strong className="text-slate-800">{open}</strong>
            </span>
            <span className="text-rose-600">
              เกินกำหนด <strong>{urgent}</strong>
            </span>
          </div>
        </section>

        <section className="bg-white p-4 shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
          <div className="flex items-start gap-2">
            <span className="flex size-8 items-center justify-center bg-rose-50 text-rose-600">
              <AlertTriangle className="size-4" strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-[#0b1f3a]">งานด่วน / หน้างาน</h2>
              <p className="text-[11px] text-slate-400">สถานะวันนี้</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="bg-rose-50 px-2 py-3">
              <p className="text-xl font-bold text-rose-700">{inProgress}</p>
              <p className="text-[11px] text-rose-600/80">กำลังทำ</p>
            </div>
            <div className="bg-slate-50 px-2 py-3">
              <p className="text-xl font-bold text-slate-800">{urgent}</p>
              <p className="text-[11px] text-slate-500">รอเสนอราคา</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[11px] text-slate-400">แนวโน้ม 7 วัน</p>
            <svg viewBox="0 0 140 40" className="h-10 w-full" aria-hidden>
              <polyline
                fill="none"
                stroke="#e11d48"
                strokeWidth="2"
                points={TREND.map((v, i) => `${i * 22},${38 - v * 8}`).join(" ")}
              />
            </svg>
          </div>
          <div className="mt-2 flex justify-between border-t border-slate-100 pt-3 text-[12px] text-slate-500">
            <span>
              เฉลี่ยปิดงาน <strong className="text-slate-800">1.4 วัน</strong>
            </span>
            <Link href={`${BASE}/jobs`} className="font-medium text-sky-600 hover:underline">
              ดูงานทั้งหมด
            </Link>
          </div>
        </section>
      </div>

      {/* Status strip + recent jobs as table, not cards */}
      <section className="bg-white shadow-[0_1px_2px_rgba(15,39,68,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-[#0b1f3a]">งานล่าสุด</h2>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
            {byStatus.map((s) => (
              <span key={s.status}>
                {s.status} <strong className="text-slate-800">{s.count}</strong>
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-4 py-2.5 font-medium">รหัส</th>
                <th className="px-4 py-2.5 font-medium">ลูกค้า</th>
                <th className="px-4 py-2.5 font-medium">ประเภท</th>
                <th className="px-4 py-2.5 font-medium">ช่าง</th>
                <th className="px-4 py-2.5 font-medium">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {state.jobs.slice(0, 5).map((job) => (
                <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                  <td className="px-4 py-2.5">
                    <Link
                      href={`${BASE}/job?id=${encodeURIComponent(job.id)}`}
                      className="font-medium text-sky-600 hover:underline"
                    >
                      {job.id}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-slate-800">{job.customer}</td>
                  <td className="px-4 py-2.5 text-slate-600">{job.type}</td>
                  <td className="px-4 py-2.5 text-slate-600">{job.tech}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-block px-2 py-0.5 text-[11px] font-medium ${STATUS_PILL[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

const STATUS_PILL: Record<JobStatus, string> = {
  รอเสนอราคา: "bg-amber-50 text-amber-700",
  นัดหมาย: "bg-sky-50 text-sky-700",
  กำลังทำ: "bg-indigo-50 text-indigo-700",
  เสร็จแล้ว: "bg-emerald-50 text-emerald-700",
};
