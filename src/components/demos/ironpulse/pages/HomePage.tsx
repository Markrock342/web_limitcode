"use client";

import Image from "next/image";
import Link from "next/link";
import { money } from "@/components/demos/_shell/seed";
import { BASE, useIronPulse, type GymClass } from "../store";

function classImg(name: string) {
  if (/yoga|stretch|pilates|mobility/i.test(name)) return "/img/gym/yoga.jpg";
  if (/box|kick/i.test(name)) return "/img/gym/boxing.jpg";
  if (/spin|cardio|dance|hiit/i.test(name)) return "/img/gym/cardio.jpg";
  if (/barbell|strength/i.test(name)) return "/img/gym/weights.jpg";
  return "/img/gym/workout.jpg";
}

export function IronHomePage() {
  const { state } = useIronPulse();
  const active = state.members.filter((m) => m.status === "active").length;
  const checkedIn = state.members.filter((m) => m.checkedIn).length;
  const seatsLeft = state.classes.reduce((n, c) => n + (c.seats - c.booked), 0);
  const isStaff = state.session.loggedIn && state.session.role === "staff";
  const isMember = state.session.loggedIn && state.session.role !== "guest";

  const featured: GymClass[] = state.classes.slice(0, 4);
  const topPackages = [...state.packages].sort((a, b) => Number(b.popular) - Number(a.popular)).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-zinc-950 text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/gym/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-50"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/20" />
        </div>
        <div className="relative flex min-h-[24rem] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-lime-300 uppercase">
              IronPulse Gym · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              เหงื่อวันนี้
              <br />
              <span className="text-lime-300">คือฟอร์มของพรุ่งนี้</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-200 sm:text-base">
              ระบบยิมครบวงจร — สมาชิกจองคลาสเองได้ พนักงานต่ออายุ เช็คอิน
              และแก้แพ็กเกจจากหลังบ้านเดียวกัน
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={isMember ? `${BASE}/book-class` : `${BASE}/login`}
                className="rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-lime-500/25 transition hover:-translate-y-0.5 hover:bg-lime-300"
              >
                จองคลาสเลย
              </Link>
              <Link
                href={isStaff ? `${BASE}/checkin` : `${BASE}/login`}
                className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {isStaff ? "Check-in หน้าร้าน" : "เข้าระบบพนักงาน"}
              </Link>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "สมาชิกใช้งาน", v: String(active) },
              { k: "Check-in วันนี้", v: String(checkedIn) },
              { k: "ที่นั่งคลาสว่าง", v: String(seatsLeft) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-zinc-300 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold text-lime-300 sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-lime-700 uppercase">Classes</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-zinc-900">คลาสยอดฮิตสัปดาห์นี้</h2>
            <p className="mt-1 text-sm text-slate-600">ล็อกอินสมาชิกแล้วกดจองที่ได้เลย</p>
          </div>
          <Link
            href={isMember ? `${BASE}/book-class` : `${BASE}/login`}
            className="text-sm font-semibold text-lime-700 hover:underline"
          >
            ดูตารางทั้งหมด →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => {
            const left = c.seats - c.booked;
            return (
              <Link
                key={c.id}
                href={isMember ? `${BASE}/book-class` : `${BASE}/login`}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={classImg(c.name)}
                    alt={c.name}
                    fill
                    sizes="(max-width:640px) 100vw, 300px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur ${
                      left === 0 ? "bg-rose-500/90 text-white" : "bg-zinc-950/70 text-lime-300"
                    }`}
                  >
                    {left === 0 ? "เต็มแล้ว" : `ว่าง ${left} ที่`}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display font-bold text-zinc-900">{c.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    วัน{c.day}. · {c.time} น. · {c.seats} ที่นั่ง
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-zinc-950 text-white">
        <div className="grid sm:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-[220px]">
            <Image src="/img/gym/trainer.jpg" alt="เทรนเนอร์ IronPulse" fill className="object-cover" sizes="420px" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/70" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-lime-300 uppercase">Membership</p>
            <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">แพ็กเกจสมาชิก</h2>
            <div className="mt-5 space-y-3">
              {topPackages.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-4 ${
                    p.popular ? "border-lime-400/60 bg-lime-400/10" : "border-white/15 bg-white/5"
                  }`}
                >
                  <div>
                    <p className="font-display font-bold">
                      {p.name}
                      {p.popular && (
                        <span className="ml-2 rounded-full bg-lime-400 px-2 py-0.5 text-[10px] font-bold text-zinc-950">
                          ยอดนิยม
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {p.quota >= 999 ? "เข้าได้ไม่จำกัด" : `${p.quota} ครั้ง`}
                    </p>
                  </div>
                  <p className="font-display text-lg font-bold text-lime-300">{money(p.price)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={isStaff ? `${BASE}/members` : `${BASE}/login`}
                className="rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-lime-300"
              >
                จัดการสมาชิก
              </Link>
              <Link
                href={isStaff ? `${BASE}/packages` : `${BASE}/login`}
                className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                แก้แพ็กเกจ (CMS)
              </Link>
              <Link
                href={isStaff ? `${BASE}/reports` : `${BASE}/login`}
                className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                รายงาน
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
