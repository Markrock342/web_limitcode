"use client";

import { MapPin } from "lucide-react";
import { ZONES, useQuickDrop } from "../store";

export function QuickZonesPage() {
  const { state } = useQuickDrop();

  const zoneCounts = ZONES.map((z) => ({
    ...z,
    count: state.orders.filter((o) => o.zone === z.name && o.status !== "done").length,
    done: state.orders.filter((o) => o.zone === z.name && o.status === "done").length,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-800">โซนจัดส่ง</h1>
        <p className="mt-1 text-sm text-slate-600">คิวค้างและส่งสำเร็จแยกตามโซน</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {zoneCounts.map((z) => (
          <div key={z.id} className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className={`grid size-9 place-items-center rounded-xl text-white ${z.color}`}>
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="font-display font-bold text-indigo-900">{z.name}</p>
                <p className="text-xs text-slate-500">โซนจัดส่ง</p>
              </div>
            </div>
            <div className="mt-4 flex gap-6">
              <div>
                <p className="font-display text-2xl font-bold text-[#ff6b4a]">{z.count}</p>
                <p className="text-xs text-slate-500">คิวค้าง</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-emerald-600">{z.done}</p>
                <p className="text-xs text-slate-500">ส่งแล้ววันนี้</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
