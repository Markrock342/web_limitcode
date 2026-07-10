"use client";

import { useState } from "react";
import { useStayNest } from "../store";

export function StayGuestsPage() {
  const { state, setState } = useStayNest();
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});

  function saveNote(id: string) {
    const note = noteDraft[id];
    if (note === undefined) return;
    setState((s) => ({
      ...s,
      guests: s.guests.map((g) => (g.id === id ? { ...g, note } : g)),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">แขก</h1>
        <p className="mt-1 text-sm text-slate-600">โปรไฟล์แขกและความชอบ · บันทึกโน้ตได้</p>
      </div>
      <div className="space-y-2">
        {state.guests.map((g) => (
          <div key={g.id} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">{g.name}</p>
              <p className="text-xs text-slate-500">
                {g.id} · {g.phone} · เข้าพัก {g.visits} ครั้ง
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-500">โน้ต: {g.note || "—"}</p>
            <div className="mt-2 flex gap-2">
              <input
                value={noteDraft[g.id] ?? g.note}
                onChange={(e) => setNoteDraft((d) => ({ ...d, [g.id]: e.target.value }))}
                placeholder="เพิ่ม/แก้โน้ต"
                className="flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={() => saveNote(g.id)}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-amber-100"
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
