"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BASE, BOOK_DATES, SLOTS, useNestDesk } from "../store";

export function NestBookPage() {
  const { state, setState } = useNestDesk();
  const router = useRouter();
  const space = state.spaces.find((s) => s.id === state.bookSpaceId) ?? state.spaces[0];

  function confirmBooking() {
    if (!state.session.loggedIn) {
      router.push(`${BASE}/login`);
      return;
    }
    if (!state.bookSlot || !state.bookName.trim()) return;
    const id = `NB-${200 + state.bookings.length}`;
    const memberName = state.bookName.trim();
    setState((s) => ({
      ...s,
      bookings: [
        {
          id,
          member: memberName,
          spaceId: space.id,
          spaceName: space.name,
          date: s.bookDate,
          slot: s.bookSlot!,
          type: space.type,
          img: space.img,
        },
        ...s.bookings,
      ],
      spaces: s.spaces.map((sp) =>
        sp.id === space.id && sp.available > 0 ? { ...sp, available: sp.available - 1 } : sp,
      ),
      members: s.members.some((m) => m.name === memberName)
        ? s.members
        : [
            ...s.members,
            {
              id: `M-${10 + s.members.length}`,
              name: memberName,
              plan: "Day Pass",
              status: "active" as const,
              expiry: "11/10/2569",
              checkedIn: false,
            },
          ],
      lastBookedId: id,
      bookSlot: null,
      bookName: "",
    }));
    router.push(`${BASE}/confirm`);
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[21/8] min-h-[140px] sm:aspect-[3/1]">
          <Image src={space.img} alt={space.name} fill priority className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A364C] via-[#2A364C]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-slate-200/90">จองพื้นที่ · NestDesk</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{space.name}</h1>
            <p className="mt-1 text-sm text-slate-100/90">
              {space.blurb} · ฿{space.price.toLocaleString()}/{space.unit}
            </p>
          </div>
        </div>
      </div>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#2A364C]">เลือกพื้นที่</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {state.spaces.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, bookSpaceId: s.id }))}
              className={`flex overflow-hidden rounded-2xl border text-left transition ${
                state.bookSpaceId === s.id
                  ? "border-[#3D4F6F] bg-[#EEF1F6] ring-2 ring-[#3D4F6F]/25"
                  : "border-slate-200 bg-white hover:border-[#3D4F6F]/40"
              }`}
            >
              <span className="relative block h-[5.5rem] w-24 shrink-0 sm:w-28">
                <Image src={s.img} alt="" fill className="object-cover" sizes="112px" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-3">
                <span className="font-display font-bold text-[#2A364C]">{s.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">
                  ว่าง {s.available}/{s.total} · ฿{s.price.toLocaleString()}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[#D5DCE8] bg-white p-5">
          <p className="text-sm font-semibold text-[#2A364C]">เลือกวัน</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {BOOK_DATES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setState((st) => ({ ...st, bookDate: d }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.bookDate === d ? "bg-[#3D4F6F] text-white" : "bg-[#F5F7FA] text-[#3D4F6F]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#2A364C]">ช่วงเวลา</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setState((st) => ({ ...st, bookSlot: t }))}
                className={`rounded-xl py-2.5 text-sm font-medium ${
                  state.bookSlot === t ? "bg-[#3D4F6F] text-white" : "bg-[#F5F7FA] text-slate-700 hover:bg-[#EEF1F6]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#D5DCE8] bg-[#F5F7FA] p-5">
          <p className="text-sm font-semibold text-[#2A364C]">ชื่อผู้จอง</p>
          <div className="mt-3 space-y-3">
            <input
              value={state.bookName}
              onChange={(e) => setState((st) => ({ ...st, bookName: e.target.value }))}
              placeholder="ชื่อสมาชิก / ผู้จอง"
              className="w-full rounded-xl border border-[#D5DCE8] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#3D4F6F]"
            />
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
              <p className="font-semibold text-[#3D4F6F]">สรุป</p>
              <p className="mt-1">
                {space.name} · {state.bookDate} · {state.bookSlot ?? "ยังไม่เลือกเวลา"}
              </p>
            </div>
            <button
              type="button"
              onClick={confirmBooking}
              disabled={!state.bookSlot || !state.bookName.trim() || space.available <= 0}
              className="w-full rounded-full bg-[#3D4F6F] py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              ยืนยันจอง
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
