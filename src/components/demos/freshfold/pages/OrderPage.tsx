"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BASE, STATUS_STYLE, advanceOrder, nextStatus, useFreshFold } from "../store";

export function FreshOrderPage() {
  const { state, setState } = useFreshFold();
  const search = useSearchParams();
  const id = search.get("id");
  const order = state.orders.find((o) => o.id === id) ?? null;

  if (!id) {
    return (
      <div className="rounded-2xl border border-[#C8DED6] bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-[#2C5F4F]">รายละเอียดงาน</h1>
        <p className="mt-2 text-sm text-slate-600">เลือกงานจากบอร์ดเพื่อดูรายละเอียด</p>
        <Link
          href={`${BASE}/orders`}
          className="mt-5 inline-flex rounded-full bg-[#2C5F4F] px-5 py-2.5 text-sm font-semibold text-white"
        >
          ไปบอร์ดงาน
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-[#C8DED6] bg-white p-8 text-center">
        <h1 className="font-display text-xl font-bold text-[#2C5F4F]">ไม่พบงาน</h1>
        <p className="mt-2 text-sm text-slate-600">รหัสนี้ไม่มีในชุดข้อมูลเดโม</p>
        <Link
          href={`${BASE}/orders`}
          className="mt-5 inline-flex rounded-full bg-[#2C5F4F] px-5 py-2.5 text-sm font-semibold text-white"
        >
          กลับบอร์ดงาน
        </Link>
      </div>
    );
  }

  const nxt = nextStatus(order.status);

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[16/9]">
          <Image src={order.img} alt="" fill className="object-cover" sizes="500px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D34] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-mono text-xs text-emerald-100/80">{order.id}</p>
            <h1 className="font-display text-2xl font-bold text-white">{order.customer}</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[order.status]}`}>
          {order.status}
        </span>
        <Link href={`${BASE}/orders`} className="text-xs font-semibold text-[#2C5F4F]">
          ‹ บอร์ดงาน
        </Link>
      </div>

      <dl className="space-y-2 rounded-2xl border border-[#C8DED6] bg-white p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">แพ็กเกจ</dt>
          <dd className="text-right font-medium">{order.packageName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">วันรับ</dt>
          <dd className="text-right font-medium">{order.pickupDate}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">ที่อยู่</dt>
          <dd className="max-w-[60%] text-right font-medium">{order.address}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">โน้ต</dt>
          <dd className="max-w-[60%] text-right font-medium">{order.note || "—"}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        {nxt && (
          <button
            type="button"
            onClick={() => setState((s) => advanceOrder(s, order.id))}
            className="rounded-full bg-[#2C5F4F] px-5 py-2.5 text-sm font-semibold text-white"
          >
            เลื่อนเป็น {nxt}
          </button>
        )}
        <Link
          href={`${BASE}/customers`}
          className="rounded-full border border-[#C8DED6] bg-white px-5 py-2.5 text-sm font-semibold text-[#2C5F4F]"
        >
          ดูลูกค้า
        </Link>
      </div>
    </div>
  );
}
