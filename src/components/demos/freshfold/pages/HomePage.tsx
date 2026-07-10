"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useFreshFold } from "../store";

export function FreshHomePage() {
  const { state, setState } = useFreshFold();
  const activePkgs = state.packages.filter((p) => p.active);
  const inWash = state.orders.filter((o) => o.status === "กำลังซัก").length;
  const ready = state.orders.filter((o) => o.status === "พร้อมส่ง").length;
  const picked = state.orders.filter((o) => o.status === "รับแล้ว").length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#2C5F4F] text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/img/shop-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="(max-width:1024px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3D34] via-[#2C5F4F]/90 to-[#2C5F4F]/40" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-emerald-100/90 uppercase">
              FreshFold Laundry · ม็อกอัพ
            </p>
            <h1 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              รับผ้าถึงบ้าน
              <br />
              ซักสะอาด ส่งคืนตรงเวลา
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-50/90 sm:text-base">
              ลอง flow ลูกค้าเรียกรับผ้า แล้วสลับไปบอร์ดงานเลื่อนสถานะ แก้แพ็กเกจ และโน้ตลูกค้าในระบบเดียว
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`${BASE}/pickup`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#2C5F4F] transition hover:-translate-y-0.5"
              >
                เรียกรับผ้า
              </Link>
              <Link
                href={`${BASE}/orders`}
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                เปิดบอร์ดงาน
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "รับแล้ว", v: String(picked) },
              { k: "กำลังซัก", v: String(inWash) },
              { k: "พร้อมส่ง", v: String(ready) },
            ].map((x) => (
              <div key={x.k} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:p-4">
                <p className="text-[10px] font-medium text-emerald-100/80 sm:text-xs">{x.k}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#2C5F4F]">แพ็กเกจบริการ</h2>
            <p className="mt-1 text-sm text-slate-600">กดการ์ดเพื่อเริ่มเรียกรับด้วยแพ็กเกจนั้น</p>
          </div>
          <Link href={`${BASE}/pickup`} className="text-sm font-semibold text-[#2C5F4F] hover:underline">
            เรียกรับทั้งหมด →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activePkgs.map((p) => (
            <Link
              key={p.id}
              href={`${BASE}/pickup`}
              onClick={() => setState((st) => ({ ...st, formPackageId: p.id }))}
              className="group overflow-hidden rounded-2xl border border-[#C8DED6] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="220px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5">
                <p className="font-display font-bold text-[#1A3D34]">{p.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.blurb}</p>
                <p className="mt-2 text-[11px] font-medium text-[#2C5F4F]">
                  ฿{p.price.toLocaleString()}/{p.unit}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[1.5rem] border border-[#C8DED6] bg-[#F4FAF7] sm:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[180px] sm:min-h-full">
          <Image src="/img/office-hero.jpg" alt="หลังบ้าน FreshFold" fill className="object-cover" sizes="400px" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-[#1A3D34]">หลังบ้านที่ทีมซักใช้จริง</h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            ไม่ใช่แค่ฟอร์มรับผ้า — มีบอร์ดสถานะ รายละเอียดงาน แพ็กเกจ CMS และโน้ตลูกค้า ให้ลองกดครบ flow
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`${BASE}/pricing`} className="rounded-full bg-[#2C5F4F] px-4 py-2 text-xs font-semibold text-white">
              แพ็กเกจ CMS
            </Link>
            <Link
              href={`${BASE}/customers`}
              className="rounded-full border border-[#2C5F4F]/30 px-4 py-2 text-xs font-semibold text-[#2C5F4F]"
            >
              ลูกค้า
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
