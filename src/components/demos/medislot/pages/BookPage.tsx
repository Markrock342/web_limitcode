"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { demoId } from "@/components/demos/_shell/seed";
import { BASE, DATE_CHIPS, formatMediDate, SERVICES, SLOTS, useMediSlot } from "../store";

export function MediBookPage() {
  const { state, setState } = useMediSlot();
  const router = useRouter();
  const service = SERVICES.find((s) => s.id === state.serviceId) ?? SERVICES[0];

  function continueToConfirm() {
    if (!state.slot || !state.name.trim()) return;
    const patientName = state.name.trim();
    setState((s) => ({
      ...s,
      pendingBooking: {
        id: demoId("A", 101 + s.appointments.length, 3),
        patient: patientName,
        patientId: s.patients.find((p) => p.name === patientName)?.id ?? demoId("P", s.patients.length + 1, 3),
        memberUsername: s.session.username,
        service: service.name,
        date: s.dateChip,
        time: s.slot!,
        doctor: service.doctor,
      },
    }));
    router.push(`${BASE}/confirm`);
  }

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="member">
      <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[21/8] min-h-[140px] sm:aspect-[3/1]">
          <Image src={service.img} alt={service.name} fill priority className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A4F4F] via-[#0A4F4F]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-teal-100/90">จองคิว · MediSlot</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{service.name}</h1>
            <p className="mt-1 text-sm text-teal-50/90">
              {service.blurb} · {service.mins} นาที · {service.doctor}
            </p>
          </div>
        </div>
      </div>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#0F3F3F]">เลือกบริการ</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, serviceId: s.id }))}
              className={`flex overflow-hidden rounded-2xl border text-left transition ${
                state.serviceId === s.id
                  ? "border-[#0F6B6B] bg-[#E6F4F3] ring-2 ring-[#0F6B6B]/25"
                  : "border-slate-200 bg-white hover:border-[#0F6B6B]/40"
              }`}
            >
              <span className="relative block h-[5.5rem] w-24 shrink-0 sm:w-28">
                <Image src={s.img} alt="" fill className="object-cover" sizes="112px" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-3">
                <span className="font-display font-bold text-[#0F3F3F]">{s.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">
                  {s.mins} นาที · {s.doctor}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[#D5E8E6] bg-white p-5">
          <p className="text-sm font-semibold text-[#0F3F3F]">เลือกวัน</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DATE_CHIPS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setState((st) => ({ ...st, dateChip: d }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.dateChip === d ? "bg-[#0F6B6B] text-white" : "bg-[#F4FAF9] text-[#0F6B6B]"
                }`}
              >
                {formatMediDate(d)}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#0F3F3F]">ช่วงเวลาว่าง</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setState((st) => ({ ...st, slot: t }))}
                className={`rounded-xl py-2.5 text-sm font-medium ${
                  state.slot === t ? "bg-[#0F6B6B] text-white" : "bg-[#F4FAF9] text-slate-700 hover:bg-[#E6F4F3]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#D5E8E6] bg-[#F4FAF9] p-5">
          <p className="text-sm font-semibold text-[#0F3F3F]">ข้อมูลผู้ป่วย</p>
          <div className="mt-3 space-y-3">
            <input
              value={state.name}
              onChange={(e) => setState((st) => ({ ...st, name: e.target.value }))}
              placeholder="ชื่อผู้ป่วย"
              className="w-full rounded-xl border border-[#D5E8E6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F6B6B]"
            />
            <input
              value={state.phone}
              onChange={(e) => setState((st) => ({ ...st, phone: e.target.value }))}
              placeholder="เบอร์โทร"
              className="w-full rounded-xl border border-[#D5E8E6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0F6B6B]"
            />
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
              <p className="font-semibold text-[#0F6B6B]">สรุป</p>
              <p className="mt-1">
                {service.name} · {formatMediDate(state.dateChip)} · {state.slot ?? "ยังไม่เลือกเวลา"}
              </p>
            </div>
            <button
              type="button"
              onClick={continueToConfirm}
              disabled={!state.slot || !state.name.trim()}
              className="w-full rounded-full bg-[#0F6B6B] py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              ไปหน้ายืนยันการจอง
            </button>
          </div>
        </section>
      </div>
      </div>
    </RequireAuth>
  );
}
