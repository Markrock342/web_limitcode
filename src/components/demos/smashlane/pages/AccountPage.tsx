"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, fmtDay, useSmashLane } from "../store";

export function SmashAccountPage() {
  const { state, setState } = useSmashLane();
  const isStaff = state.session.role === "staff";
  const bookings = state.bookings
    .filter(
      (booking) =>
        isStaff || booking.name === state.session.name || (state.phone.trim() !== "" && booking.phone === state.phone),
    )
    .sort((a, b) => `${a.date}-${a.hour}`.localeCompare(`${b.date}-${b.hour}`));

  function cancel(id: string) {
    setState((current) => ({
      ...current,
      bookings: current.bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled", court: null } : booking,
      ),
    }));
  }

  return (
    <RequireAuth session={state.session} basePath={BASE} mode="member">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-wide text-[#3953A4]">บัญชีของฉัน</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">
              {isStaff ? "รายการจองทั้งหมด" : state.session.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {isStaff ? "ตรวจสอบและยกเลิกรายการจองได้จากหน้านี้" : "ดูสถานะการจองและยกเลิกรายการที่ยังยืนยันอยู่"}
            </p>
          </div>
          <Link href={`${BASE}/book`} className="rounded-full bg-[#3953A4] px-4 py-2 text-sm font-semibold text-white">
            จองคอร์ทเพิ่ม
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <p className="font-medium text-slate-700">ยังไม่มีรายการจองในบัญชีนี้</p>
            <p className="mt-1 text-sm text-slate-500">เข้าสู่ระบบแบบ member แล้วจองคอร์ทเพื่อดูรายการที่นี่</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 border border-slate-200 bg-white">
            {bookings.map((booking) => (
              <article key={booking.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display font-bold text-slate-900">{booking.code}</h2>
                    <span
                      className={`px-2 py-0.5 text-[11px] font-bold ${
                        booking.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {booking.status === "confirmed" ? "ยืนยันแล้ว" : "ยกเลิกแล้ว"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {fmtDay(booking.date)} · {String(booking.hour).padStart(2, "0")}:00–{String(booking.hour + 1).padStart(2, "0")}:00
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {booking.name} · {booking.phone} · {booking.court ? `คอร์ท ${booking.court}` : "รอจัดคอร์ท"} · ฿
                    {booking.price.toLocaleString()}
                  </p>
                </div>
                {booking.status === "confirmed" && (
                  <button
                    type="button"
                    onClick={() => cancel(booking.id)}
                    className="border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                  >
                    ยกเลิกรายการ
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
