"use client";

import Image from "next/image";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useMediSlot } from "../store";

const EXTRA_BLOCKS = ["08:00–12:00", "12:00–16:00", "16:00–20:00"];
const DOCTOR_IMG = ["/img/spa-2.jpg", "/img/spa-3.jpg", "/img/spa-4.jpg"];

export function MediSchedulePage() {
  const { state, setState } = useMediSlot();

  function toggleActive(id: string) {
    setState((s) => ({
      ...s,
      schedule: s.schedule.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    }));
  }

  function toggleBlock(id: string, block: string) {
    setState((s) => ({
      ...s,
      schedule: s.schedule.map((d) => {
        if (d.id !== id) return d;
        const has = d.blocks.includes(block);
        return {
          ...d,
          blocks: has ? d.blocks.filter((b) => b !== block) : [...d.blocks, block].sort(),
        };
      }),
    }));
  }

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="staff">
      <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/spa-4.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#0A4F4F]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">ตารางแพทย์</h1>
            <p className="mt-1 text-sm text-teal-50/90">เปิด/ปิดรับนัด และปรับบล็อกเวลา</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {state.schedule.map((s, i) => (
          <div
            key={s.id}
            className={`overflow-hidden rounded-2xl border bg-white ${
              s.active ? "border-[#D5E8E6]" : "border-slate-100 opacity-75"
            }`}
          >
            <div className="relative h-28">
              <Image src={DOCTOR_IMG[i % DOCTOR_IMG.length]} alt="" fill className="object-cover" sizes="300px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A4F4F]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <div>
                  <p className="font-display text-sm font-bold text-white">{s.doctor}</p>
                  <p className="text-[11px] text-white/80">{s.specialty}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActive(s.id)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    s.active ? "bg-emerald-400 text-emerald-950" : "bg-white/90 text-slate-600"
                  }`}
                >
                  {s.active ? "เปิดรับ" : "ปิดรับ"}
                </button>
              </div>
            </div>
            <div className="space-y-1.5 p-3">
              {EXTRA_BLOCKS.map((b) => {
                const on = s.blocks.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBlock(s.id, b)}
                    className={`block w-full rounded-lg px-2 py-1.5 text-left text-xs font-medium ${
                      on ? "bg-[#E6F4F3] text-[#0F6B6B]" : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    {b} {on ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      </div>
    </RequireAuth>
  );
}
