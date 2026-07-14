"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, STATUS_FLOW, STATUS_LABEL, ZONES, useQuickDrop } from "../store";

const STEP_CARDS = [
  { img: "/img/delivery/warehouse.jpg", title: "แพ็คของที่ฮับ", desc: "รับเข้าและคัดแยกตามโซนภายใน 30 นาที" },
  { img: "/img/delivery/boxes.jpg", title: "พัสดุพร้อมออกวิ่ง", desc: "จ่ายงานให้ไรเดอร์ที่ว่างในโซนอัตโนมัติ" },
  { img: "/img/delivery/van.jpg", title: "รอบส่งข้ามเขต", desc: "รวมพัสดุขึ้นรถใหญ่สำหรับเส้นทางไกล" },
];

export function QuickHomePage() {
  const { state } = useQuickDrop();
  const online = state.couriers.filter((c) => c.online).length;
  const pending = state.orders.filter((o) => o.status === "pending").length;
  const delivering = state.orders.filter((o) => o.status === "delivering" || o.status === "picking").length;
  const isStaff = state.session.loggedIn && state.session.role === "staff";

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-indigo-950 text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/delivery/courier.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-50"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-950/80 to-indigo-900/25" />
        </div>
        <div className="relative flex min-h-[24rem] flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-indigo-300 uppercase">
              QuickDrop Logistics · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              ส่งด่วนในเมือง
              <br />
              <span className="text-indigo-300">ทุกกล่องมีคนดูแล</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-indigo-100 sm:text-base">
              คอนโซล dispatch เต็มรูปแบบ — ลูกค้าสร้างรายการส่งเอง ทีมงานมอบหมายไรเดอร์
              ตามโซน และปิดงานพร้อม KPI รายวัน
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/create`}
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-800 shadow-lg shadow-indigo-900/30 transition hover:-translate-y-0.5"
              >
                สร้างรายการส่ง
              </Link>
              <Link
                href={isStaff ? `${BASE}/orders` : `${BASE}/login`}
                className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {isStaff ? "เปิด Dispatch Console" : "เข้าระบบทีมงาน"}
              </Link>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "รอจ่ายงาน", v: String(pending) },
              { k: "กำลังจัด/ส่ง", v: String(delivering) },
              { k: "ไรเดอร์ออนไลน์", v: `${online}/${state.couriers.length}` },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-indigo-200 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-indigo-700 uppercase">Coverage</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">โซนที่ให้บริการวันนี้</h2>
            <p className="mt-1 text-sm text-slate-600">คิวงานแยกตามโซนแบบเรียลไทม์จากข้อมูลเดโม</p>
          </div>
          <Link
            href={isStaff ? `${BASE}/zones` : `${BASE}/login`}
            className="text-sm font-semibold text-indigo-700 hover:underline"
          >
            แผนที่โซน →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {ZONES.map((z) => {
            const inZone = state.orders.filter((o) => o.zone === z.name && o.status !== "done").length;
            return (
              <Link
                key={z.id}
                href={isStaff ? `${BASE}/zones` : `${BASE}/login`}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className={`inline-block size-2.5 rounded-full ${z.color}`} />
                <p className="mt-2 font-display font-bold text-slate-900">{z.name}</p>
                <p className="mt-0.5 text-[11px] text-slate-500">ค้างส่ง {inZone} งาน</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {STEP_CARDS.map((card, i) => (
          <figure key={card.title} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={card.img}
              alt={card.title}
              fill
              sizes="(max-width:640px) 100vw, 300px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/45 to-transparent p-4 pt-12 text-white">
              <p className="text-[10px] font-bold tracking-widest text-indigo-300">STEP {i + 1}</p>
              <p className="font-display font-bold">{card.title}</p>
              <p className="mt-0.5 text-xs text-indigo-100/90">{card.desc}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-indigo-700 uppercase">Live Board</p>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-900 sm:text-2xl">สถานะงานทั้งระบบ</h2>
          </div>
          <div className="flex gap-2">
            <Link
              href={isStaff ? `${BASE}/orders` : `${BASE}/login`}
              className="rounded-full bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-800"
            >
              จัดการออเดอร์
            </Link>
            <Link
              href={isStaff ? `${BASE}/summary` : `${BASE}/login`}
              className="rounded-full border border-indigo-200 px-4 py-2 text-xs font-semibold text-indigo-800 transition hover:bg-indigo-50"
            >
              สรุปวัน (KPI)
            </Link>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATUS_FLOW.map((status) => {
            const n = state.orders.filter((o) => o.status === status).length;
            return (
              <div key={status} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{STATUS_LABEL[status]}</p>
                <p className="mt-1 font-display text-2xl font-bold text-indigo-800">{n}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: `${Math.round((n / Math.max(1, state.orders.length)) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
