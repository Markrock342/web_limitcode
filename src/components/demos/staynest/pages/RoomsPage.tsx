"use client";

import { ROOM_CYCLE, ROOM_STYLE, useStayNest } from "../store";

export function StayRoomsPage() {
  const { state, setState } = useStayNest();

  function cycleRoom(id: string) {
    setState((s) => ({
      ...s,
      rooms: s.rooms.map((r) => {
        if (r.id !== id) return r;
        const next = ROOM_CYCLE[(ROOM_CYCLE.indexOf(r.status) + 1) % ROOM_CYCLE.length];
        return { ...r, status: next };
      }),
    }));
  }

  const counts = ROOM_CYCLE.map((status) => ({
    status,
    n: state.rooms.filter((r) => r.status === status).length,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">ห้องพัก</h1>
        <p className="mt-1 text-sm text-slate-600">กดการ์ดเพื่อวนสถานะ ว่าง → มีแขก → สกปรก → ซ่อมบำรุง</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {counts.map((c) => (
          <span key={c.status} className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${ROOM_STYLE[c.status]}`}>
            {c.status} · {c.n}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {state.rooms.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => cycleRoom(r.id)}
            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${ROOM_STYLE[r.status]}`}
          >
            <p className="font-display text-xl font-bold">{r.number}</p>
            <p className="mt-0.5 text-xs opacity-80">{r.type}</p>
            <p className="mt-3 text-xs font-semibold">{r.status}</p>
            <p className="mt-1 text-[10px] opacity-70">กดเพื่อเปลี่ยนสถานะ</p>
          </button>
        ))}
      </div>
    </div>
  );
}
