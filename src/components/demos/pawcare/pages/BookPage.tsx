"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, DATE_CHIPS, SERVICES, SLOTS, usePawCare } from "../store";

export function PawBookPage() {
  const { state, setState } = usePawCare();
  const service = SERVICES.find((s) => s.id === state.serviceId) ?? SERVICES[0];

  function confirmBooking() {
    if (!state.slot || !state.owner.trim() || !state.pet.trim()) return;
    const id = `V-${200 + state.appointments.length}`;
    const owner = state.owner.trim();
    const pet = state.pet.trim();
    setState((s) => ({
      ...s,
      appointments: [
        {
          id,
          owner,
          pet,
          species: "สัตว์เลี้ยง",
          service: service.name,
          date: s.dateChip,
          time: s.slot!,
          vet: service.vet,
          status: "รอตรวจ",
        },
        ...s.appointments,
      ],
      patients: s.patients.some((p) => p.pet === pet && p.owner === owner)
        ? s.patients
        : [
            ...s.patients,
            {
              id: `PET-${10 + s.patients.length}`,
              pet,
              species: "สัตว์เลี้ยง",
              breed: "-",
              owner,
              phone: s.phone || "-",
              note: "",
              img: service.img,
            },
          ],
      lastBookedId: id,
      slot: null,
      owner: "",
      pet: "",
      phone: "",
    }));
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[21/8] min-h-[140px] sm:aspect-[3/1]">
          <Image src={service.img} alt={service.name} fill priority className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D3260] via-[#3D3260]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-violet-100/90">จองคิว · PawCare</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{service.name}</h1>
            <p className="mt-1 text-sm text-violet-50/90">
              {service.blurb} · {service.mins} นาที · {service.vet}
            </p>
          </div>
        </div>
      </div>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#3D3260]">เลือกบริการ</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, serviceId: s.id }))}
              className={`flex overflow-hidden rounded-2xl border text-left transition ${
                state.serviceId === s.id
                  ? "border-[#5B4B8A] bg-[#F0ECF7] ring-2 ring-[#5B4B8A]/25"
                  : "border-slate-200 bg-white hover:border-[#5B4B8A]/40"
              }`}
            >
              <span className="relative block h-[5.5rem] w-24 shrink-0 sm:w-28">
                <Image src={s.img} alt="" fill className="object-cover" sizes="112px" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-3">
                <span className="font-display font-bold text-[#3D3260]">{s.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">
                  {s.mins} นาที · ฿{s.price.toLocaleString()}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[#E4DDF0] bg-white p-5">
          <p className="text-sm font-semibold text-[#3D3260]">เลือกวัน</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DATE_CHIPS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setState((st) => ({ ...st, dateChip: d }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.dateChip === d ? "bg-[#5B4B8A] text-white" : "bg-[#F0ECF7] text-[#5B4B8A]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#3D3260]">ช่วงเวลาว่าง</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setState((st) => ({ ...st, slot: t }))}
                className={`rounded-xl py-2.5 text-sm font-medium ${
                  state.slot === t ? "bg-[#5B4B8A] text-white" : "bg-[#F0ECF7] text-slate-700 hover:bg-[#E4DDF0]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E4DDF0] bg-[#F0ECF7] p-5">
          <p className="text-sm font-semibold text-[#3D3260]">ข้อมูลเจ้าของ & สัตว์เลี้ยง</p>
          <div className="mt-3 space-y-3">
            <input
              value={state.owner}
              onChange={(e) => setState((st) => ({ ...st, owner: e.target.value }))}
              placeholder="ชื่อเจ้าของ"
              className="w-full rounded-xl border border-[#E4DDF0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#5B4B8A]"
            />
            <input
              value={state.pet}
              onChange={(e) => setState((st) => ({ ...st, pet: e.target.value }))}
              placeholder="ชื่อสัตว์เลี้ยง"
              className="w-full rounded-xl border border-[#E4DDF0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#5B4B8A]"
            />
            <input
              value={state.phone}
              onChange={(e) => setState((st) => ({ ...st, phone: e.target.value }))}
              placeholder="เบอร์โทร"
              className="w-full rounded-xl border border-[#E4DDF0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#5B4B8A]"
            />
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
              <p className="font-semibold text-[#5B4B8A]">สรุป</p>
              <p className="mt-1">
                {service.name} · {state.dateChip} · {state.slot ?? "ยังไม่เลือกเวลา"}
                {state.pet ? ` · ${state.pet}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={confirmBooking}
              disabled={!state.slot || !state.owner.trim() || !state.pet.trim()}
              className="w-full rounded-full bg-[#5B4B8A] py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              ยืนยันจองคิว
            </button>
            {state.lastBookedId && (
              <p className="text-center text-sm font-medium text-emerald-700">
                จองสำเร็จ {state.lastBookedId} —{" "}
                <Link href={`${BASE}/appointments`} className="underline">
                  ดูรายการนัด
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
