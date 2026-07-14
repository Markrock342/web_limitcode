"use client";

import Image from "next/image";
import Link from "next/link";
import { money } from "@/components/demos/_shell/seed";
import { BASE, FACILITIES, ROOM_TYPES, useStayNest } from "../store";

export function StayHomePage() {
  const { state, setState } = useStayNest();
  const arrivals = state.stays.filter((s) => s.type === "มาถึง").length;
  const departures = state.stays.filter((s) => s.type === "ออก").length;
  const vacant = state.rooms.filter((r) => r.status === "ว่าง").length;
  const hkOpen = state.hk.filter((t) => !t.done).length;
  const isStaff = state.session.loggedIn && state.session.role === "staff";

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/hotel/exterior.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-60"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-900/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent" />
        </div>
        <div className="relative flex min-h-[26rem] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-amber-300 uppercase">
              StayNest Hotel &amp; Resort · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              เช็คอินสู่วันพักผ่อน
              <br />
              <span className="text-amber-300">ที่รอคุณอยู่ริมสระ</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
              เว็บจองตรงของโรงแรม พ่วงระบบหลังบ้านครบ — Front Desk เช็คอิน/เอาท์ บอร์ดห้องพัก
              และงานแม่บ้านในระบบเดียว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/book`}
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                จองห้องพัก
              </Link>
              <Link
                href={isStaff ? `${BASE}/front-desk` : `${BASE}/login`}
                className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {isStaff ? "เปิด Front Desk" : "เข้าระบบพนักงาน"}
              </Link>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {[
              { k: "เช็คอินวันนี้", v: String(arrivals) },
              { k: "เช็คเอาท์", v: String(departures) },
              { k: "ห้องว่าง", v: String(vacant) },
              { k: "งานแม่บ้านค้าง", v: String(hkOpen) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-slate-200 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold text-amber-200 sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">Rooms &amp; Villas</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">ห้องพักแนะนำ</h2>
            <p className="mt-1 text-sm text-slate-600">เลือกห้องที่ใช่ แล้วไปต่อที่หน้าจองได้เลย</p>
          </div>
          <Link href={`${BASE}/book`} className="text-sm font-semibold text-amber-800 hover:underline">
            ดูราคาทั้งหมด →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROOM_TYPES.map((room) => (
            <Link
              key={room.key}
              href={`${BASE}/book`}
              onClick={() => setState((s) => ({ ...s, formRoomType: room.key }))}
              className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.img}
                  alt={room.name}
                  fill
                  sizes="(max-width:640px) 100vw, 300px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-200 backdrop-blur">
                  {room.size}
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-lg font-bold text-slate-900">{room.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{room.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.perks.slice(0, 2).map((perk) => (
                    <span key={perk} className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-900">
                      {perk}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm font-bold text-amber-800">
                  {money(room.rate)}
                  <span className="font-medium text-slate-400"> /คืน</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {FACILITIES.map((f) => (
          <figure key={f.name} className="group relative aspect-[5/4] overflow-hidden rounded-2xl sm:aspect-[4/3]">
            <Image
              src={f.img}
              alt={f.name}
              fill
              sizes="(max-width:640px) 100vw, 300px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 pt-10 text-white">
              <p className="font-display font-bold">{f.name}</p>
              <p className="text-xs text-slate-300">{f.desc}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 text-white sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[200px] sm:min-h-full">
          <Image src="/img/hotel/lobby.jpg" alt="หลังบ้าน StayNest" fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/60" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-300 uppercase">Backstage</p>
          <h2 className="font-display text-xl font-bold sm:text-2xl">หลังบ้านที่ทีมโรงแรมใช้จริง</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            ไม่ใช่แค่หน้าเว็บจอง — ล็อกอินพนักงานแล้วลองเช็คอินแขก วนสถานะห้อง
            และติ๊กงานแม่บ้านได้ครบ flow ข้อมูลเก็บในเบราว์เซอร์
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={isStaff ? `${BASE}/front-desk` : `${BASE}/login`}
              className="rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Front Desk
            </Link>
            <Link
              href={isStaff ? `${BASE}/rooms` : `${BASE}/login`}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              บอร์ดห้องพัก
            </Link>
            <Link
              href={isStaff ? `${BASE}/housekeeping` : `${BASE}/login`}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              งานแม่บ้าน
            </Link>
          </div>
        </div>
      </section>

      {state.toast && (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">{state.toast}</p>
      )}
    </div>
  );
}
