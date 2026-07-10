"use client";

import Image from "next/image";
import { useState } from "react";
import { useFreshFold } from "../store";

export function FreshCustomersPage() {
  const { state, setState } = useFreshFold();
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});

  function saveNote(id: string) {
    const note = noteDraft[id];
    if (note === undefined) return;
    setState((s) => ({
      ...s,
      customers: s.customers.map((c) => (c.id === id ? { ...c, note } : c)),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/food-5.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#1A3D34]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">ลูกค้า</h1>
            <p className="mt-1 text-sm text-emerald-50/90">{state.customers.length} คน · บันทึกโน้ตความชอบ / จุดรับ</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {state.customers.map((c) => (
          <div key={c.id} className="rounded-2xl border border-[#C8DED6] bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display font-bold text-[#1A3D34]">{c.name}</p>
              <p className="text-xs text-slate-500">
                {c.id} · {c.phone}
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-500">{c.address}</p>
            <p className="mt-1 text-xs text-slate-400">โน้ตปัจจุบัน: {c.note || "—"}</p>
            <div className="mt-2 flex gap-2">
              <input
                value={noteDraft[c.id] ?? c.note}
                onChange={(e) => setNoteDraft((d) => ({ ...d, [c.id]: e.target.value }))}
                placeholder="เพิ่ม/แก้โน้ต"
                className="flex-1 rounded-lg border border-[#C8DED6] px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#2C5F4F]/30"
              />
              <button
                type="button"
                onClick={() => saveNote(c.id)}
                className="rounded-lg bg-[#2C5F4F] px-3 py-1.5 text-xs font-semibold text-white"
              >
                บันทึก
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
