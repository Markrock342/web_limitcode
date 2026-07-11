"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BASE, DATE_CHIPS, useVenueHive } from "../store";

export function VenueBookPage() {
  const { state, setState } = useVenueHive();
  const router = useRouter();
  const venue = state.venues.find((v) => v.id === state.venueId) ?? state.venues[0];

  function confirmBooking() {
    if (!state.session.loggedIn) {
      router.push(`${BASE}/login`);
      return;
    }
    if (!state.client.trim() || state.guests < 1) return;
    const id = `EV-${200 + state.events.length}`;
    const client = state.client.trim();
    setState((s) => ({
      ...s,
      events: [
        {
          id,
          venueId: venue.id,
          venueName: venue.name,
          client,
          phone: s.phone || "-",
          date: s.dateChip,
          guests: s.guests,
          note: s.note,
          status: "รออนุมัติ",
          img: venue.img,
        },
        ...s.events,
      ],
      quotes: [
        {
          id: `Q-${600 + s.quotes.length}`,
          client,
          venue: venue.name,
          amount: venue.price + Math.round(s.guests * 120),
          status: "ร่าง",
          img: venue.img,
        },
        ...s.quotes,
      ],
      lastBookedId: id,
      client: "",
      phone: "",
      note: "",
    }));
    router.push(`${BASE}/confirm`);
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[21/8] min-h-[140px] sm:aspect-[3/1]">
          <Image src={venue.img} alt={venue.name} fill priority className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A2A2A] via-[#4A2A2A]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-rose-100/90">ขอจอง · VenueHive</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{venue.name}</h1>
            <p className="mt-1 text-sm text-rose-50/90">
              {venue.blurb} · {venue.capacity} ที่ · ฿{venue.price.toLocaleString()}/วัน
            </p>
          </div>
        </div>
      </div>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#4A2A2A]">เลือกฮอลล์</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.venues.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, venueId: v.id }))}
              className={`flex overflow-hidden rounded-2xl border text-left transition ${
                state.venueId === v.id
                  ? "border-[#6B3F3F] bg-[#F6EEEE] ring-2 ring-[#6B3F3F]/25"
                  : "border-slate-200 bg-white hover:border-[#6B3F3F]/40"
              }`}
            >
              <span className="relative block h-[5.5rem] w-24 shrink-0">
                <Image src={v.img} alt="" fill className="object-cover" sizes="96px" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-3">
                <span className="font-display text-sm font-bold text-[#4A2A2A]">{v.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">
                  {v.capacity} ที่ · ฿{(v.price / 1000).toFixed(0)}k
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[#E8D5D5] bg-white p-5">
          <p className="text-sm font-semibold text-[#4A2A2A]">เลือกวันจัดงาน</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DATE_CHIPS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setState((st) => ({ ...st, dateChip: d }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.dateChip === d ? "bg-[#6B3F3F] text-white" : "bg-[#F6EEEE] text-[#6B3F3F]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#4A2A2A]">จำนวนแขกโดยประมาณ</p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setState((st) => ({ ...st, guests: Math.max(10, st.guests - 10) }))}
              className="size-10 rounded-xl bg-[#F6EEEE] text-lg font-bold text-[#6B3F3F]"
            >
              −
            </button>
            <span className="min-w-[4rem] text-center font-display text-2xl font-bold text-[#4A2A2A]">{state.guests}</span>
            <button
              type="button"
              onClick={() => setState((st) => ({ ...st, guests: Math.min(venue.capacity, st.guests + 10) }))}
              className="size-10 rounded-xl bg-[#F6EEEE] text-lg font-bold text-[#6B3F3F]"
            >
              +
            </button>
            <span className="text-xs text-slate-500">สูงสุด {venue.capacity}</span>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E8D5D5] bg-[#F6EEEE] p-5">
          <p className="text-sm font-semibold text-[#4A2A2A]">ข้อมูลผู้จอง</p>
          <div className="mt-3 space-y-3">
            <input
              value={state.client}
              onChange={(e) => setState((st) => ({ ...st, client: e.target.value }))}
              placeholder="ชื่อ / บริษัท / ชื่องาน"
              className="w-full rounded-xl border border-[#E8D5D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6B3F3F]"
            />
            <input
              value={state.phone}
              onChange={(e) => setState((st) => ({ ...st, phone: e.target.value }))}
              placeholder="เบอร์โทร"
              className="w-full rounded-xl border border-[#E8D5D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6B3F3F]"
            />
            <textarea
              value={state.note}
              onChange={(e) => setState((st) => ({ ...st, note: e.target.value }))}
              placeholder="หมายเหตุ (เวที / อาหาร / ธีม)"
              rows={2}
              className="w-full rounded-xl border border-[#E8D5D5] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6B3F3F]"
            />
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
              <p className="font-semibold text-[#6B3F3F]">สรุป</p>
              <p className="mt-1">
                {venue.name} · {state.dateChip} · {state.guests} คน · ฿{venue.price.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={confirmBooking}
              disabled={!state.client.trim()}
              className="w-full rounded-full bg-[#6B3F3F] py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              ส่งคำขอจอง
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
