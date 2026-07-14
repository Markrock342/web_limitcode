"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useNestDesk } from "../store";

export function NestHomePage() {
  const { state, setState } = useNestDesk();
  const desksFree = state.spaces.filter((s) => s.type === "hotdesk").reduce((n, s) => n + s.available, 0);
  const roomsFree = state.spaces.filter((s) => s.type === "meeting").reduce((n, s) => n + s.available, 0);
  const todayBookings = state.bookings.filter((b) => b.date === "วันนี้").length;
  const checkedIn = state.members.filter((m) => m.checkedIn).length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#3D4F6F] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/cowork/office-1.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A364C] via-[#3D4F6F]/90 to-[#3D4F6F]/35" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-200/90 uppercase">
              NestDesk Cowork · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              พื้นที่ทำงาน
              <br />
              ที่จองโต๊ะได้เอง
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-100/90 sm:text-base">
              ลองจอง Hot Desk หรือห้องประชุม เช็คอินสมาชิก และดูภาพรวมวันจากหลังบ้านในระบบเดียว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/book`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#3D4F6F] transition hover:-translate-y-0.5"
              >
                จองพื้นที่
              </Link>
              <Link
                href={`${BASE}/checkin`}
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Check-in
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-2">
            {[
              { k: "โต๊ะว่าง", v: String(desksFree) },
              { k: "ห้องว่าง", v: String(roomsFree) },
              { k: "จองวันนี้", v: String(todayBookings) },
              { k: "Check-in", v: String(checkedIn) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-slate-200/80 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#3D4F6F]">พื้นที่ว่างวันนี้</h2>
            <p className="mt-1 text-sm text-slate-600">กดการ์ดเพื่อเริ่มจองพื้นที่นั้น</p>
          </div>
          <Link href={`${BASE}/spaces`} className="text-sm font-semibold text-[#3D4F6F] hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {state.spaces.map((s) => (
            <Link
              key={s.id}
              href={`${BASE}/book`}
              onClick={() => setState((st) => ({ ...st, bookSpaceId: s.id }))}
              className="group overflow-hidden rounded-2xl border border-[#D5DCE8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  sizes="220px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#3D4F6F]">
                  ว่าง {s.available}/{s.total}
                </span>
              </div>
              <div className="p-3.5">
                <p className="font-display font-bold text-[#2A364C]">{s.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.blurb}</p>
                <p className="mt-2 text-[11px] font-medium text-[#3D4F6F]">
                  ฿{s.price.toLocaleString()}/{s.unit} · {s.capacity} ที่นั่ง
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-[#D5DCE8] bg-[#F5F7FA] sm:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[180px] sm:min-h-full">
          <Image src="/img/cowork/meeting.jpg" alt="บรรยากาศ NestDesk" fill className="object-cover" sizes="400px" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#2A364C]">สมาชิกและหลังบ้าน</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            ต่ออายุสมาชิก Check-in หน้าร้าน และดูรายการจองวันนี้ — ให้ทีมหน้าเคาน์เตอร์ใช้จริงได้
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`${BASE}/members`} className="rounded-full bg-[#3D4F6F] px-4 py-2 text-xs font-semibold text-white">
              สมาชิก
            </Link>
            <Link
              href={`${BASE}/admin`}
              className="rounded-full border border-[#3D4F6F]/30 px-4 py-2 text-xs font-semibold text-[#3D4F6F]"
            >
              แอดมินวันนี้
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
