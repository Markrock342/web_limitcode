"use client";

import { useState } from "react";
import { useMediSlot } from "../store";

export function MediPatientsPage() {
  const { state, setState } = useMediSlot();
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
      <div>
        <h1 className="font-display text-2xl font-bold text-teal-800">ผู้ป่วย (CMS)</h1>
        <p className="mt-1 text-sm text-slate-600">บันทึกโน้ตแพ้ยา / ติดตามการรักษา</p>
      </div>

      <div className="space-y-2">
        {state.patients.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-slate-500">
                {p.id} · {p.phone}
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-500">โน้ตปัจจุบัน: {p.note || "—"}</p>
            <div className="mt-2 flex gap-2">
              <input
                value={noteDraft[p.id] ?? p.note}
                onChange={(e) => setNoteDraft((d) => ({ ...d, [p.id]: e.target.value }))}
                placeholder="เพิ่ม/แก้โน้ต"
                className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => saveNote(p.id)}
                className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white"
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
