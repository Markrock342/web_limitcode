"use client";

import Image from "next/image";
import { useShineAuto } from "../store";

export function ShineBaysPage() {
  const { state, setState } = useShineAuto();

  function toggleBusy(id: string) {
    setState((s) => ({
      ...s,
      bays: s.bays.map((b) => (b.id === id ? { ...b, busy: !b.busy } : b)),
    }));
  }

  function toggleSlot(id: string, slot: string) {
    setState((s) => ({
      ...s,
      bays: s.bays.map((b) => {
        if (b.id !== id) return b;
        const has = b.slots.includes(slot);
        return {
          ...b,
          slots: has ? b.slots.filter((x) => x !== slot) : [...b.slots, slot].sort(),
        };
      }),
    }));
  }

  const ALL_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/cars/polish.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#142840]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">ตารางเบย์</h1>
            <p className="mt-1 text-sm text-sky-50/90">เปิด/ปิดเบย์ และติ๊กช่วงเวลาที่จองแล้ว</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {state.bays.map((b) => (
          <div
            key={b.id}
            className={`overflow-hidden rounded-2xl border bg-white ${
              b.busy ? "border-[#D5DEEA]" : "border-emerald-200"
            }`}
          >
            <div className="relative h-32">
              <Image src={b.img} alt="" fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142840]/85 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <div>
                  <p className="font-display font-bold text-white">{b.name}</p>
                  <p className="text-[11px] text-white/80">{b.slots.length} สล็อตจองแล้ว</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleBusy(b.id)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    b.busy ? "bg-amber-400 text-amber-950" : "bg-emerald-400 text-emerald-950"
                  }`}
                >
                  {b.busy ? "มีงาน" : "ว่าง"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 p-3">
              {ALL_SLOTS.map((slot) => {
                const on = b.slots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleSlot(b.id, slot)}
                    className={`rounded-lg py-2 text-[11px] font-semibold ${
                      on ? "bg-[#1F3A5F] text-white" : "bg-[#E8EEF5] text-slate-500"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
