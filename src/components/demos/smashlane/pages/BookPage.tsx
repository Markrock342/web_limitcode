"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import {
  BASE,
  DATES,
  HOURS,
  type CourtZone,
  courtsForZone,
  ensureDateSeeded,
  fmtDay,
  priceForZone,
  useSmashLane,
  zoneLabel,
} from "../store";

export function SmashBookPage() {
  const { state, setState } = useSmashLane();
  const date = DATES[state.dateIdx];
  const dayBookings = state.bookings.filter((b) => b.date === date && b.paid && b.status === "confirmed");

  function freeAt(hour: number, zone: CourtZone) {
    const booked = new Set(dayBookings.filter((booking) => booking.hour === hour).map((booking) => booking.court));
    const locked = new Set(
      state.locked
        .filter((item) => item.startsWith(`${date}|`) && item.endsWith(`|${hour}`))
        .map((item) => Number(item.split("|")[1])),
    );
    return courtsForZone(zone).filter((court) => !booked.has(court) && !locked.has(court)).length;
  }
  function toggleHour(h: number) {
    if (freeAt(h, state.selectedZone) <= 0 && !state.selectedHours.includes(h)) return;
    setState((s) => ({
      ...s,
      selectedHours: s.selectedHours.includes(h)
        ? s.selectedHours.filter((x) => x !== h)
        : [...s.selectedHours, h].sort((a, b) => a - b),
    }));
  }

  const total = state.selectedHours.reduce(
    (sum, hour) => sum + priceForZone(hour, state.selectedZone, freeAt(hour, "large") === 0).price,
    0,
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#3953A4]">จองคอร์ท</h1>
        <p className="mt-1 text-sm text-slate-600">เลือกวันและช่วงเวลา — ไม่ต้องเลือกเลขคอร์ท</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {DATES.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setState((s) => ensureDateSeeded(s, i))}
            className={`min-w-[88px] shrink-0 rounded-2xl border px-3 py-2.5 text-left ${
              i === state.dateIdx ? "border-[#3953A4] bg-[#3953A4] text-white" : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-[11px] opacity-80">{i === 0 ? "วันนี้" : fmtDay(d).split(" ")[0]}</p>
            <p className="font-display text-sm font-bold">{fmtDay(d).replace(/^.*\s/, "")}</p>
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">เลือกโซนสนาม</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">เลือกสนามที่สะดวก ระบบคำนวณสิทธิ์โปรให้ตามที่ว่างจริง</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#3953A4]/10 px-2.5 py-1 text-xs font-semibold text-[#3953A4]">08:00–17:00</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {(["small", "large"] as const).map((zone) => {
            const selected = state.selectedZone === zone;
            return (
              <button
                key={zone}
                type="button"
                onClick={() => setState((current) => ({ ...current, selectedZone: zone }))}
                className={`min-h-14 rounded-xl border px-3 py-2 text-left transition-colors ${
                  selected ? "border-[#3953A4] bg-[#3953A4] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#3953A4]/50"
                }`}
              >
                <span className="block text-sm font-bold">{zoneLabel(zone)}</span>
                <span className={`mt-0.5 block text-xs ${selected ? "text-white/75" : "text-slate-500"}`}>
                  {zone === "small" ? "คอร์ท 1–7" : "คอร์ท 8–25"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {state.selectedZone === "small" && state.selectedHours.some((hour) => hour < 17 && freeAt(hour, "large") === 0) ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
          <p className="text-sm font-bold">โปรสนามใหญ่เต็ม ใช้กับสนามเล็กได้</p>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800">ในช่วงเวลาที่เลือก สนาม 8–25 เต็มแล้ว จึงใช้ราคาโปรให้สนาม 1–7 อัตโนมัติ</p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {HOURS.map((h) => {
          const free = freeAt(h, state.selectedZone);
          const selected = state.selectedHours.includes(h);
          const full = free <= 0;
          const price = priceForZone(h, state.selectedZone, freeAt(h, "large") === 0);
          return (
            <button
              key={h}
              type="button"
              disabled={full && !selected}
              onClick={() => toggleHour(h)}
              className={`flex w-full items-center justify-between border-t border-slate-100 px-4 py-3 text-left first:border-t-0 ${
                selected ? "bg-[#3953A4]/8" : full ? "bg-slate-50 text-slate-400" : "hover:bg-orange-50/50"
              }`}
            >
              <span>
                <span className="font-semibold">
                  {String(h).padStart(2, "0")}:00–{String(h + 1).padStart(2, "0")}:00
                </span>
                <span className={`ml-2 text-xs ${price.id === "large-full-promo" ? "font-semibold text-emerald-700" : "text-slate-400"}`}>{price.label}</span>
              </span>
              <span className="flex items-center gap-3 text-sm">
                <span className="font-bold text-[#EB8824]">฿{price.price}</span>
                <span className={`text-xs font-semibold ${full ? "text-rose-500" : "text-emerald-600"}`}>
                  {full ? "เต็ม" : `ว่าง ${free}`}
                </span>
                <span
                  className={`grid size-5 place-items-center rounded border ${
                    selected ? "border-[#3953A4] bg-[#3953A4] text-white" : "border-slate-300"
                  }`}
                >
                  {selected && <Check className="size-3" />}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          {state.selectedHours.length
            ? `${zoneLabel(state.selectedZone)} · ${state.selectedHours.length} ชม. · รวม ฿${total.toLocaleString()}`
            : "เลือกอย่างน้อย 1 ช่วงเวลา"}
        </p>
        <Link
          href={`${BASE}/checkout`}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white ${
            state.selectedHours.length ? "bg-[#3953A4]" : "pointer-events-none bg-slate-300"
          }`}
        >
          ไปชำระเงิน
        </Link>
      </div>
    </div>
  );
}
