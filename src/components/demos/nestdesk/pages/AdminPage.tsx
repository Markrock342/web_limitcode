"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, useNestDesk } from "../store";

export function NestAdminPage() {
  const { state } = useNestDesk();
  const today = state.bookings.filter((b) => b.date === "วันนี้");
  const active = state.members.filter((m) => m.status === "active").length;
  const checkedIn = state.members.filter((m) => m.checkedIn).length;
  const desksFree = state.spaces.filter((s) => s.type === "hotdesk").reduce((n, s) => n + s.available, 0);

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/work-3.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#2A364C]/75" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">แอดมินภาพรวมวันนี้</h1>
            <p className="mt-1 text-sm text-slate-100/90">จอง · สมาชิก · ความว่างโต๊ะ</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { k: "จองวันนี้", v: String(today.length) },
          { k: "สมาชิกใช้งาน", v: String(active) },
          { k: "Check-in / โต๊ะว่าง", v: `${checkedIn} / ${desksFree}` },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-[#D5DCE8] bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#3D4F6F]">{x.v}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#2A364C]">รายการจองวันนี้</h2>
          <Link href={`${BASE}/book`} className="text-xs font-semibold text-[#3D4F6F] hover:underline">
            จองเพิ่ม →
          </Link>
        </div>
        <div className="space-y-3">
          {today.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D5DCE8] bg-[#F5F7FA] px-4 py-10 text-center text-sm text-slate-500">
              ยังไม่มีการจองวันนี้
            </div>
          ) : (
            today.map((b) => (
              <article
                key={b.id}
                className="flex overflow-hidden rounded-2xl border border-[#D5DCE8] bg-white shadow-sm"
              >
                <div className="relative hidden w-28 shrink-0 sm:block">
                  <Image src={b.img} alt="" fill className="object-cover" sizes="112px" />
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-2 p-4">
                  <div>
                    <p className="font-display font-bold text-[#2A364C]">{b.member}</p>
                    <p className="text-xs text-slate-500">
                      {b.spaceName} · {b.slot}
                    </p>
                    <p className="text-[11px] text-slate-400">{b.id}</p>
                  </div>
                  <span className="rounded-full bg-[#EEF1F6] px-2.5 py-1 text-[11px] font-semibold text-[#3D4F6F]">
                    {b.type === "hotdesk" ? "Hot Desk" : "Meeting"}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
