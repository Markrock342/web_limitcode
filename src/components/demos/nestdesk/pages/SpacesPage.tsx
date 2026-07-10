"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useNestDesk } from "../store";

export function NestSpacesPage() {
  const { state, setState } = useNestDesk();

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/work-1.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#2A364C]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">แคตตาล็อกพื้นที่</h1>
            <p className="mt-1 text-sm text-slate-100/90">Hot Desk และห้องประชุม · ความจุ ราคา ความว่าง</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {state.spaces.map((s) => (
          <article
            key={s.id}
            className="overflow-hidden rounded-2xl border border-[#D5DCE8] bg-white shadow-sm"
          >
            <div className="relative aspect-[16/10]">
              <Image src={s.img} alt={s.name} fill className="object-cover" sizes="450px" />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#3D4F6F]">
                {s.type === "hotdesk" ? "Hot Desk" : "Meeting"}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#2A364C]">{s.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.blurb}</p>
                </div>
                <p className="shrink-0 text-right">
                  <span className="font-display text-lg font-bold text-[#3D4F6F]">฿{s.price.toLocaleString()}</span>
                  <span className="block text-[10px] text-slate-400">/{s.unit}</span>
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-[#EEF1F6] px-2.5 py-1 font-medium">ความจุ {s.capacity}</span>
                <span className="rounded-full bg-[#EEF1F6] px-2.5 py-1 font-medium">
                  ว่าง {s.available}/{s.total}
                </span>
              </div>
              <Link
                href={`${BASE}/book`}
                onClick={() => setState((st) => ({ ...st, bookSpaceId: s.id }))}
                className="mt-4 inline-flex rounded-full bg-[#3D4F6F] px-4 py-2 text-xs font-semibold text-white"
              >
                จองพื้นที่นี้
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
