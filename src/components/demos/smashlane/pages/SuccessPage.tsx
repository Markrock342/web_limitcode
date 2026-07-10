"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { BASE, useSmashLane } from "../store";

export function SmashSuccessPage() {
  const { state } = useSmashLane();

  if (!state.lastCode) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">ยังไม่มีการจองล่าสุด</p>
        <Link href={`${BASE}/book`} className="mt-4 inline-flex rounded-full bg-[#3953A4] px-5 py-2.5 text-sm font-semibold text-white">
          ไปจองคอร์ท
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500 text-white">
        <Check className="size-6" />
      </div>
      <h1 className="mt-4 font-display text-2xl font-bold text-emerald-800">จองสำเร็จ!</h1>
      <p className="mt-2 text-sm text-emerald-900/80">รหัสจอง</p>
      <p className="mt-1 font-display text-2xl font-bold tracking-wide text-[#3953A4]">{state.lastCode}</p>
      <p className="mt-3 text-sm text-emerald-900/75">ทางสนามจะจัดเลขคอร์ทให้ — ไปลองจัดที่หลังบ้านได้เลย</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href={`${BASE}/admin`} className="rounded-full bg-[#EB8824] px-5 py-2.5 text-sm font-semibold text-white">
          ไปจัดคอร์ท
        </Link>
        <Link href={`${BASE}/book`} className="rounded-full border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800">
          จองรอบใหม่
        </Link>
      </div>
    </div>
  );
}
