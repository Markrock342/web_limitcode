"use client";

import { Package, TrendingUp } from "lucide-react";
import { useQuickDrop } from "../store";

export function QuickSummaryPage() {
  const { state } = useQuickDrop();
  const total = state.orders.length;
  const done = state.orders.filter((o) => o.status === "done").length;
  const active = state.orders.filter((o) => o.status === "picking" || o.status === "delivering").length;
  const online = state.couriers.filter((c) => c.online).length;

  const kpis = [
    { label: "ออเดอร์ทั้งหมด", value: String(total) },
    { label: "กำลังส่ง / จัดของ", value: String(active) },
    { label: "ส่งสำเร็จ", value: String(done) },
    { label: "ไรเดอร์ออนไลน์", value: String(online) },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-800">สรุปวัน</h1>
        <p className="mt-1 text-sm text-slate-600">KPI ประจำวันจากข้อมูลเดโม</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{k.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-indigo-800">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
        <TrendingUp className="mt-0.5 size-5 shrink-0 text-indigo-600" />
        <div>
          <p className="font-display font-bold text-indigo-900">สรุปการดำเนินงานวันนี้</p>
          <p className="mt-1 text-sm text-indigo-800/80">
            ส่งสำเร็จ {done} จาก {total} ออเดอร์ · ไรเดอร์พร้อมงาน {online} คน · กดเมนูอื่นเพื่อจัดการคิวต่อ
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#ff6b4a]">
            <Package className="size-3.5" /> QuickDrop · เดโมจัดส่ง
          </p>
        </div>
      </div>
    </div>
  );
}
