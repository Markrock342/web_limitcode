"use client";

import Link from "next/link";
import { BASE, useStayNest } from "../store";

export function StayHomePage() {
  const { state } = useStayNest();
  const arrivals = state.stays.filter((s) => s.type === "มาถึง").length;
  const departures = state.stays.filter((s) => s.type === "ออก").length;
  const vacant = state.rooms.filter((r) => r.status === "ว่าง").length;
  const dirty = state.rooms.filter((r) => r.status === "สกปรก").length;
  const hkOpen = state.hk.filter((t) => !t.done).length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        ม็อกอัพหลายหน้า — เช็คอิน/เอาท์ เปลี่ยนสถานะห้อง และติ๊กงานแม่บ้านได้ ข้อมูลเก็บในเบราว์เซอร์
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">บอร์ดวันนี้ · StayNest</h1>
        <p className="mt-1 text-slate-600">ภาพรวม Front Desk · ห้องพัก · แม่บ้าน</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        {[
          { k: "มาถึง", v: String(arrivals) },
          { k: "ออก", v: String(departures) },
          { k: "ห้องว่าง", v: String(vacant) },
          { k: "สกปรก", v: String(dirty) },
          { k: "งานแม่บ้าน", v: String(hkOpen) },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-amber-900">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`${BASE}/front-desk`}
          className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">เปิด Front Desk</p>
          <p className="mt-1 text-sm text-white/80">เช็คอิน / เช็คเอาท์แขกวันนี้</p>
        </Link>
        <Link
          href={`${BASE}/rooms`}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">สถานะห้องพัก</p>
          <p className="mt-1 text-sm text-amber-800/80">กดเพื่อวนสถานะว่าง → มีแขก → สกปรก</p>
        </Link>
      </div>
      {state.toast && (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">{state.toast}</p>
      )}
    </div>
  );
}
