"use client";

import { Bike } from "lucide-react";
import { useQuickDrop } from "../store";

export function QuickCouriersPage() {
  const { state, setState } = useQuickDrop();

  function toggleCourier(id: string) {
    setState((s) => ({
      ...s,
      couriers: s.couriers.map((c) => (c.id === id ? { ...c, online: !c.online } : c)),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-indigo-800">พนักงานส่ง</h1>
        <p className="mt-1 text-sm text-slate-600">สลับออนไลน์/ออฟไลน์ และดูงานค้าง</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {state.couriers.map((c) => {
          const assigned = state.orders.filter(
            (o) => o.courierId === c.id && o.status !== "done",
          ).length;
          return (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-10 place-items-center rounded-full ${
                    c.online ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Bike className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-slate-500">งานค้าง {assigned} ออเดอร์</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleCourier(c.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  c.online ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {c.online ? "ออนไลน์" : "ออฟไลน์"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
