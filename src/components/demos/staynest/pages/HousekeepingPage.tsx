"use client";

import { useStayNest } from "../store";

export function StayHousekeepingPage() {
  const { state, setState } = useStayNest();

  function toggleHk(id: string) {
    setState((s) => {
      const task = s.hk.find((t) => t.id === id);
      const nextDone = task ? !task.done : false;
      return {
        ...s,
        hk: s.hk.map((t) => (t.id === id ? { ...t, done: nextDone } : t)),
        rooms:
          nextDone && task
            ? s.rooms.map((r) =>
                r.number === task.room && r.status === "สกปรก" ? { ...r, status: "ว่าง" as const } : r,
              )
            : s.rooms,
        toast: nextDone && task ? `ห้อง ${task.room} ทำความสะอาดเสร็จ` : s.toast,
      };
    });
  }

  const open = state.hk.filter((t) => !t.done).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">แม่บ้าน</h1>
        <p className="mt-1 text-sm text-slate-600">ค้าง {open} งาน · กดเมื่อทำเสร็จ (ห้องสกปรกจะกลับเป็นว่าง)</p>
      </div>
      <div className="space-y-2">
        {state.hk.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => toggleHk(t.id)}
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
              t.done ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white hover:border-amber-300"
            }`}
          >
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                t.done ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {t.done ? "✓" : ""}
            </span>
            <div>
              <p className={`font-semibold ${t.done ? "text-emerald-800 line-through" : ""}`}>ห้อง {t.room}</p>
              <p className="text-sm text-slate-600">{t.task}</p>
            </div>
            <span className="ml-auto text-[11px] font-semibold text-slate-400">
              {t.done ? "เสร็จแล้ว" : "กดเมื่อทำเสร็จ"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
