"use client";

import Image from "next/image";
import Link from "next/link";
import { BASE, PICKUP_DATES, useFreshFold } from "../store";

export function FreshPickupPage() {
  const { state, setState } = useFreshFold();
  const pkg = state.packages.find((p) => p.id === state.formPackageId) ?? state.packages[0];
  const activePkgs = state.packages.filter((p) => p.active);

  function confirmPickup() {
    if (!state.formName.trim() || !state.formAddress.trim()) return;
    const id = `LF-${200 + state.orders.length}`;
    const customerName = state.formName.trim();
    const address = state.formAddress.trim();
    setState((s) => ({
      ...s,
      orders: [
        {
          id,
          customer: customerName,
          address,
          packageId: pkg.id,
          packageName: pkg.name,
          pickupDate: s.formDate,
          status: "รับแล้ว",
          note: "",
          img: pkg.img,
          memberUsername: s.session.loggedIn ? s.session.username : undefined,
        },
        ...s.orders,
      ],
      customers: s.customers.some((c) => c.name === customerName)
        ? s.customers
        : [
            ...s.customers,
            {
              id: `C-${10 + s.customers.length}`,
              name: customerName,
              phone: "-",
              address,
              note: "",
            },
          ],
      lastPickupId: id,
      formName: "",
      formAddress: "",
    }));
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative aspect-[21/8] min-h-[140px] sm:aspect-[3/1]">
          <Image src={pkg.img} alt={pkg.name} fill priority className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D34] via-[#1A3D34]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-xs font-semibold tracking-wide text-emerald-100/90">เรียกรับผ้า · FreshFold</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{pkg.name}</h1>
            <p className="mt-1 text-sm text-emerald-50/90">
              {pkg.blurb} · ฿{pkg.price.toLocaleString()}/{pkg.unit}
            </p>
          </div>
        </div>
      </div>

      <section>
        <p className="mb-3 text-sm font-semibold text-[#1A3D34]">เลือกแพ็กเกจ</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {activePkgs.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setState((st) => ({ ...st, formPackageId: p.id }))}
              className={`flex overflow-hidden rounded-2xl border text-left transition ${
                state.formPackageId === p.id
                  ? "border-[#2C5F4F] bg-[#E8F2EE] ring-2 ring-[#2C5F4F]/25"
                  : "border-slate-200 bg-white hover:border-[#2C5F4F]/40"
              }`}
            >
              <span className="relative block h-[5.5rem] w-24 shrink-0 sm:w-28">
                <Image src={p.img} alt="" fill className="object-cover" sizes="112px" />
              </span>
              <span className="flex flex-1 flex-col justify-center p-3">
                <span className="font-display font-bold text-[#1A3D34]">{p.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">
                  ฿{p.price.toLocaleString()}/{p.unit}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[#C8DED6] bg-white p-5">
          <p className="text-sm font-semibold text-[#1A3D34]">วันรับผ้า</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PICKUP_DATES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setState((st) => ({ ...st, formDate: d }))}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold ${
                  state.formDate === d ? "bg-[#2C5F4F] text-white" : "bg-[#F4FAF7] text-[#2C5F4F]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#1A3D34]">ที่อยู่รับผ้า</p>
          <textarea
            value={state.formAddress}
            onChange={(e) => setState((st) => ({ ...st, formAddress: e.target.value }))}
            placeholder="บ้านเลขที่ / คอนโด / จุดนัดรับ"
            rows={3}
            className="mt-3 w-full rounded-xl border border-[#C8DED6] bg-[#F4FAF7] px-3 py-2.5 text-sm outline-none focus:border-[#2C5F4F]"
          />
        </section>

        <section className="rounded-2xl border border-[#C8DED6] bg-[#F4FAF7] p-5">
          <p className="text-sm font-semibold text-[#1A3D34]">ข้อมูลลูกค้า</p>
          <div className="mt-3 space-y-3">
            <input
              value={state.formName}
              onChange={(e) => setState((st) => ({ ...st, formName: e.target.value }))}
              placeholder="ชื่อลูกค้า"
              className="w-full rounded-xl border border-[#C8DED6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2C5F4F]"
            />
            <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
              <p className="font-semibold text-[#2C5F4F]">สรุป</p>
              <p className="mt-1">
                {pkg.name} · {state.formDate} · {state.formAddress.trim() || "ยังไม่ระบุที่อยู่"}
              </p>
            </div>
            <button
              type="button"
              onClick={confirmPickup}
              disabled={!state.formName.trim() || !state.formAddress.trim()}
              className="w-full rounded-full bg-[#2C5F4F] py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              ยืนยันเรียกรับผ้า
            </button>
            {state.lastPickupId && (
              <p className="text-center text-sm font-medium text-emerald-700">
                สร้างงาน {state.lastPickupId} —{" "}
                <Link href={`${BASE}/orders`} className="underline">
                  ดูบอร์ดงาน
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
