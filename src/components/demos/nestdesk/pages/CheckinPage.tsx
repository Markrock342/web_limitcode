"use client";

import Image from "next/image";
import { CheckCircle2, Search } from "lucide-react";
import { useNestDesk } from "../store";

export function NestCheckinPage() {
  const { state, setState } = useNestDesk();
  const q = state.query.trim();
  const filtered = state.members.filter((m) => q === "" || m.name.includes(q));

  function checkIn(id: string) {
    setState((s) => ({
      ...s,
      members: s.members.map((m) => (m.id === id ? { ...m, checkedIn: true } : m)),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/office-hero.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#2A364C]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">Check-in วันนี้</h1>
            <p className="mt-1 text-sm text-slate-100/90">ค้นหาชื่อสมาชิกแล้วกดเช็คอินที่เคาน์เตอร์</p>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 rounded-2xl border border-[#D5DCE8] bg-white px-4 py-3 shadow-sm">
        <Search className="size-4 text-slate-400" />
        <input
          value={state.query}
          onChange={(e) => setState((s) => ({ ...s, query: e.target.value }))}
          placeholder="ค้นหาชื่อสมาชิก…"
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </label>

      <ul className="space-y-3">
        {filtered.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#D5DCE8] bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-display font-bold text-[#2A364C]">{m.name}</p>
              <p className="text-xs text-slate-500">{m.plan}</p>
            </div>
            {m.checkedIn ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="size-4" /> Check-in แล้ววันนี้
              </span>
            ) : (
              <button
                type="button"
                onClick={() => checkIn(m.id)}
                disabled={m.status === "expired"}
                className="rounded-full bg-[#3D4F6F] px-3.5 py-1.5 text-xs font-bold text-white disabled:opacity-40"
              >
                Check-in
              </button>
            )}
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#D5DCE8] bg-[#F5F7FA] p-6 text-center text-sm text-slate-500">
            ไม่พบสมาชิก
          </p>
        )}
      </ul>
    </div>
  );
}
