"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, PLANS, useNovaOracle } from "../store";

export function NovaAccountPage() {
  const { state } = useNovaOracle();
  const staff = state.session.role === "staff";

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="any">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-xs font-bold tracking-[0.18em] text-violet-700">NOVAORACLE ACCOUNT</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">{state.session.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{staff ? "Staff CMS · จัดการผู้ใช้ เนื้อหา และเครดิต" : "User plan overview · ดูสิทธิ์และแพ็กเกจ NovaOracle"}</p>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">บัญชีเดโม</p>
            <p className="mt-3 font-display text-xl font-bold text-slate-900">@{state.session.username}</p>
            <p className="mt-1 text-sm text-slate-600">{staff ? "ผู้ดูแล CMS (Staff)" : "ผู้ใช้ผลิตภัณฑ์ (User)"}</p>
            <Link href={staff ? `${BASE}/users` : BASE} className="mt-5 inline-block bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white">
              {staff ? "เปิด CMS" : "กลับหน้าผลิตภัณฑ์"}
            </Link>
          </div>
          <div className="border border-violet-200 bg-violet-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Plan ที่พร้อมใช้งาน</p>
            <div className="mt-3 space-y-2">
              {PLANS.map((plan) => <div key={plan.id} className="flex justify-between gap-3 text-sm text-violet-950"><span className="font-semibold">{plan.id}</span><span>{plan.price}/เดือน</span></div>)}
            </div>
          </div>
        </section>
      </div>
    </RequireAuth>
  );
}
