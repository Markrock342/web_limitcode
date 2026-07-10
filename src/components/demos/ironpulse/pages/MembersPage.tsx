"use client";

import { RefreshCw } from "lucide-react";
import { useIronPulse } from "../store";

export function IronMembersPage() {
  const { state, setState } = useIronPulse();

  function renew(id: string) {
    setState((s) => ({
      ...s,
      members: s.members.map((m) =>
        m.id === id
          ? { ...m, status: "active" as const, expiry: "11/10/2569", plan: m.plan.includes("ครั้ง") ? "12 ครั้ง" : m.plan }
          : m,
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-lime-800">สมาชิก</h1>
        <p className="mt-1 text-sm text-slate-600">{state.members.length} คน · กดต่ออายุเมื่อหมดอายุ</p>
      </div>
      <ul className="space-y-3">
        {state.members.map((m) => (
          <li
            key={m.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">
                {m.plan} · หมดอายุ {m.expiry}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  m.status === "active" ? "bg-lime-50 text-lime-800" : "bg-orange-50 text-orange-700"
                }`}
              >
                {m.status === "active" ? "ใช้งาน" : "หมดอายุ"}
              </span>
              {m.status === "expired" && (
                <button
                  type="button"
                  onClick={() => renew(m.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-bold text-lime-100 hover:bg-zinc-800"
                >
                  <RefreshCw className="size-3" /> ต่ออายุ
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
