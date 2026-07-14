"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, KITCHEN_COLS, useTableFlow } from "../store";

const MENU_IMG: Record<string, string> = {
  M1: "/img/food-6.jpg",
  M2: "/img/food-7.jpg",
  M3: "/img/food-3.jpg",
  M7: "/img/food-5.jpg",
};

export function TableHomePage() {
  const { state } = useTableFlow();
  const waiting = state.reservations.filter((r) => r.status === "รอโต๊ะ").length;
  const kitchenOpen = state.orders.filter((o) => o.col !== "เสร็จแล้ว").length;
  const revenue = state.orders.filter((o) => o.col === "เสร็จแล้ว").reduce((s, o) => s + o.total, 0);
  const isStaff = state.session.loggedIn && state.session.role === "staff";
  const featured = state.menu.filter((m) => MENU_IMG[m.id]);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-stone-950 text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/kitchen/plating.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-55"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-stone-900/20" />
        </div>
        <div className="relative flex min-h-[24rem] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-amber-300 uppercase">
              TableFlow Bistro · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              จากเตาไฟ
              <br />
              <span className="text-amber-300">ถึงโต๊ะคุณแบบไม่หลุดคิว</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-200 sm:text-base">
              ระบบร้านอาหารครบชุด — ลูกค้าจองโต๊ะ/สั่งอาหารเอง ครัวเลื่อนออเดอร์บนบอร์ด
              และแก้เมนู sold-out ได้ทันที
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/reserve`}
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                จองโต๊ะ
              </Link>
              <Link
                href={`${BASE}/order`}
                className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                สั่งอาหาร
              </Link>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "คิวรอโต๊ะ", v: String(waiting) },
              { k: "ออเดอร์ในครัว", v: String(kitchenOpen) },
              { k: "ยอดขายวันนี้", v: `฿${revenue.toLocaleString()}` },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-stone-300 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-xl font-bold text-amber-300 sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">Chef&apos;s Picks</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-stone-900">จานเด็ดประจำร้าน</h2>
            <p className="mt-1 text-sm text-slate-600">เมนูขายดี — สถานะ sold-out ดึงจาก CMS จริงของเดโม</p>
          </div>
          <Link href={`${BASE}/order`} className="text-sm font-semibold text-amber-700 hover:underline">
            ดูเมนูทั้งหมด →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((m) => (
            <Link
              key={m.id}
              href={`${BASE}/order`}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={MENU_IMG[m.id]}
                  alt={m.name}
                  fill
                  sizes="(max-width:640px) 100vw, 300px"
                  className={`object-cover transition duration-500 group-hover:scale-105 ${m.soldOut ? "saturate-50" : ""}`}
                />
                {m.soldOut && (
                  <span className="absolute left-3 top-3 rounded-full bg-rose-600/90 px-2.5 py-1 text-[10px] font-bold text-white">
                    ขายหมดวันนี้
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-2 p-4">
                <p className="font-display font-bold text-stone-900">{m.name}</p>
                <p className="shrink-0 text-sm font-bold text-amber-700">฿{m.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white">
        <div className="grid sm:grid-cols-[1fr_1.1fr]">
          <div className="relative min-h-[220px]">
            <Image src="/img/kitchen/pass.jpg" alt="ครัว TableFlow" fill className="object-cover" sizes="420px" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">Kitchen Board</p>
            <h2 className="mt-1 font-display text-xl font-bold text-stone-900 sm:text-2xl">
              บอร์ดครัวที่เชฟเลื่อนเองได้
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              ออเดอร์ไหลจากหน้าร้านเข้าครัวเป็นคอลัมน์ ใหม่ → กำลังทำ → พร้อมเสิร์ฟ
              กดเลื่อนได้จริงในเดโม
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {KITCHEN_COLS.map((col) => {
                const n = state.orders.filter((o) => o.col === col).length;
                return (
                  <div key={col} className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
                    <p className="text-[11px] font-medium text-slate-500">{col}</p>
                    <p className="mt-0.5 font-display text-xl font-bold text-stone-900">{n}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={isStaff ? `${BASE}/kitchen` : `${BASE}/login`}
                className="rounded-full bg-amber-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-800"
              >
                เปิด Kitchen Board
              </Link>
              <Link
                href={isStaff ? `${BASE}/menu` : `${BASE}/login`}
                className="rounded-full border border-amber-700/30 px-4 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
              >
                เมนู CMS
              </Link>
              <Link
                href={isStaff ? `${BASE}/reservations` : `${BASE}/login`}
                className="rounded-full border border-amber-700/30 px-4 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
              >
                รายการจอง
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[1.5rem] text-white">
        <div className="relative min-h-[220px]">
          <Image src="/img/resto-hero.jpg" alt="บรรยากาศร้าน TableFlow Bistro" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-8">
            <h2 className="max-w-sm font-display text-xl font-bold sm:text-2xl">
              มื้อพิเศษคืนนี้ โต๊ะริมหน้าต่างรออยู่
            </h2>
            <p className="max-w-sm text-sm text-stone-200">
              จองล่วงหน้าได้ถึง {state.reservations.length} คิวต่อคืน ระบบยืนยันทันที
            </p>
            <div>
              <Link
                href={`${BASE}/reserve`}
                className="inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-stone-900 transition hover:-translate-y-0.5"
              >
                จองโต๊ะคืนนี้
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
