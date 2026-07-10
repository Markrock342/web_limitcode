"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useVenueHive } from "../store";

export function VenueVenuesPage() {
  const { state, setState } = useVenueHive();

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/shop-hero.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#4A2A2A]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">ห้องจัดเลี้ยง</h1>
            <p className="mt-1 text-sm text-rose-50/90">{state.venues.length} ฮอลล์ · ความจุและราคาชัดเจน</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.venues.map((v) => (
          <article
            key={v.id}
            className="group overflow-hidden rounded-2xl border border-[#E8D5D5] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={v.img}
                alt={v.name}
                fill
                sizes="300px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#6B3F3F]">
                {v.capacity} ที่นั่ง
              </div>
            </div>
            <div className="p-4">
              <p className="font-display text-lg font-bold text-[#4A2A2A]">{v.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{v.blurb}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {v.tags.map((t) => (
                  <span key={t} className="rounded-full bg-[#F6EEEE] px-2 py-0.5 text-[10px] font-medium text-[#6B3F3F]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-[#6B3F3F]">฿{v.price.toLocaleString()}/วัน</p>
                <Link
                  href={`${BASE}/book`}
                  onClick={() => setState((st) => ({ ...st, venueId: v.id }))}
                  className="rounded-full bg-[#6B3F3F] px-3.5 py-1.5 text-xs font-semibold text-white"
                >
                  ขอจอง
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
