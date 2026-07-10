"use client";

import Link from "next/link";
import {
  BASE,
  approvedRevenue,
  openJobsCount,
  slaPercent,
  useGuardNest,
} from "../store";

export function GuardHomePage() {
  const { state } = useGuardNest();
  const open = openJobsCount(state.jobs);
  const revenue = approvedRevenue(state.quotes);
  const sla = slaPercent(state.jobs);
  const pendingQuotes = state.quotes.filter((q) => q.status === "รออนุมัติ").length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        ม็อกอัพหลายหน้า — งานหน้างาน ใบเสนอราคา ปฏิทินทีม และลูกค้า ข้อมูลเก็บในเบราว์เซอร์ กดรีเซ็ตได้ทุกเมื่อ
      </div>

      <div>
        <h1 className="font-display text-2xl font-bold text-emerald-800">Dashboard ทีมหน้างาน</h1>
        <p className="mt-1 text-sm text-slate-600">
          GuardNest Field · บริษัทกำจัดปลวก/แมลง · {state.jobs.length} งานในเดโม
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "งานเปิด", value: String(open), sub: "ยังไม่ปิดงาน" },
          { label: "รายได้เดือนนี้", value: `฿${revenue.toLocaleString()}`, sub: "จากใบเสนอราคาที่อนุมัติ" },
          { label: "SLA ตรงเวลา", value: `${sla}%`, sub: "เป้าหมาย ≥ 90%" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-emerald-700">{k.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-900">{k.value}</p>
            <p className="mt-1 text-xs text-slate-500">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`${BASE}/jobs`}
          className="rounded-2xl bg-emerald-700 p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">ดูงานทั้งหมด</p>
          <p className="mt-1 text-sm text-white/80">{open} งานเปิดอยู่ · กดเพื่ออัปเดตสถานะ</p>
        </Link>
        <Link
          href={`${BASE}/quotes`}
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">ใบเสนอราคา</p>
          <p className="mt-1 text-sm text-emerald-700/80">
            {pendingQuotes > 0 ? `${pendingQuotes} ใบรออนุมัติ` : "อนุมัติ / เปลี่ยนสถานะได้"}
          </p>
        </Link>
        <Link
          href={`${BASE}/calendar`}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold text-emerald-800">ปฏิทินทีม</p>
          <p className="mt-1 text-sm text-slate-600">ดูงานแยกตามวัน จ.–ศ.</p>
        </Link>
        <Link
          href={`${BASE}/customers`}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold text-emerald-800">ลูกค้า</p>
          <p className="mt-1 text-sm text-slate-600">{state.customers.length} ราย · เพิ่มโน้ตหน้างานได้</p>
        </Link>
      </div>
    </div>
  );
}
