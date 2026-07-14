"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isoDateOffset, money } from "@/components/demos/_shell/seed";
import { BASE, ROOM_TYPES, newBookingId, useStayNest } from "../store";

export function StayBookPage() {
  const { state, setState } = useStayNest();
  const router = useRouter();
  const [guest, setGuest] = useState("");
  const [roomKey, setRoomKey] = useState(state.formRoomType ?? "Deluxe");
  const [nights, setNights] = useState(2);
  const room = ROOM_TYPES.find((r) => r.key === roomKey) ?? ROOM_TYPES[1];

  function book(e: React.FormEvent) {
    e.preventDefault();
    if (!guest.trim()) return;
    const id = newBookingId();
    setState((s) => ({
      ...s,
      formRoomType: null,
      bookings: [
        { id, guest: guest.trim(), roomType: room.key, nights, pay: "มัดจำ", checkIn: isoDateOffset(3), checkOut: isoDateOffset(3 + nights) },
        ...s.bookings,
      ],
      toast: `สร้างการจอง ${id} สำเร็จ`,
    }));
    router.push(`${BASE}/confirm?id=${id}`);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-7 text-white sm:p-8">
        <Image src="/img/hotel/pool.jpg" alt="" fill className="object-cover opacity-40" sizes="900px" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/30" />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.2em] text-amber-300">STAYNEST HOTEL &amp; RESORT</p>
          <h1 className="mt-2 font-display text-3xl font-bold">เลือกห้องพักสำหรับทริปถัดไป</h1>
          <p className="mt-2 text-sm text-slate-200">ยืนยันการจองในไม่กี่ขั้นตอน ข้อมูลจะอยู่ในเดโมนี้</p>
        </div>
      </div>

      <form onSubmit={book} className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-slate-800">ประเภทห้อง</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {ROOM_TYPES.map((type) => {
                const active = roomKey === type.key;
                return (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => setRoomKey(type.key)}
                    className={`group overflow-hidden rounded-2xl border text-left transition ${
                      active ? "border-amber-500 ring-2 ring-amber-300" : "border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <span className="relative block aspect-[16/9] overflow-hidden">
                      <Image
                        src={type.img}
                        alt={type.name}
                        fill
                        sizes="(max-width:640px) 100vw, 320px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      {active && (
                        <span className="absolute right-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                          เลือกอยู่
                        </span>
                      )}
                    </span>
                    <span className="block p-3">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-display font-bold text-slate-900">{type.name}</span>
                        <span className="text-xs font-bold text-amber-800">{money(type.rate)}/คืน</span>
                      </span>
                      <span className="mt-0.5 block text-[11px] text-slate-500">
                        {type.size} · {type.perks[0]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <label className="block text-sm font-medium">
            ชื่อผู้เข้าพัก
            <input
              required
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-amber-500"
              placeholder="ชื่อ-นามสกุล"
            />
          </label>
          <label className="block text-sm font-medium">
            จำนวนคืน
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5"
            >
              {[1, 2, 3, 4, 5].map((night) => (
                <option key={night}>{night}</option>
              ))}
            </select>
          </label>
        </div>

        <aside className="h-fit overflow-hidden rounded-2xl border border-amber-100 bg-amber-50">
          <div className="relative aspect-[16/9]">
            <Image src={room.img} alt={room.name} fill sizes="280px" className="object-cover" />
          </div>
          <div className="p-5">
            <p className="text-xs font-bold tracking-wider text-amber-800">BOOKING SUMMARY</p>
            <p className="mt-3 font-display text-xl font-bold text-slate-900">{room.name}</p>
            <p className="mt-1 text-sm text-slate-600">
              {nights} คืน · เช็คอิน {isoDateOffset(3)}
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-600">
              {room.perks.map((perk) => (
                <li key={perk}>· {perk}</li>
              ))}
            </ul>
            <p className="mt-4 text-2xl font-bold text-amber-800">{money(room.rate * nights)}</p>
            <button className="mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
              ยืนยันการจอง
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
