"use client";

import Link from "next/link";
import { Bus, Clock3, Wrench } from "lucide-react";
import {
  BASE,
  dailyByTech,
  jobsBreakdown,
  pendingByTech,
  useBlueRoute,
} from "../store";

const BREAKDOWN_DAYS = [
  { day: "9 ก.ค.", open: 1, closed: 0 },
  { day: "10 ก.ค.", open: 0, closed: 1 },
  { day: "11 ก.ค.", open: 1, closed: 0 },
];

export function BlueHomePage() {
  const { state } = useBlueRoute();
  const daily = dailyByTech(state.jobs);
  const pending = pendingByTech(state.jobs);
  const breakdownCount = jobsBreakdown(state.jobs).length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#C9A227]/40 bg-[#FFF8E8] px-4 py-3 text-sm text-[#6B5A20]">
        ม็อกอัพหลายหน้า — งานประจำวัน งานค้างซ่อม เสียกลางทาง ค้นหารถ และสรุปงานพร้อมอะไหล่ ข้อมูลเก็บในเบราว์เซอร์
      </div>

      {!state.session.loggedIn && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E3E7F0] bg-white px-4 py-3">
          <p className="text-sm text-[#6B7693]">ยังไม่ได้เข้าสู่ระบบ — ลองล็อกอินเดโมได้</p>
          <Link
            href={`${BASE}/login`}
            className="rounded-full bg-[#16234A] px-4 py-2 text-xs font-semibold text-white"
          >
            ไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      )}

      <div>
        <h1 className="font-display text-2xl font-bold text-[#16234A]">Dashboard งานซ่อมบำรุง</h1>
        <p className="mt-1 text-sm text-[#6B7693]">
          11 ก.ค. 2569 · BlueRoute Transport
          {state.session.loggedIn ? " · ออนไลน์" : ""}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-[#E3E7F0] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Wrench className="size-4 text-[#2E4A8A]" />
            <h2 className="font-display font-bold text-[#16234A]">งานประจำวัน</h2>
          </div>
          <p className="mt-1 text-xs text-[#6B7693]">แตะช่างเพื่อดูรายการ</p>
          <div className="mt-4 space-y-3">
            {daily.map((row) => (
              <Link
                key={row.tech}
                href={`${BASE}/jobs?mode=day&tech=${encodeURIComponent(row.tech)}`}
                className="block"
              >
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{row.tech}</span>
                  <span className="font-bold text-[#2E4A8A]">{row.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#EDF0F6]">
                  <div
                    className="h-full rounded-full bg-[#2E4A8A]"
                    style={{ width: `${Math.min(100, row.count * 28)}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`${BASE}/jobs?mode=day`}
            className="mt-4 block w-full rounded-full border border-[#E3E7F0] py-2 text-center text-xs font-semibold text-[#2E4A8A]"
          >
            ดูทั้งหมดวันนี้
          </Link>
        </section>

        <section className="rounded-2xl border border-[#E3E7F0] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock3 className="size-4 text-[#C9A227]" />
            <h2 className="font-display font-bold text-[#16234A]">งานค้างซ่อม</h2>
          </div>
          <p className="mt-1 text-xs text-[#6B7693]">สถานะกำลังซ่อมทั้งหมด</p>
          <div className="mt-4 space-y-3">
            {pending.map((row) => (
              <Link
                key={row.tech}
                href={`${BASE}/jobs?mode=pending&tech=${encodeURIComponent(row.tech)}`}
                className="block"
              >
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{row.tech}</span>
                  <span className="font-bold text-[#C9A227]">{row.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#EDF0F6]">
                  <div
                    className="h-full rounded-full bg-[#C9A227]"
                    style={{ width: `${Math.min(100, row.count * 35)}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`${BASE}/jobs?mode=pending`}
            className="mt-4 block w-full rounded-full border border-[#E3E7F0] py-2 text-center text-xs font-semibold text-[#2E4A8A]"
          >
            ดูทั้งหมด
          </Link>
        </section>

        <section className="rounded-2xl border border-[#E3E7F0] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Bus className="size-4 text-rose-500" />
            <h2 className="font-display font-bold text-[#16234A]">เสียกลางทาง</h2>
          </div>
          <p className="mt-1 text-xs text-[#6B7693]">
            3 วันล่าสุด · รวม {breakdownCount} งานในเดโม
          </p>
          <div className="mt-4 flex h-36 items-end gap-3">
            {BREAKDOWN_DAYS.map((d) => {
              const total = d.open + d.closed;
              return (
                <Link
                  key={d.day}
                  href={`${BASE}/breakdown`}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <div className="flex h-24 w-full flex-col justify-end overflow-hidden rounded-t-lg bg-[#EDF0F6]">
                    <div
                      className="bg-[#1FA97A]"
                      style={{ height: `${(d.closed / Math.max(total, 1)) * 100}%` }}
                    />
                    <div
                      className="bg-[#E5544B]"
                      style={{ height: `${(d.open / Math.max(total, 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#6B7693]">{d.day}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-3 flex gap-3 text-[11px] text-[#6B7693]">
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-[#E5544B]" /> เปิด
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-sm bg-[#1FA97A]" /> ปิดแล้ว
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-[#C9D0E0] bg-white/70 p-5 lg:col-span-3">
          <p className="text-sm font-semibold text-[#16234A]">ทางลัด</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Link
              href={`${BASE}/vehicles`}
              className="rounded-xl bg-[#F5F7FC] px-4 py-3 text-sm font-medium text-[#16234A] transition hover:bg-[#EEF1F7]"
            >
              ค้นหารถ ›
            </Link>
            <Link
              href={`${BASE}/jobs`}
              className="rounded-xl bg-[#F5F7FC] px-4 py-3 text-sm font-medium text-[#16234A] transition hover:bg-[#EEF1F7]"
            >
              รายการงานทั้งหมด ›
            </Link>
            <Link
              href={`${BASE}/breakdown`}
              className="rounded-xl bg-[#F5F7FC] px-4 py-3 text-sm font-medium text-[#16234A] transition hover:bg-[#EEF1F7]"
            >
              เสียกลางทาง ›
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
