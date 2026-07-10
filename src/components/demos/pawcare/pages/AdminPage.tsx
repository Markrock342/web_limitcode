"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, usePawCare } from "../store";

export function PawAdminPage() {
  const { state } = usePawCare();
  const today = state.appointments.filter((a) => a.date === "วันนี้");
  const waiting = today.filter((a) => a.status === "รอตรวจ").length;
  const noShow = state.appointments.filter((a) => a.status === "ไม่มา").length;
  const activeVets = state.schedule.filter((d) => d.active);

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/spa-1.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#3D3260]/75" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">แอดมินภาพรวม</h1>
            <p className="mt-1 text-sm text-violet-50/90">สรุปสถานะคลินิกและทางลัดหลังบ้าน</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "นัดวันนี้", v: String(today.length), href: `${BASE}/appointments` },
          { k: "รอตรวจ", v: String(waiting), href: `${BASE}/appointments` },
          { k: "ไม่มา (ทั้งหมด)", v: String(noShow), href: `${BASE}/appointments` },
        ].map((x) => (
          <Link
            key={x.k}
            href={x.href}
            className="rounded-2xl border border-[#E4DDF0] bg-white p-4 shadow-sm transition hover:border-[#5B4B8A]/40"
          >
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#5B4B8A]">{x.v}</p>
          </Link>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#E4DDF0] bg-white">
        <div className="grid sm:grid-cols-[140px_1fr]">
          <div className="relative min-h-[120px]">
            <Image src="/img/spa-3.jpg" alt="" fill className="object-cover" sizes="140px" />
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-[#3D3260]">สัตวแพทย์ที่เปิดรับวันนี้</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {activeVets.map((d) => (
                <li key={d.id}>
                  {d.vet} · {d.blocks.join(", ") || "ยังไม่มีบล็อก"}
                </li>
              ))}
              {activeVets.length === 0 && <li className="text-slate-400">ไม่มีสัตวแพทย์เปิดรับ</li>}
            </ul>
            <Link href={`${BASE}/vets`} className="mt-3 inline-block text-sm font-semibold text-[#5B4B8A] underline">
              แก้ตารางสัตวแพทย์
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`${BASE}/patients`} className="rounded-2xl bg-[#F0ECF7] p-4 text-[#5B4B8A] ring-1 ring-[#E4DDF0]">
          <p className="font-display font-bold">สัตว์เลี้ยง {state.patients.length} ตัว</p>
          <p className="mt-1 text-sm text-[#5B4B8A]/80">เปิด CMS ประวัติ</p>
        </Link>
        <Link href={`${BASE}/book`} className="rounded-2xl bg-[#5B4B8A] p-4 text-white">
          <p className="font-display font-bold">จองคิวใหม่</p>
          <p className="mt-1 text-sm text-white/80">ฝั่งเจ้าของสัตว์</p>
        </Link>
      </div>
    </div>
  );
}
