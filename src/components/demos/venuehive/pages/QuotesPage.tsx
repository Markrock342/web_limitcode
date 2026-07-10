"use client";

import Image from "next/image";
import { cycleQuoteStatus, QUOTE_STYLE, useVenueHive } from "../store";

export function VenueQuotesPage() {
  const { state, setState } = useVenueHive();

  function toggle(id: string) {
    setState((s) => ({
      ...s,
      quotes: s.quotes.map((q) => (q.id === id ? { ...q, status: cycleQuoteStatus(q.status) } : q)),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/food-6.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#4A2A2A]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">ใบเสนอราคา</h1>
            <p className="mt-1 text-sm text-rose-50/90">
              {state.quotes.length} ใบ · กดสถานะเพื่อสลับ ร่าง → รออนุมัติ → อนุมัติแล้ว
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {state.quotes.map((q) => (
          <div
            key={q.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#E8D5D5] bg-white shadow-sm sm:flex-row"
          >
            <div className="relative h-24 w-full shrink-0 sm:h-auto sm:w-32">
              <Image src={q.img} alt="" fill className="object-cover" sizes="128px" />
            </div>
            <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="text-xs text-[#6B3F3F]">{q.id}</p>
                <p className="font-semibold text-[#4A2A2A]">{q.client}</p>
                <p className="text-sm text-slate-600">
                  {q.venue} · ฿{q.amount.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggle(q.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-[#E8D5D5] transition hover:bg-[#F6EEEE] ${QUOTE_STYLE[q.status]}`}
              >
                {q.status} · กดเปลี่ยนสถานะ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
