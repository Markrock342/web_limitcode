"use client";

import Image from "next/image";
import type { EventStatus } from "../store";
import { EVENT_STYLE, useVenueHive } from "../store";

const FILTERS: Array<EventStatus | "ทั้งหมด"> = ["ทั้งหมด", "รออนุมัติ", "อนุมัติแล้ว", "ปฏิเสธ"];

export function VenueEventsPage() {
  const { state, setState } = useVenueHive();
  const filtered =
    state.eventFilter === "ทั้งหมด"
      ? state.events
      : state.events.filter((e) => e.status === state.eventFilter);

  function setStatus(id: string, status: EventStatus) {
    setState((s) => ({
      ...s,
      events: s.events.map((e) => (e.id === id ? { ...e, status } : e)),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/food-4.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#4A2A2A]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">ปฏิทินอีเวนต์</h1>
            <p className="mt-1 text-sm text-rose-50/90">{filtered.length} รายการ · อนุมัติ / ปฏิเสธได้ทันที</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setState((s) => ({ ...s, eventFilter: f }))}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              state.eventFilter === f ? "bg-[#6B3F3F] text-white" : "bg-white text-[#6B3F3F] ring-1 ring-[#E8D5D5]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E8D5D5] bg-[#F6EEEE] px-4 py-12 text-center text-sm text-slate-500">
            ไม่มีอีเวนต์ในตัวกรองนี้
          </div>
        ) : (
          filtered.map((e) => (
            <article
              key={e.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#E8D5D5] bg-white shadow-sm sm:flex-row"
            >
              <div className="relative h-28 w-full shrink-0 sm:h-auto sm:w-40">
                <Image src={e.img} alt="" fill className="object-cover" sizes="160px" />
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display font-bold text-[#4A2A2A]">{e.client}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {e.venueName} · {e.date} · {e.guests} คน
                  </p>
                  <p className="text-xs text-slate-400">
                    {e.id} · {e.phone}
                    {e.note ? ` · ${e.note}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${EVENT_STYLE[e.status]}`}>
                    {e.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStatus(e.id, "อนุมัติแล้ว")}
                    className="rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    อนุมัติ
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(e.id, "ปฏิเสธ")}
                    className="rounded-full bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    ปฏิเสธ
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
