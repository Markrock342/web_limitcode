"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, DATE_CHIPS, SLOTS, useShineAuto } from "../store";

export function ShineBookPage() {
  const { state, setState } = useShineAuto();
  const pkg = state.packages.find((p) => p.id === state.packageId) ?? state.packages[0];
  const bay = state.bays.find((b) => b.id === state.bayId) ?? state.bays[0];

  function confirmBooking() {
    if (!state.slot || !state.customer.trim() || !state.car.trim()) return;
    const id = `J-${200 + state.jobs.length}`;
    const code = `SA-${2400 + state.jobs.length}`;
    const customer = state.customer.trim();
    setState((s) => ({
      ...s,
      jobs: [
        {
          id,
          code,
          customer,
          car: s.car.trim(),
          plate: s.plate.trim() || "-",
          packageId: pkg.id,
          packageName: pkg.name,
          bayId: bay.id,
          bayName: bay.name,
          date: s.dateChip,
          time: s.slot!,
          status: "รอคิว",
          img: pkg.img,
          note: "",
        },
        ...s.jobs,
      ],
      members: s.members.some((m) => m.name === customer)
        ? s.members.map((m) =>
            m.name === customer ? { ...m, points: m.points + 50, visits: m.visits + 1 } : m,
          )
        : [
            ...s.members,
            {
              id: `M-${10 + s.members.length}`,
              name: customer,
              phone: s.phone || "-",
              points: 50,
              tier: "Member",
              visits: 1,
              img: pkg.img,
            },
          ],
      lastBookedId: id,
      slot: null,
      customer: "",
      car: "",
      plate: "",
      phone: "",
    }));
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[21/8] min-h-[140px] sm:aspect-[3/1]">
          <Image src={pkg.img} alt={pkg.name} fill priority className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142840] via-[#142840]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-sky-100/90">จองคิว · ShineAuto</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{pkg.name}</h1>
            <p className="mt-1 text-sm text-sky-50/90">
              {pkg.blurb} · {pkg.mins} นาที · ฿{pkg.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#142840]">เลือกแพ็กเกจ</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {state.packages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, packageId: p.id }))}
              className={`flex overflow-hidden rounded-2xl border text-left transition ${
                state.packageId === p.id
                  ? "border-[#1F3A5F] bg-[#E8EEF5] ring-2 ring-[#1F3A5F]/25"
                  : "border-slate-200 bg-white hover:border-[#1F3A5F]/40"
              }`}
            >
              <span className="relative block h-[5.5rem] w-24 shrink-0 sm:w-28">
                <Image src={p.img} alt="" fill className="object-cover" sizes="112px" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-3">
                <span className="font-display font-bold text-[#142840]">{p.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">
                  {p.mins} นาที · ฿{p.price.toLocaleString()}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#142840]">เลือกเบย์</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {state.bays.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, bayId: b.id }))}
              className={`overflow-hidden rounded-2xl border text-left transition ${
                state.bayId === b.id
                  ? "border-[#1F3A5F] ring-2 ring-[#1F3A5F]/25"
                  : "border-slate-200 hover:border-[#1F3A5F]/40"
              }`}
            >
              <span className="relative block aspect-[16/10]">
                <Image src={b.img} alt="" fill className="object-cover" sizes="200px" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#142840]/80 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-2.5">
                  <span className="block text-xs font-bold text-white">{b.name}</span>
                  <span className="text-[10px] text-white/80">{b.busy ? "มีงานอยู่" : "ว่าง"}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[#D5DEEA] bg-white p-5">
          <p className="text-sm font-semibold text-[#142840]">เลือกวัน</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DATE_CHIPS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setState((st) => ({ ...st, dateChip: d }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.dateChip === d ? "bg-[#1F3A5F] text-white" : "bg-[#E8EEF5] text-[#1F3A5F]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#142840]">ช่วงเวลา</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setState((st) => ({ ...st, slot: t }))}
                className={`rounded-xl py-2.5 text-sm font-medium ${
                  state.slot === t ? "bg-[#1F3A5F] text-white" : "bg-[#E8EEF5] text-slate-700 hover:bg-[#D5DEEA]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#D5DEEA] bg-[#E8EEF5] p-5">
          <p className="text-sm font-semibold text-[#142840]">ข้อมูลรถ & ลูกค้า</p>
          <div className="mt-3 space-y-3">
            <input
              value={state.customer}
              onChange={(e) => setState((st) => ({ ...st, customer: e.target.value }))}
              placeholder="ชื่อลูกค้า"
              className="w-full rounded-xl border border-[#D5DEEA] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1F3A5F]"
            />
            <input
              value={state.car}
              onChange={(e) => setState((st) => ({ ...st, car: e.target.value }))}
              placeholder="รุ่นรถ เช่น Honda Civic"
              className="w-full rounded-xl border border-[#D5DEEA] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1F3A5F]"
            />
            <input
              value={state.plate}
              onChange={(e) => setState((st) => ({ ...st, plate: e.target.value }))}
              placeholder="ทะเบียนรถ"
              className="w-full rounded-xl border border-[#D5DEEA] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1F3A5F]"
            />
            <input
              value={state.phone}
              onChange={(e) => setState((st) => ({ ...st, phone: e.target.value }))}
              placeholder="เบอร์โทร"
              className="w-full rounded-xl border border-[#D5DEEA] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1F3A5F]"
            />
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
              <p className="font-semibold text-[#1F3A5F]">สรุป</p>
              <p className="mt-1">
                {pkg.name} · {bay.name} · {state.dateChip} · {state.slot ?? "ยังไม่เลือกเวลา"}
              </p>
            </div>
            <button
              type="button"
              onClick={confirmBooking}
              disabled={!state.slot || !state.customer.trim() || !state.car.trim()}
              className="w-full rounded-full bg-[#1F3A5F] py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              ยืนยันจองคิว
            </button>
            {state.lastBookedId && (
              <p className="text-center text-sm font-medium text-emerald-700">
                จองสำเร็จ {state.lastBookedId} —{" "}
                <Link href={`${BASE}/jobs`} className="underline">
                  ดูงาน
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
