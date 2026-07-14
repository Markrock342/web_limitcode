"use client";

import Image from "next/image";
import type { ApptStatus } from "../store";
import { SERVICES, STATUS_STYLE, usePawCare } from "../store";

const FILTERS: Array<ApptStatus | "ทั้งหมด"> = ["ทั้งหมด", "รอตรวจ", "มาแล้ว", "ไม่มา"];

export function PawAppointmentsPage() {
  const { state, setState } = usePawCare();
  const filtered =
    state.apptFilter === "ทั้งหมด"
      ? state.appointments
      : state.appointments.filter((a) => a.status === state.apptFilter);

  function setStatus(id: string, status: ApptStatus) {
    setState((s) => ({
      ...s,
      appointments: s.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
  }

  function imgFor(service: string) {
    return SERVICES.find((s) => s.name === service)?.img ?? "/img/pets/vet-1.jpg";
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/pets/dog-2.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#3D3260]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">รายการนัดหมาย</h1>
            <p className="mt-1 text-sm text-violet-50/90">{filtered.length} รายการ · เช็คมาแล้ว / ไม่มาได้ทันที</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setState((s) => ({ ...s, apptFilter: f }))}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              state.apptFilter === f ? "bg-[#5B4B8A] text-white" : "bg-white text-[#5B4B8A] ring-1 ring-[#E4DDF0]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E4DDF0] bg-[#F0ECF7] px-4 py-12 text-center text-sm text-slate-500">
            ไม่มีนัดในตัวกรองนี้ — ลองจองคิวใหม่จากหน้าจอง
          </div>
        ) : (
          filtered.map((a) => (
            <article
              key={a.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#E4DDF0] bg-white shadow-sm sm:flex-row"
            >
              <div className="relative h-28 w-full shrink-0 sm:h-auto sm:w-36">
                <Image src={imgFor(a.service)} alt="" fill className="object-cover" sizes="144px" />
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display font-bold text-[#3D3260]">
                    {a.pet} <span className="font-normal text-slate-400">· {a.owner}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {a.service} · {a.date} {a.time}
                  </p>
                  <p className="text-xs text-slate-400">
                    {a.id} · {a.vet}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[a.status]}`}>
                    {a.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStatus(a.id, "มาแล้ว")}
                    className="rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    มาแล้ว
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(a.id, "ไม่มา")}
                    className="rounded-full bg-rose-500 px-3 py-1.5 text-[11px] font-semibold text-white"
                  >
                    ไม่มา
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
