"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useBlueRoute } from "../store";

export function BlueAccountPage() {
  const { state } = useBlueRoute();
  return <RequireAuth session={state.session} basePath={BASE} mode="member"><div className="mx-auto max-w-2xl space-y-5"><div><p className="text-xs font-bold tracking-widest text-[#2E4A8A]">BLUE ROUTE ACCOUNT</p><h1 className="font-display text-3xl font-bold text-[#16234A]">บัญชี {state.session.name}</h1><p className="mt-1 text-sm text-[#6B7693]">สถานะเซสชันและข้อมูลสรุประบบเดโม</p></div><section className="rounded-2xl border border-[#E3E7F0] bg-white p-5"><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="text-xs text-[#6B7693]">บทบาท</dt><dd className="mt-1 font-semibold">{state.session.role}</dd></div><div><dt className="text-xs text-[#6B7693]">ชื่อผู้ใช้</dt><dd className="mt-1 font-semibold">@{state.session.username}</dd></div><div><dt className="text-xs text-[#6B7693]">งานในระบบ</dt><dd className="mt-1 font-semibold">{state.jobs.length} งาน</dd></div><div><dt className="text-xs text-[#6B7693]">รถในระบบ</dt><dd className="mt-1 font-semibold">{state.vehicles.length} คัน</dd></div></dl></section></div></RequireAuth>;
}
