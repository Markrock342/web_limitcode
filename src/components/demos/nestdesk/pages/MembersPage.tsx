"use client";

import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { useNestDesk } from "../store";

export function NestMembersPage() {
  const { state, setState } = useNestDesk();

  function renew(id: string) {
    setState((s) => ({
      ...s,
      members: s.members.map((m) =>
        m.id === id
          ? { ...m, status: "active" as const, expiry: "11/10/2569", plan: m.plan.includes("Day") ? "Monthly Desk" : m.plan }
          : m,
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/cowork/team.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#2A364C]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">สมาชิก</h1>
            <p className="mt-1 text-sm text-slate-100/90">{state.members.length} คน · กดต่ออายุเมื่อหมดอายุ</p>
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {state.members.map((m) => (
          <li
            key={m.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#D5DCE8] bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-display font-bold text-[#2A364C]">{m.name}</p>
              <p className="text-xs text-slate-500">
                {m.plan} · หมดอายุ {m.expiry}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  m.status === "active" ? "bg-emerald-50 text-emerald-800" : "bg-orange-50 text-orange-700"
                }`}
              >
                {m.status === "active" ? "ใช้งาน" : "หมดอายุ"}
              </span>
              {m.checkedIn && (
                <span className="rounded-full bg-[#EEF1F6] px-2.5 py-1 text-[11px] font-semibold text-[#3D4F6F]">
                  Check-in แล้ว
                </span>
              )}
              {m.status === "expired" && (
                <button
                  type="button"
                  onClick={() => renew(m.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-[#3D4F6F] px-3 py-1.5 text-xs font-bold text-white"
                >
                  <RefreshCw className="size-3" /> ต่ออายุ
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
