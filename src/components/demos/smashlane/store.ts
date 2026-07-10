"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const COURTS = 12;
export const HOURS = [14, 15, 16, 17, 18, 19, 20, 21];
export const BASE = "/demo/court-booking";

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
  walkin?: boolean;
};

export type SmashState = {
  bookings: Booking[];
  locked: string[];
  selectedHours: number[];
  dateIdx: number;
  name: string;
  phone: string;
  lastCode: string | null;
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

export function fmtDay(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("th-TH", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function seedBookings(date: string): Booking[] {
  const names = ["คุณมาร์ค", "คุณน็อต", "คุณแบงค์", "คุณออย", "คุณมิ้นท์", "คุณต้น"];
  const out: Booking[] = [];
  let n = 0;
  for (const hour of HOURS) {
    const fill = hour >= 18 ? 4 : hour >= 17 ? 3 : 2;
    for (let i = 0; i < fill; i++) {
      n += 1;
      const assigned = i < Math.ceil(fill * 0.6);
      out.push({
        id: `seed-${date}-${hour}-${i}`,
        code: `SLA-${date.replaceAll("-", "").slice(2)}-${1000 + n}`,
        date,
        hour,
        price: tierFor(hour).price,
        tier: tierFor(hour).id,
        name: names[(hour + i) % names.length],
        phone: `08${(hour + i) % 10}-xxx-xx${i}${hour % 10}`,
        court: assigned ? ((i * 3 + hour) % COURTS) + 1 : null,
        paid: true,
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
  bookings: seedBookings(day0),
  locked: [`${day0}|3|18`, `${day0}|4|18`],
  selectedHours: [18],
  dateIdx: 0,
  name: "คุณมาร์ค",
  phone: "081-234-5678",
  lastCode: null,
};

const store = createDemoStore("lcs-demo-smashlane-v1", smashInitial);
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
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/book`, label: "จองคอร์ท", group: "ลูกค้า" },
  { href: `${BASE}/checkout`, label: "ชำระเงิน", group: "ลูกค้า" },
  { href: `${BASE}/success`, label: "จองสำเร็จ", group: "ลูกค้า" },
  { href: `${BASE}/admin`, label: "คิวจัดคอร์ท", group: "หลังบ้าน" },
  { href: `${BASE}/admin/grid`, label: "ตารางคอร์ท", group: "หลังบ้าน" },
];

export function ensureDateSeeded(state: SmashState, dateIdx: number): SmashState {
  const date = DATES[dateIdx];
  if (state.bookings.some((b) => b.date === date)) return { ...state, dateIdx };
  return { ...state, dateIdx, bookings: [...state.bookings, ...seedBookings(date)] };
}
