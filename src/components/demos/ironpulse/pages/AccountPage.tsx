"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useIronPulse } from "../store";

export function IronAccountPage() {
  const { state } = useIronPulse();
  const staff = state.session.role === "staff";

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="any">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs font-bold tracking-[0.18em] text-lime-700">IRONPULSE MEMBER AREA</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-zinc-900">{state.session.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{staff ? "Staff workspace · เข้าถึงข้อมูลสโมสรทั้งหมด" : "สมาชิกเดโม · จองคลาสและดูแพ็กเกจที่เหมาะกับคุณ"}</p>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">สถานะบัญชี</p>
            <p className="mt-3 font-display text-xl font-bold text-zinc-900">@{state.session.username}</p>
            <p className="mt-1 text-sm text-slate-600">{staff ? "ผู้ดูแลระบบ (Staff)" : "สมาชิก (Member)"}</p>
            <Link href={staff ? `${BASE}/members` : `${BASE}/book-class`} className="mt-5 inline-block bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-lime-100">
              {staff ? "จัดการสมาชิก" : "จองคลาส"}
            </Link>
          </div>
          <div className="border border-lime-200 bg-lime-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-lime-700">แพ็กเกจสมาชิก</p>
            <div className="mt-3 space-y-2">
              {state.packages.slice(0, 3).map((pkg) => (
                <div key={pkg.id} className="flex items-baseline justify-between gap-3 text-sm text-lime-950">
                  <span className="font-semibold">{pkg.name}</span>
                  <span>฿{pkg.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-lime-800">สมาชิกสามารถสอบถามการเปลี่ยนแพ็กเกจกับพนักงานหน้าเคาน์เตอร์ได้</p>
          </div>
        </section>
      </div>
    </RequireAuth>
  );
}
