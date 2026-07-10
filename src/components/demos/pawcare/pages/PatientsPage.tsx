"use client";

import Image from "next/image";
import { useState } from "react";
import { usePawCare } from "../store";

export function PawPatientsPage() {
  const { state, setState } = usePawCare();
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});

  function saveNote(id: string) {
    const note = noteDraft[id];
    if (note === undefined) return;
    setState((s) => ({
      ...s,
      patients: s.patients.map((p) => (p.id === id ? { ...p, note } : p)),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/spa-4.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#3D3260]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">สัตว์เลี้ยง (CMS)</h1>
            <p className="mt-1 text-sm text-violet-50/90">ประวัติสัตว์เลี้ยง บันทึกโน้ตแพ้อาหาร / ติดตามการรักษา</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.patients.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-[#E4DDF0] bg-white shadow-sm">
            <div className="relative h-36">
              <Image src={p.img} alt={p.pet} fill className="object-cover" sizes="300px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3260]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-display text-lg font-bold text-white">{p.pet}</p>
                <p className="text-[11px] text-white/80">
                  {p.species} · {p.breed}
                </p>
              </div>
            </div>
            <div className="p-3.5">
              <p className="text-xs text-slate-500">
                {p.id} · {p.owner} · {p.phone}
              </p>
              <p className="mt-1 text-xs text-slate-500">โน้ต: {p.note || "—"}</p>
              <div className="mt-2 flex gap-2">
                <input
                  value={noteDraft[p.id] ?? p.note}
                  onChange={(e) => setNoteDraft((d) => ({ ...d, [p.id]: e.target.value }))}
                  placeholder="เพิ่ม/แก้โน้ต"
                  className="flex-1 rounded-lg border border-[#E4DDF0] px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#5B4B8A]/40"
                />
                <button
                  type="button"
                  onClick={() => saveNote(p.id)}
                  className="rounded-lg bg-[#5B4B8A] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
