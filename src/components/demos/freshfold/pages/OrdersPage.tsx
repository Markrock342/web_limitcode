"use client";

import Image from "next/image";
import Link from "next/link";
import type { OrderStatus } from "../store";
import { BASE, STATUS_STYLE, advanceOrder, nextStatus, useFreshFold } from "../store";

const FILTERS: Array<OrderStatus | "ทั้งหมด"> = ["ทั้งหมด", "รับแล้ว", "กำลังซัก", "พร้อมส่ง", "ส่งแล้ว"];

export function FreshOrdersPage() {
  const { state, setState } = useFreshFold();
  const filtered =
    state.orderFilter === "ทั้งหมด"
      ? state.orders
      : state.orders.filter((o) => o.status === state.orderFilter);

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/laundry/machines.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#1A3D34]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">บอร์ดงานซัก</h1>
            <p className="mt-1 text-sm text-emerald-50/90">
              {filtered.length} รายการ · เลื่อนสถานะรับแล้ว → กำลังซัก → พร้อมส่ง → ส่งแล้ว
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setState((s) => ({ ...s, orderFilter: f }))}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              state.orderFilter === f ? "bg-[#2C5F4F] text-white" : "bg-white text-[#2C5F4F] ring-1 ring-[#C8DED6]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#C8DED6] bg-[#F4FAF7] px-4 py-12 text-center text-sm text-slate-500">
            ไม่มีงานในตัวกรองนี้ — ลองเรียกรับผ้าใหม่
          </div>
        ) : (
          filtered.map((o) => {
            const nxt = nextStatus(o.status);
            return (
              <article
                key={o.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#C8DED6] bg-white shadow-sm sm:flex-row"
              >
                <div className="relative h-28 w-full shrink-0 sm:h-auto sm:w-36">
                  <Image src={o.img} alt="" fill className="object-cover" sizes="144px" />
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-display font-bold text-[#1A3D34]">{o.customer}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {o.packageName} · รับ {o.pickupDate}
                    </p>
                    <p className="text-xs text-slate-400">
                      {o.id} · {o.address}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[o.status]}`}>
                      {o.status}
                    </span>
                    <Link
                      href={`${BASE}/order?id=${o.id}`}
                      className="rounded-full border border-[#C8DED6] px-3 py-1.5 text-[11px] font-semibold text-[#2C5F4F]"
                    >
                      รายละเอียด
                    </Link>
                    {nxt && (
                      <button
                        type="button"
                        onClick={() => setState((s) => advanceOrder(s, o.id))}
                        className="rounded-full bg-[#2C5F4F] px-3 py-1.5 text-[11px] font-semibold text-white"
                      >
                        → {nxt}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
