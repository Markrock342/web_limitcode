"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, SERVICES, usePawCare } from "../store";

export function PawHomePage() {
  const { state, setState } = usePawCare();
  const today = state.appointments.filter((a) => a.date === "วันนี้");
  const waiting = today.filter((a) => a.status === "รอตรวจ").length;
  const arrived = today.filter((a) => a.status === "มาแล้ว").length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#5B4B8A] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image src="/img/spa-1.jpg" alt="" fill priority className="object-cover opacity-35" sizes="(max-width:1024px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D3260] via-[#5B4B8A]/90 to-[#5B4B8A]/40" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-violet-100/90 uppercase">PawCare Vet · ม็อกอัพ</p>
            <h1 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              คลินิกสัตว์เลี้ยง
              <br />
              จองคิวได้เอง ทีมเห็นชัด
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-violet-50/90 sm:text-base">
              ลอง flow เจ้าของสัตว์จองบริการ แล้วสลับไปเช็คสถานะนัด ตารางสัตวแพทย์ และประวัติสัตว์เลี้ยง
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/book`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#5B4B8A] transition hover:-translate-y-0.5"
              >
                จองคิวตรวจ
              </Link>
              <Link
                href={`${BASE}/appointments`}
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                เปิดรายการนัด
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "นัดวันนี้", v: String(today.length) },
              { k: "รอตรวจ", v: String(waiting) },
              { k: "มาแล้ว", v: String(arrived) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-violet-100/80 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#5B4B8A]">บริการในคลินิก</h2>
            <p className="mt-1 text-sm text-slate-600">กดการ์ดเพื่อเริ่มจองบริการนั้น</p>
          </div>
          <Link href={`${BASE}/book`} className="text-sm font-semibold text-[#5B4B8A] hover:underline">
            จองทั้งหมด →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href={`${BASE}/book`}
              onClick={() => setState((st) => ({ ...st, serviceId: s.id }))}
              className="group overflow-hidden rounded-2xl border border-[#E4DDF0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  sizes="220px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5">
                <p className="font-display font-bold text-[#3D3260]">{s.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.blurb}</p>
                <p className="mt-2 text-[11px] font-medium text-[#5B4B8A]">
                  {s.mins} นาที · ฿{s.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-[#E4DDF0] bg-[#F0ECF7] sm:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[180px] sm:min-h-full">
          <Image src="/img/spa-2.jpg" alt="บรรยากาศคลินิก" fill className="object-cover" sizes="400px" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#3D3260]">หลังบ้านที่ทีมใช้จริง</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            ไม่ใช่แค่ฟอร์มจอง — มีหน้ารายการนัด เช็คมาแล้ว/ไม่มา ตารางสัตวแพทย์ และประวัติสัตว์เลี้ยง
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`${BASE}/patients`} className="rounded-full bg-[#5B4B8A] px-4 py-2 text-xs font-semibold text-white">
              สัตว์เลี้ยง CMS
            </Link>
            <Link href={`${BASE}/vets`} className="rounded-full border border-[#5B4B8A]/30 px-4 py-2 text-xs font-semibold text-[#5B4B8A]">
              ตารางสัตวแพทย์
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
