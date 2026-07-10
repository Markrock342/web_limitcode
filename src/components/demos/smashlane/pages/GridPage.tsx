"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { BASE, COURTS, DATES, HOURS, bookingCode, fmtDay, tierFor, useSmashLane } from "../store";
import Link from "next/link";

export function SmashGridPage() {
  const search = useSearchParams();
  const focusHour = search.get("hour");
  const { state, setState } = useSmashLane();
  const date = DATES[state.dateIdx];
  const [target, setTarget] = useState<{ hour: number; court: number } | null>(
    focusHour ? { hour: Number(focusHour), court: 0 } : null,
  );

  const dayBookings = useMemo(
    () => state.bookings.filter((b) => b.date === date && b.paid),
    [state.bookings, date],
  );

  function occupied(hour: number, court: number) {
    return dayBookings.find((b) => b.hour === hour && b.court === court) ?? null;
  }
  function locked(hour: number, court: number) {
    return state.locked.includes(`${date}|${court}|${hour}`);
  }
  const queue = dayBookings.filter((b) => b.court === null);
  const waiting = target ? queue.filter((b) => b.hour === target.hour) : [];

  function assign(bookingId: string, court: number) {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === bookingId ? { ...b, court } : b)),
    }));
    setTarget(null);
  }

  function walkIn(hour: number, court: number) {
    const code = bookingCode(date);
    setState((s) => ({
      ...s,
      bookings: [
        ...s.bookings,
        {
          id: `walkin-${Date.now()}`,
          code,
          date,
          hour,
          price: tierFor(hour).price,
          tier: tierFor(hour).id,
          name: "Walk-in หน้าเคาน์เตอร์",
          phone: "-",
          court,
          paid: true,
          walkin: true,
        },
      ],
    }));
    setTarget(null);
  }

  function toggleLock(hour: number, court: number) {
    const key = `${date}|${court}|${hour}`;
    setState((s) => ({
      ...s,
      locked: s.locked.includes(key) ? s.locked.filter((k) => k !== key) : [...s.locked, key],
    }));
    setTarget(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#3953A4]">ตารางคอร์ท</h1>
          <p className="mt-1 text-sm text-slate-600">{fmtDay(date)} · คลิกช่องว่างเพื่อจัดคิว / Walk-in / ล็อก</p>
        </div>
        <Link href={`${BASE}/admin`} className="text-sm font-semibold text-[#3953A4]">
          ← คิวรอจัด
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3">
        <div className="min-w-[720px]" style={{ display: "grid", gridTemplateColumns: `64px repeat(${COURTS}, minmax(0,1fr))`, gap: 4 }}>
          <div className="rounded bg-slate-100 p-2 text-[10px] font-semibold text-slate-500">ชม.\คอร์ท</div>
          {Array.from({ length: COURTS }, (_, i) => (
            <div key={i} className="rounded bg-slate-100 p-2 text-center text-[10px] font-semibold text-slate-500">
              {i + 1}
            </div>
          ))}
          {HOURS.map((hour) => (
            <div key={hour} className="contents">
              <div className="flex items-center rounded bg-slate-50 px-2 text-xs font-semibold text-slate-600">
                {String(hour).padStart(2, "0")}:00
              </div>
              {Array.from({ length: COURTS }, (_, i) => {
                const court = i + 1;
                const occ = occupied(hour, court);
                const isLock = locked(hour, court);
                return (
                  <button
                    key={`${hour}-${court}`}
                    type="button"
                    onClick={() => setTarget({ hour, court })}
                    className={`min-h-12 rounded border p-1 text-left text-[10px] ${
                      isLock
                        ? "border-slate-300 bg-slate-200"
                        : occ
                          ? "border-[#3953A4]/30 bg-[#3953A4] text-white"
                          : "border-emerald-200 bg-emerald-50"
                    }`}
                  >
                    {isLock ? (
                      <span className="flex items-center justify-center gap-0.5 font-semibold">
                        <Lock className="size-3" />
                      </span>
                    ) : occ ? (
                      <span className="block truncate font-semibold">{occ.walkin ? "Walk-in" : occ.name}</span>
                    ) : (
                      <span className="block text-center font-semibold text-emerald-700">ว่าง</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {target && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-[#3953A4]">
              {target.court === 0
                ? `เลือกคอร์ทว่าง · ${String(target.hour).padStart(2, "0")}:00`
                : `คอร์ท ${target.court} · ${String(target.hour).padStart(2, "0")}:00`}
            </h3>

            {target.court > 0 && occupied(target.hour, target.court) && (
              <div className="mt-3 space-y-3">
                <p className="text-sm">
                  {occupied(target.hour, target.court)!.name} · {occupied(target.hour, target.court)!.code}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const id = occupied(target.hour, target.court)!.id;
                    setState((s) => ({
                      ...s,
                      bookings: s.bookings.map((b) => (b.id === id ? { ...b, court: null } : b)),
                    }));
                    setTarget(null);
                  }}
                  className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600"
                >
                  ถอดกลับเข้าคิว
                </button>
              </div>
            )}

            {target.court > 0 && !occupied(target.hour, target.court) && (
              <div className="mt-4 space-y-2">
                {locked(target.hour, target.court) ? (
                  <button type="button" onClick={() => toggleLock(target.hour, target.court)} className="w-full rounded-xl border px-4 py-3 text-sm font-semibold">
                    ปลดล็อก
                  </button>
                ) : (
                  <>
                    {waiting.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => assign(b.id, target.court)}
                        className="flex w-full justify-between rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm"
                      >
                        <span>{b.name}</span>
                        <span className="font-bold text-[#EB8824]">จัดที่นี่</span>
                      </button>
                    ))}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button type="button" onClick={() => walkIn(target.hour, target.court)} className="rounded-xl bg-[#3953A4] py-2.5 text-sm font-semibold text-white">
                        Walk-in
                      </button>
                      <button type="button" onClick={() => toggleLock(target.hour, target.court)} className="rounded-xl border py-2.5 text-sm font-semibold">
                        ล็อกรายเดือน
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {target.court === 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {Array.from({ length: COURTS }, (_, i) => {
                  const court = i + 1;
                  const busy = !!occupied(target.hour, court) || locked(target.hour, court);
                  return (
                    <button
                      key={court}
                      type="button"
                      disabled={busy}
                      onClick={() => setTarget({ hour: target.hour, court })}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 py-2 text-sm font-bold disabled:opacity-30"
                    >
                      {court}
                    </button>
                  );
                })}
              </div>
            )}

            <button type="button" onClick={() => setTarget(null)} className="mt-4 w-full rounded-full border py-2.5 text-sm font-semibold text-slate-600">
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
