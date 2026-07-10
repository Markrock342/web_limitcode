"use client";

import { useStayNest } from "../store";

export function StayFrontDeskPage() {
  const { state, setState } = useStayNest();

  function checkIn(id: string) {
    const stay = state.stays.find((s) => s.id === id);
    if (!stay) return;
    setState((s) => ({
      ...s,
      stays: s.stays.filter((x) => x.id !== id),
      rooms: s.rooms.map((r) => (r.number === stay.room ? { ...r, status: "มีแขก" as const } : r)),
      toast: `เช็คอิน ${stay.guest} ห้อง ${stay.room} สำเร็จ`,
    }));
  }

  function checkOut(id: string) {
    const stay = state.stays.find((s) => s.id === id);
    if (!stay) return;
    const hkId = `H-${Date.now()}`;
    setState((s) => ({
      ...s,
      stays: s.stays.filter((x) => x.id !== id),
      rooms: s.rooms.map((r) => (r.number === stay.room ? { ...r, status: "สกปรก" as const } : r)),
      hk: [
        { id: hkId, room: stay.room, task: "ทำความสะอาดหลังเช็คเอาท์", done: false },
        ...s.hk,
      ],
      toast: `เช็คเอาท์ ${stay.guest} ห้อง ${stay.room} · ส่งแม่บ้านแล้ว`,
    }));
  }

  const arrivals = state.stays.filter((s) => s.type === "มาถึง");
  const departures = state.stays.filter((s) => s.type === "ออก");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-amber-900">Front Desk</h1>
        <p className="mt-1 text-sm text-slate-600">เช็คอิน / เช็คเอาท์แขกวันนี้</p>
      </div>
      {state.toast && (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
          {state.toast}
          <button
            type="button"
            onClick={() => setState((s) => ({ ...s, toast: null }))}
            className="ml-2 text-emerald-600 underline"
          >
            ปิด
          </button>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <section>
          <p className="mb-2 text-sm font-semibold text-slate-900">มาถึงวันนี้ ({arrivals.length})</p>
          <div className="space-y-2">
            {arrivals.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
                <div>
                  <p className="font-semibold">{s.guest}</p>
                  <p className="text-xs text-slate-500">ห้อง {s.room}</p>
                </div>
                <button
                  type="button"
                  onClick={() => checkIn(s.id)}
                  className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-amber-100"
                >
                  Check-in
                </button>
              </div>
            ))}
            {arrivals.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-center text-sm text-slate-400">
                ไม่มีแขกค้างเช็คอิน
              </p>
            )}
          </div>
        </section>
        <section>
          <p className="mb-2 text-sm font-semibold text-slate-900">ออกวันนี้ ({departures.length})</p>
          <div className="space-y-2">
            {departures.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
                <div>
                  <p className="font-semibold">{s.guest}</p>
                  <p className="text-xs text-slate-500">ห้อง {s.room}</p>
                </div>
                <button
                  type="button"
                  onClick={() => checkOut(s.id)}
                  className="rounded-full border border-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-900"
                >
                  Check-out
                </button>
              </div>
            ))}
            {departures.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-center text-sm text-slate-400">
                ไม่มีแขกค้างเช็คเอาท์
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
