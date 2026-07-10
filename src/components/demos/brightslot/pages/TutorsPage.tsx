"use client";

import Image from "next/image";
import { TUTORS, useBrightSlot } from "../store";

export function BrightTutorsPage() {
  const { state } = useBrightSlot();

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/office-hero.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#12283F]/72" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">ทีมติวเตอร์</h1>
            <p className="mt-1 text-sm text-white/85">ภาระงานและคาบที่รับผิดชอบ</p>
          </div>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {TUTORS.map((t) => {
          const assigned = state.bookings.filter((b) => b.tutor === t.name && b.status !== "ยกเลิก").length;
          return (
            <li key={t.id} className="overflow-hidden rounded-2xl border border-[#D8E2EC] bg-white shadow-sm">
              <div className="relative h-36">
                <Image src={t.img} alt={t.name} fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12283F]/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/80">{t.subject}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-600">{t.bio}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>คาบที่รับ {assigned}</span>
                  <span className="font-bold text-[#1B3A5C]">{t.load}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEF3F8]">
                  <div
                    className={`h-full rounded-full ${t.load >= 80 ? "bg-rose-400" : "bg-[#E8A87C]"}`}
                    style={{ width: `${t.load}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
