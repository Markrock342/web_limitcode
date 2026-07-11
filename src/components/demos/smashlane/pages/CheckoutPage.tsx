"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { QrCode } from "lucide-react";
import { BASE, DATES, bookingCode, fmtDay, tierFor, useSmashLane } from "../store";

export function SmashCheckoutPage() {
  const router = useRouter();
  const { state, setState } = useSmashLane();
  const date = DATES[state.dateIdx];
  const total = state.selectedHours.reduce((s, h) => s + tierFor(h).price, 0);
  const bookingName = state.session.role === "member" ? state.session.name : state.name;

  if (state.selectedHours.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">ยังไม่ได้เลือกช่วงเวลา</p>
        <Link href={`${BASE}/book`} className="mt-4 inline-flex rounded-full bg-[#3953A4] px-5 py-2.5 text-sm font-semibold text-white">
          กลับไปจอง
        </Link>
      </div>
    );
  }

  function pay() {
    const code = bookingCode(date);
    const created = state.selectedHours.map((hour, i) => ({
      id: `user-${Date.now()}-${hour}`,
      code: i === 0 ? code : `${code}-${i + 1}`,
      date,
      hour,
      price: tierFor(hour).price,
      tier: tierFor(hour).id,
      name: bookingName,
      phone: state.phone,
      court: null as number | null,
      paid: true,
      status: "confirmed" as const,
    }));
    setState((s) => ({
      ...s,
      bookings: [...s.bookings, ...created],
      selectedHours: [],
      lastCode: code,
    }));
    router.push(`${BASE}/success`);
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#3953A4]">ชำระเงิน</h1>
        <p className="mt-1 text-sm text-slate-600">{fmtDay(date)}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ul className="space-y-2 text-sm">
          {state.selectedHours.map((h) => (
            <li key={h} className="flex justify-between">
              <span>
                {String(h).padStart(2, "0")}:00–{String(h + 1).padStart(2, "0")}:00
              </span>
              <span className="font-semibold">฿{tierFor(h).price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between border-t border-slate-100 pt-3 font-bold text-[#3953A4]">
          <span>รวม</span>
          <span>฿{total.toLocaleString()}</span>
        </p>
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
        <label className="block text-sm">
          <span className="font-medium">ชื่อผู้จอง</span>
          <input
            value={state.session.role === "member" ? state.session.name : state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            disabled={state.session.role === "member"}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#3953A4]"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">เบอร์โทร</span>
          <input
            value={state.phone}
            onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#3953A4]"
          />
        </label>
      </div>
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#3953A4]/40 bg-[#3953A4]/5 p-6">
        <QrCode className="size-24 text-[#3953A4]" />
        <p className="mt-3 font-display font-bold text-[#3953A4]">PromptPay (เดโม)</p>
        <p className="text-sm text-slate-500">ยอด ฿{total.toLocaleString()}</p>
      </div>
      <button
        type="button"
        onClick={pay}
        disabled={!bookingName.trim() || !state.phone.trim()}
        className="w-full rounded-full bg-[#EB8824] py-3 text-sm font-semibold text-white disabled:opacity-40"
      >
        ชำระเงินแล้ว (เดโม)
      </button>
    </div>
  );
}
