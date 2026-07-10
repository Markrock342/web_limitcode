"use client";

import Image from "next/image";
import { useShineAuto } from "../store";

const TIER_STYLE: Record<string, string> = {
  Platinum: "bg-slate-800 text-white",
  Gold: "bg-amber-400 text-amber-950",
  Silver: "bg-slate-300 text-slate-800",
  Member: "bg-[#E8EEF5] text-[#1F3A5F]",
};

export function ShineMembersPage() {
  const { state, setState } = useShineAuto();

  function addPoints(id: string, delta: number) {
    setState((s) => ({
      ...s,
      members: s.members.map((m) =>
        m.id === id ? { ...m, points: Math.max(0, m.points + delta) } : m,
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="relative h-36 sm:h-40">
          <Image src="/img/prod-5.jpg" alt="" fill className="object-cover" sizes="900px" />
          <div className="absolute inset-0 bg-[#142840]/70" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <h1 className="font-display text-2xl font-bold text-white">สมาชิกสะสมแต้ม</h1>
            <p className="mt-1 text-sm text-sky-50/90">{state.members.length} คน · เติม/หักแต้มได้ทันที</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {state.members.map((m) => (
          <article key={m.id} className="overflow-hidden rounded-2xl border border-[#D5DEEA] bg-white shadow-sm">
            <div className="relative h-28">
              <Image src={m.img} alt="" fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142840]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <div>
                  <p className="font-display font-bold text-white">{m.name}</p>
                  <p className="text-[11px] text-white/80">
                    {m.phone} · {m.visits} ครั้ง
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${TIER_STYLE[m.tier] ?? TIER_STYLE.Member}`}>
                  {m.tier}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-3.5">
              <div>
                <p className="text-xs text-slate-500">แต้มสะสม</p>
                <p className="font-display text-xl font-bold text-[#1F3A5F]">{m.points.toLocaleString()}</p>
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => addPoints(m.id, 100)}
                  className="rounded-full bg-[#1F3A5F] px-3 py-1.5 text-[11px] font-semibold text-white"
                >
                  +100
                </button>
                <button
                  type="button"
                  onClick={() => addPoints(m.id, -50)}
                  className="rounded-full border border-[#D5DEEA] px-3 py-1.5 text-[11px] font-semibold text-[#1F3A5F]"
                >
                  −50
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
