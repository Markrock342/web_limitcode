"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useGuardNest } from "../store";

export function GuardAccountPage() {
  const { state } = useGuardNest();
  const isStaff = state.session.role === "staff";

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="any">
      <div className="mx-auto max-w-3xl space-y-5">
        <header>
          <p className="text-xs font-bold tracking-[0.18em] text-sky-700">GUARDNEST ACCOUNT</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#0b1f3a]">{state.session.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{isStaff ? "บัญชีผู้ดูแลระบบ · เข้าถึงงานและลูกค้าทั้งหมด" : "สมาชิกเดโม · ดูสถานะและสิทธิ์บัญชี"}</p>
        </header>
        <section className="border border-slate-200 bg-white">
          <dl className="grid gap-5 p-6 sm:grid-cols-2">
            <div><dt className="text-xs text-slate-400">ชื่อผู้ใช้</dt><dd className="mt-1 font-semibold text-slate-800">@{state.session.username}</dd></div>
            <div><dt className="text-xs text-slate-400">บทบาท</dt><dd className="mt-1 font-semibold text-slate-800">{isStaff ? "พนักงาน (Staff)" : "สมาชิก (Member)"}</dd></div>
          </dl>
          <div className="flex flex-wrap gap-3 border-t border-slate-100 bg-slate-50 p-5">
            <Link href={isStaff ? `${BASE}/jobs` : BASE} className="bg-[#0b1f3a] px-4 py-2.5 text-sm font-semibold text-white">{isStaff ? "ไปที่รายการงาน" : "กลับหน้าหลัก"}</Link>
            {isStaff && <Link href={`${BASE}/new-job`} className="border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">สร้างงานใหม่</Link>}
          </div>
        </section>
      </div>
    </RequireAuth>
  );
}
