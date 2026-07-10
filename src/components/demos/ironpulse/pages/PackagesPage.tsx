"use client";

import { Star } from "lucide-react";
import { useIronPulse } from "../store";

export function IronPackagesPage() {
  const { state, setState } = useIronPulse();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-lime-800">แพ็กเกจ</h1>
        <p className="mt-1 text-sm text-slate-600">แก้โควต้า / ราคา และตั้ง Popular</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {state.packages.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl border p-5 shadow-sm ${
              p.popular ? "border-lime-300 bg-lime-50" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display font-bold text-slate-900">{p.name}</h3>
              {p.popular && <Star className="size-4 fill-lime-600 text-lime-600" />}
            </div>
            {state.editId === p.id ? (
              <div className="mt-3 space-y-2">
                <label className="block text-xs text-slate-500">
                  โควต้า
                  <input
                    type="number"
                    value={p.quota}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        packages: s.packages.map((x) =>
                          x.id === p.id ? { ...x, quota: Number(e.target.value) || 0 } : x,
                        ),
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </label>
                <label className="block text-xs text-slate-500">
                  ราคา (บาท)
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        packages: s.packages.map((x) =>
                          x.id === p.id ? { ...x, price: Number(e.target.value) || 0 } : x,
                        ),
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setState((s) => ({ ...s, editId: null }))}
                  className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-bold text-lime-100"
                >
                  บันทึก
                </button>
              </div>
            ) : (
              <>
                <p className="mt-2 text-2xl font-bold text-lime-800">฿{p.price.toLocaleString()}</p>
                <p className="text-xs text-slate-500">โควต้า {p.quota === 999 ? "ไม่จำกัด" : `${p.quota} ครั้ง`}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setState((s) => ({ ...s, editId: p.id }))}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    แก้ไข
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        packages: s.packages.map((x) => ({
                          ...x,
                          popular: x.id === p.id ? !x.popular : false,
                        })),
                      }))
                    }
                    className="rounded-full border border-orange-300 px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-50"
                  >
                    {p.popular ? "ยกเลิก Popular" : "ตั้ง Popular"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
