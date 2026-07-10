"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, TUTORS, useBrightSlot } from "../store";

export function BrightHomePage() {
  const { state } = useBrightSlot();
  const pending = state.bookings.filter((b) => b.status === "รออนุมัติ").length;
  const approved = state.bookings.filter((b) => b.status === "อนุมัติแล้ว").length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#1B3A5C] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image src="/img/work-1.jpg" alt="" fill priority className="object-cover opacity-40" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12283F] via-[#1B3A5C]/88 to-[#1B3A5C]/35" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-100/80 uppercase">BrightSlot Tutor · ม็อกอัพ</p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              จองติวเตอร์ฝั่งผู้ปกครอง
              <br />
              อนุมัติตารางฝั่งสถาบัน
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-sky-50/90 sm:text-base">
              ระบบกวดวิชาที่เห็นทั้งคาบเรียน ภาระงานครู และรายชื่อนักเรียน — ลองจองแล้วไปอนุมัติที่หลังบ้าน
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/book`}
                className="rounded-full bg-[#E8A87C] px-5 py-2.5 text-sm font-semibold text-[#1B3A5C] transition hover:-translate-y-0.5"
              >
                จองคาบเรียน
              </Link>
              <Link
                href={`${BASE}/schedule`}
                className="rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur"
              >
                เปิดตารางจอง
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { k: "คำขอจอง", v: String(state.bookings.length) },
              { k: "รออนุมัติ", v: String(pending) },
              { k: "อนุมัติแล้ว", v: String(approved) },
              { k: "นักเรียน", v: String(state.students.length) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] text-sky-100/75 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#1B3A5C]">ทีมติวเตอร์</h2>
            <p className="mt-1 text-sm text-slate-600">เลือกครูที่อยากจองคาบ</p>
          </div>
          <Link href={`${BASE}/tutors`} className="text-sm font-semibold text-[#1B3A5C] hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TUTORS.map((t) => (
            <Link
              key={t.id}
              href={`${BASE}/book`}
              className="group overflow-hidden rounded-2xl border border-[#D8E2EC] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={t.img} alt={t.name} fill sizes="220px" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12283F]/80 to-transparent px-3 pb-3 pt-10">
                  <p className="font-display text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-white/80">{t.subject}</p>
                </div>
              </div>
              <div className="p-3.5">
                <p className="text-xs leading-relaxed text-slate-500">{t.bio}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF3F8]">
                  <div
                    className={`h-full rounded-full ${t.load >= 80 ? "bg-rose-400" : "bg-[#E8A87C]"}`}
                    style={{ width: `${t.load}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] font-medium text-[#1B3A5C]">ภาระงาน {t.load}%</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-[#D8E2EC] bg-[#F7F9FC] md:grid-cols-2">
        <div className="relative min-h-[200px]">
          <Image src="/img/work-2.jpg" alt="ห้องเรียน" fill className="object-cover" sizes="450px" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#1B3A5C]">หลังบ้านสถาบัน</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            อนุมัติคำขอจอง ดูโหลดครู และเพิ่มนักเรียน — ครบ flow ที่ทีมกวดวิชาใช้จริง
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`${BASE}/students`} className="rounded-full bg-[#1B3A5C] px-4 py-2 text-xs font-semibold text-white">
              รายชื่อนักเรียน
            </Link>
            <Link href={`${BASE}/admin`} className="rounded-full border border-[#1B3A5C]/25 px-4 py-2 text-xs font-semibold text-[#1B3A5C]">
              แอดมิน
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
