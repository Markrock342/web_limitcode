"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, COURTS, DATES, HOURS, fmtDay, tierFor, useSmashLane } from "../store";

export function SmashHomePage() {
  const { state } = useSmashLane();
  const date = DATES[state.dateIdx];
  const day = state.bookings.filter((b) => b.date === date && b.paid && b.status === "confirmed");
  const queue = day.filter((b) => b.court === null).length;
  const revenue = day.reduce((s, b) => s + b.price, 0);
  const isStaff = state.session.loggedIn && state.session.role === "staff";

  const slots = HOURS.map((hour) => {
    const booked = day.filter((b) => b.hour === hour).length;
    return { hour, left: Math.max(0, COURTS - booked), tier: tierFor(hour) };
  });

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#141d3d] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/court/badminton-1.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-55"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1430] via-[#0c1430]/75 to-[#16224d]/25" />
        </div>
        <div className="relative flex min-h-[24rem] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-amber-300 uppercase">
              SmashLane Arena · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              จองคอร์ทแบด
              <br />
              <span className="text-amber-300">ใน 3 คลิก ไม่ต้องโทร</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
              12 คอร์ทมาตรฐานแข่งขัน พื้นยางสังเคราะห์ ไฟไม่แยงตา — เลือกชั่วโมงแล้วสนามจัดเลขคอร์ทให้อัตโนมัติ
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/book`}
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-[#141d3d] shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                จองคอร์ทเลย
              </Link>
              <Link
                href={isStaff ? `${BASE}/admin` : `${BASE}/login`}
                className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {isStaff ? "เปิดคิวจัดคอร์ท" : "เข้าระบบพนักงาน"}
              </Link>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: `จองวันนี้ (${fmtDay(date)})`, v: String(day.length) },
              { k: "รอจัดคอร์ท", v: String(queue) },
              { k: "รายได้วันนี้", v: `฿${revenue.toLocaleString()}` },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-slate-200 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-xl font-bold text-amber-300 sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#3953A4] uppercase">Live Availability</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">คอร์ทว่างวันนี้</h2>
            <p className="mt-1 text-sm text-slate-600">กดชั่วโมงที่สะดวกเพื่อเริ่มจอง · ก่อน 17:00 ราคาโปรฯ บ่าย</p>
          </div>
          <Link href={`${BASE}/book`} className="text-sm font-semibold text-[#3953A4] hover:underline">
            ดูทั้งสัปดาห์ →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {slots.map((s) => (
            <Link
              key={s.hour}
              href={`${BASE}/book`}
              className={`group rounded-2xl border p-3 text-center transition hover:-translate-y-0.5 hover:shadow-md ${
                s.left === 0
                  ? "border-slate-200 bg-slate-100 text-slate-400"
                  : s.tier.id === "promo"
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-[#3953A4]/20 bg-white"
              }`}
            >
              <p className="font-display text-lg font-bold text-slate-900">{s.hour}:00</p>
              <p className={`mt-0.5 text-[11px] font-semibold ${s.left === 0 ? "text-slate-400" : s.tier.id === "promo" ? "text-emerald-700" : "text-[#3953A4]"}`}>
                {s.left === 0 ? "เต็ม" : `ว่าง ${s.left}`}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">฿{s.tier.price}/ชม.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/10]">
            <Image
              src="/img/court/badminton-2.jpg"
              alt="อุปกรณ์ครบ เช่าได้หน้าสนาม"
              fill
              sizes="(max-width:640px) 100vw, 460px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c1430]/90 via-[#0c1430]/40 to-transparent p-5 pt-14 text-white">
            <p className="font-display text-lg font-bold">เช่าแร็กเก็ต-ลูกขนไก่หน้าสนาม</p>
            <p className="mt-0.5 text-xs text-slate-300">มือใหม่มาตัวเปล่าได้ มีรองเท้าให้เช่าครบไซซ์</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/10]">
            <Image
              src="/img/court/volleyball.jpg"
              alt="จัดก๊วนและทัวร์นาเมนต์"
              fill
              sizes="(max-width:640px) 100vw, 460px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c1430]/90 via-[#0c1430]/40 to-transparent p-5 pt-14 text-white">
            <p className="font-display text-lg font-bold">ก๊วนประจำ &amp; ทัวร์นาเมนต์</p>
            <p className="mt-0.5 text-xs text-slate-300">จองเหมาหลายคอร์ทติดกันได้ มีระบบคิวให้หลังบ้าน</p>
          </div>
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white sm:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#EB8824] uppercase">Backstage</p>
          <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">หลังบ้านจัดคอร์ทอัตโนมือ</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            การจองที่ยังไม่มีเลขคอร์ทจะเข้าคิวให้ทีมหน้าสนามกดจัดลงตาราง — ลองเปิดตารางคอร์ทแบบเรียลไทม์ได้เลย
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={isStaff ? `${BASE}/admin` : `${BASE}/login`}
              className="rounded-full bg-[#3953A4] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#2d4287]"
            >
              คิวจัดคอร์ท ({queue})
            </Link>
            <Link
              href={isStaff ? `${BASE}/admin/grid` : `${BASE}/login`}
              className="rounded-full border border-[#3953A4]/30 px-4 py-2 text-xs font-semibold text-[#3953A4] transition hover:bg-[#3953A4]/5"
            >
              ตารางคอร์ททั้ง 12
            </Link>
          </div>
        </div>
        <div className="relative min-h-[200px]">
          <Image src="/img/court/indoor.jpg" alt="สนามในร่ม SmashLane" fill className="object-cover" sizes="420px" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/40" />
        </div>
      </section>
    </div>
  );
}
