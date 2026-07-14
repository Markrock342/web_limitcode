"use client";

import Image from "next/image";
import { useFreshFold } from "../store";

export function FreshPricingPage() {
  const { state, setState } = useFreshFold();

  function toggleActive(id: string) {
    setState((s) => ({
      ...s,
      packages: s.packages.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    }));
  }

  function setPrice(id: string, price: number) {
    setState((s) => ({
      ...s,
      packages: s.packages.map((p) =>
        p.id === id ? { ...p, price: Number.isFinite(price) ? price : p.price } : p,
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-44">
          <Image src="/img/laundry/shirt.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#1A3D34]/75" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            <h1 className="font-display text-2xl font-bold text-white">แพ็กเกจ CMS</h1>
            <p className="mt-1 text-sm text-emerald-50/90">เปิด/ปิดแพ็กเกจและแก้ราคา</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {state.packages.map((p) => (
          <div
            key={p.id}
            className={`overflow-hidden rounded-2xl border shadow-sm ${
              p.active ? "border-[#C8DED6] bg-white" : "border-slate-200 bg-slate-50 opacity-80"
            }`}
          >
            <div className="relative aspect-[16/9]">
              <Image src={p.img} alt={p.name} fill className="object-cover" sizes="400px" />
              {!p.active && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">ปิดขาย</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-display font-bold ${p.active ? "text-[#1A3D34]" : "text-slate-400 line-through"}`}>
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">{p.blurb}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActive(p.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                    p.active ? "bg-emerald-100 text-emerald-800" : "bg-rose-600 text-white"
                  }`}
                >
                  {p.active ? "เปิดอยู่" : "ปิดอยู่"}
                </button>
              </div>

              {state.editPriceId === p.id ? (
                <div className="mt-3 flex items-end gap-2">
                  <label className="block flex-1 text-xs text-slate-500">
                    ราคา (บาท/{p.unit})
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => setPrice(p.id, Number(e.target.value))}
                      className="mt-1 w-full rounded-lg border border-[#C8DED6] px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#2C5F4F]/30"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setState((s) => ({ ...s, editPriceId: null }))}
                    className="rounded-full bg-[#2C5F4F] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    บันทึก
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-display text-xl font-bold text-[#2C5F4F]">
                    ฿{p.price.toLocaleString()}
                    <span className="text-xs font-medium text-slate-400">/{p.unit}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setState((s) => ({ ...s, editPriceId: p.id }))}
                    className="rounded-full bg-[#E8F2EE] px-3 py-1.5 text-xs font-semibold text-[#2C5F4F]"
                  >
                    แก้ราคา
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
