"use client";

import { useIronPulse } from "../store";

export function IronReportsPage() {
  const { state } = useIronPulse();
  const active = state.members.filter((m) => m.status === "active").length;
  const expired = state.members.filter((m) => m.status === "expired").length;
  const checkedIn = state.members.filter((m) => m.checkedIn).length;
  const totalSeats = state.classes.reduce((n, c) => n + c.seats, 0);
  const bookedSeats = state.classes.reduce((n, c) => n + c.booked, 0);
  const fillRate = totalSeats ? Math.round((bookedSeats / totalSeats) * 100) : 0;
  const revenue = state.packages.reduce((n, p) => n + p.price, 0);
  const popular = state.packages.find((p) => p.popular);

  const kpis = [
    { k: "สมาชิกใช้งาน", v: String(active), hint: `หมดอายุ ${expired} คน` },
    { k: "Check-in วันนี้", v: String(checkedIn), hint: `จาก ${state.members.length} คน` },
    { k: "อัตราที่นั่งคลาส", v: `${fillRate}%`, hint: `${bookedSeats}/${totalSeats} ที่นั่ง` },
    { k: "มูลค่าแพ็กเกจ", v: `฿${revenue.toLocaleString()}`, hint: popular ? `Popular: ${popular.name}` : "ยังไม่ตั้ง Popular" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-lime-800">รายงาน</h1>
        <p className="mt-1 text-sm text-slate-600">KPI สรุปจากข้อมูลม็อกในเบราว์เซอร์</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {kpis.map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-3xl font-bold text-lime-800">{x.v}</p>
            <p className="mt-2 text-xs text-slate-500">{x.hint}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-lime-200 bg-lime-50 p-4 text-sm text-lime-800">
        ตัวเลขอัปเดตตามการต่ออายุ จองคลาส และ Check-in ในหน้าอื่น ๆ ของเดโมนี้
      </div>
    </div>
  );
}
