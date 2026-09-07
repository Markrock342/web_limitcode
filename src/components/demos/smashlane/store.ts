"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { fmtThDate, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const COURTS = 25;
export const SMALL_COURTS = Array.from({ length: 7 }, (_, index) => index + 1);
export const LARGE_COURTS = Array.from({ length: 18 }, (_, index) => index + 8);
export const HOURS = [14, 15, 16, 17, 18, 19, 20, 21];
export const BASE = "/demo/court-booking";

export type CourtZone = "small" | "large";

export type Booking = {
  id: string;
  code: string;
  date: string;
  hour: number;
  price: number;
  tier: string;
  name: string;
  phone: string;
  court: number | null;
  paid: boolean;
  status: "confirmed" | "cancelled";
  walkin?: boolean;
};

export type SmashState = {
  session: DemoSession;
  bookings: Booking[];
  locked: string[];
  selectedHours: number[];
  dateIdx: number;
  name: string;
  phone: string;
  lastCode: string | null;
  selectedZone: CourtZone;
};

export const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + i);
  return d.toISOString().slice(0, 10);
});

export function tierFor(hour: number) {
  if (hour >= 17) return { id: "normal", price: 240, label: "ราคาปกติ" };
  return { id: "promo", price: 150, label: "โปรฯ บ่าย" };
}

export function courtsForZone(zone: CourtZone) {
  return zone === "small" ? SMALL_COURTS : LARGE_COURTS;
}

export function zoneLabel(zone: CourtZone) {
  return zone === "small" ? "สนามเล็ก 1–7" : "สนามใหญ่ 8–25";
}

export function priceForZone(hour: number, zone: CourtZone, largeCourtsFull: boolean) {
  const base = tierFor(hour);
  const fallbackPromo = zone === "small" && hour < 17 && largeCourtsFull;
  if (base.id === "promo" && (zone === "large" || fallbackPromo)) {
    return {
      ...base,
      id: fallbackPromo ? "large-full-promo" : base.id,
      label: fallbackPromo ? "โปรสนามใหญ่เต็ม" : base.label,
      detail: fallbackPromo ? "สนาม 8–25 เต็มในช่วงเวลานี้" : "ราคาโปรสนามใหญ่",
    };
  }
  return { ...base, detail: "ราคามาตรฐาน" };
}

export function fmtDay(dateStr: string) {
  return fmtThDate(dateStr);
}

function seedBookings(date: string): Booking[] {
  const out: Booking[] = [];
  let n = 0;
  for (const hour of HOURS) {
    const largePromoSlotFull = date === day0 && hour >= 14 && hour < 17;
    const seededCourts = largePromoSlotFull
      ? LARGE_COURTS
      : Array.from({ length: hour >= 18 ? 5 : hour >= 17 ? 4 : 3 }, (_, index) => ((index * 3 + hour) % COURTS) + 1);
    for (const court of seededCourts) {
      n += 1;
      out.push({
        id: `seed-${date}-${hour}-${n}`,
        code: `SLA-${date.replaceAll("-", "").slice(2)}-${1000 + n}`,
        date,
        hour,
        price: tierFor(hour).price,
        tier: tierFor(hour).id,
        name: thaiName(n),
        phone: thaiPhone(n),
        court,
        paid: true,
        status: "confirmed",
      });
    }
  }
  return out;
}

export function bookingCode(date: string) {
  return `SLA-${date.replaceAll("-", "").slice(2)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

const day0 = DATES[0];

export const smashInitial: SmashState = {
  session: GUEST_SESSION,
  bookings: DATES.flatMap(seedBookings),
  locked: [`${day0}|3|18`, `${day0}|4|18`],
  selectedHours: [18],
  dateIdx: 0,
  name: "คุณมาร์ค",
  phone: "081-234-5678",
  lastCode: null,
  selectedZone: "small",
};

const store = createDemoStore("lcs-demo-smashlane-v2", smashInitial);
export const SmashLaneProvider = store.Provider;
export const useSmashLane = store.useStore;

export const smashBrand: DemoBrandMeta = {
  slug: "court-booking",
  name: "SmashLane Arena",
  subtitle: "จองคอร์ท + หลังบ้านจัดคอร์ท",
  accent: "bg-[#3953A4]",
  accentBg: "bg-[#3953A4]/10",
  accentText: "text-[#3953A4]",
};

export const smashNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป", access: "all" },
  { href: `${BASE}/book`, label: "จองคอร์ท", group: "ลูกค้า", access: "all" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/admin`, label: "คิวจัดคอร์ท", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/admin/grid`, label: "ตารางคอร์ท", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "บัญชี", access: "all" },
];

export function ensureDateSeeded(state: SmashState, dateIdx: number): SmashState {
  const date = DATES[dateIdx];
  if (state.bookings.some((b) => b.date === date)) return { ...state, dateIdx };
  return { ...state, dateIdx, bookings: [...state.bookings, ...seedBookings(date)] };
}
