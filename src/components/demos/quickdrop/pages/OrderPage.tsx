"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BASE,
  STATUS_LABEL,
  STATUS_STYLE,
  advanceOrder,
  assignCourier,
  useQuickDrop,
} from "../store";

export function QuickOrderPage() {
  const { state, setState } = useQuickDrop();
  const search = useSearchParams();
  const id = search.get("id");
  const order = state.orders.find((o) => o.id === id) ?? null;
  const onlineCouriers = state.couriers.filter((c) => c.online);
  const courier = order?.courierId
    ? state.couriers.find((c) => c.id === order.courierId)
    : null;

  if (!id) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-indigo-800">รายละเอียดออเดอร์</h1>
        <p className="mt-2 text-sm text-slate-600">เลือกออเดอร์จากรายการเพื่อดูรายละเอียด</p>
        <Link
          href={`${BASE}/orders`}
          className="mt-5 inline-flex rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white"
        >
          ไปรายการออเดอร์
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-indigo-800">ไม่พบออเดอร์</h1>
        <p className="mt-2 text-sm text-slate-600">รหัสนี้ไม่มีในชุดข้อมูลเดโม</p>
        <Link
          href={`${BASE}/orders`}
          className="mt-5 inline-flex rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white"
        >
          กลับรายการออเดอร์
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-indigo-500">{order.code}</p>
          <h1 className="font-display text-xl font-bold text-indigo-900">{order.customer}</h1>
          <p className="mt-0.5 text-sm text-slate-600">โซน {order.zone}</p>
        </div>
        <Link href={`${BASE}/orders`} className="text-xs font-semibold text-indigo-800">
          ‹ รายการออเดอร์
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[order.status]}`}>
          {STATUS_LABEL[order.status]}
        </span>
        {courier && <span className="text-xs text-slate-500">{courier.name}</span>}
      </div>

      <dl className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">รหัส</dt>
          <dd className="text-right font-mono font-medium">{order.code}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">ลูกค้า</dt>
          <dd className="text-right font-medium">{order.customer}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">โซน</dt>
          <dd className="text-right font-medium">{order.zone}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">ไรเดอร์</dt>
          <dd className="text-right font-medium">{courier?.name ?? "ยังไม่มอบหมาย"}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        {order.status !== "done" && (
          <button
            type="button"
            onClick={() => setState((s) => advanceOrder(s, order.id))}
            className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            สถานะ: {STATUS_LABEL[order.status]} · เลื่อนต่อ
          </button>
        )}
        <Link
          href={`${BASE}/couriers`}
          className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-800"
        >
          ดูพนักงานส่ง
        </Link>
      </div>

      {!order.courierId && order.status !== "done" && (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
          <p className="text-xs font-semibold text-indigo-800">มอบหมายไรเดอร์ออนไลน์</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {onlineCouriers.length === 0 && (
              <p className="text-xs text-slate-400">ไม่มีไรเดอร์ออนไลน์</p>
            )}
            {onlineCouriers.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setState((s) => assignCourier(s, order.id, c.id))}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-100"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
