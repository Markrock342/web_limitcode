"use client";

import Image from "next/image";
import type { BookingStatus } from "../store";
import { STATUS_STYLE, TUTORS, useBrightSlot } from "../store";
import { X } from "lucide-react";

export function BrightSchedulePage() {
  const { state, setState } = useBrightSlot();

  function setStatus(id: string, status: BookingStatus) {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    }));
  }

  function tutorImg(name: string) {
    return TUTORS.find((t) => t.name === name)?.img ?? "/img/work-1.jpg";
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/work-3.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#12283F]/72" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">ตารางจอง</h1>
            <p className="mt-1 text-sm text-white/85">อนุมัติหรือยกเลิกคำขอจากผู้ปกครอง</p>
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {state.bookings.map((b) => (
          <li
            key={b.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#D8E2EC] bg-white shadow-sm sm:flex-row"
          >
            <div className="relative h-24 w-full shrink-0 sm:h-auto sm:w-28">
              <Image src={tutorImg(b.tutor)} alt="" fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-display font-bold text-[#12283F]">{b.student}</p>
                <p className="text-xs text-slate-500">
                  {b.subject} · {b.tutor} · {b.slot}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[b.status]}`}>
                  {b.status}
                </span>
                {b.status === "รออนุมัติ" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStatus(b.id, "อนุมัติแล้ว")}
                      className="rounded-full bg-[#1B3A5C] px-3 py-1.5 text-xs font-bold text-white"
                    >
                      อนุมัติ
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(b.id, "ยกเลิก")}
                      className="rounded-full bg-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-700"
                      aria-label="ยกเลิก"
                    >
                      <X className="size-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
