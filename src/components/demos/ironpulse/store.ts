"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/gym-admin";

export type MemberStatus = "active" | "expired";

export type Member = {
  id: string;
  name: string;
  plan: string;
  expiry: string;
  status: MemberStatus;
  checkedIn: boolean;
};

export type GymClass = {
  id: string;
  name: string;
  time: string;
  day: string;
  seats: number;
  booked: number;
  mine: boolean;
};

export type Package = {
  id: string;
  name: string;
  quota: number;
  price: number;
  popular: boolean;
};

export type IronState = {
  members: Member[];
  classes: GymClass[];
  packages: Package[];
  day: string;
  query: string;
  editId: string | null;
};

export const DAYS = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
export const DAY_FULL = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"];

export const ironInitial: IronState = {
  members: [
    { id: "m1", name: "คุณอาร์ม", plan: "Unlimited", expiry: "15/09/2569", status: "active", checkedIn: false },
    { id: "m2", name: "คุณมิ้นท์", plan: "12 ครั้ง", expiry: "02/07/2569", status: "expired", checkedIn: false },
    { id: "m3", name: "คุณต้น", plan: "Pro 30 วัน", expiry: "28/08/2569", status: "active", checkedIn: true },
    { id: "m4", name: "คุณนานา", plan: "Basic", expiry: "20/06/2569", status: "expired", checkedIn: false },
    { id: "m5", name: "คุณแบงค์", plan: "Unlimited", expiry: "10/10/2569", status: "active", checkedIn: false },
  ],
  classes: [
    { id: "c1", name: "HIIT Burn", time: "07:00", day: "จ", seats: 20, booked: 14, mine: false },
    { id: "c2", name: "Yoga Flow", time: "09:30", day: "จ", seats: 15, booked: 10, mine: true },
    { id: "c3", name: "Spin Power", time: "18:00", day: "อ", seats: 25, booked: 22, mine: false },
    { id: "c4", name: "Boxing", time: "19:30", day: "พ", seats: 12, booked: 8, mine: false },
    { id: "c5", name: "Core Blast", time: "08:00", day: "ศ", seats: 18, booked: 18, mine: false },
    { id: "c6", name: "Stretch & Recover", time: "10:00", day: "ส", seats: 16, booked: 5, mine: false },
  ],
  packages: [
    { id: "p1", name: "Basic 8 ครั้ง", quota: 8, price: 1990, popular: false },
    { id: "p2", name: "Pro 30 วัน", quota: 30, price: 2990, popular: true },
    { id: "p3", name: "Unlimited", quota: 999, price: 4490, popular: false },
  ],
  day: "จ",
  query: "",
  editId: null,
};

const store = createDemoStore("lcs-demo-ironpulse-v1", ironInitial);
export const IronPulseProvider = store.Provider;
export const useIronPulse = store.useStore;

export const ironBrand: DemoBrandMeta = {
  slug: "gym-admin",
  name: "IronPulse Gym",
  subtitle: "สมาชิก · คลาส · Check-in",
  accent: "bg-zinc-900",
  accentBg: "bg-lime-50",
  accentText: "text-lime-800",
};

export const ironNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/members`, label: "สมาชิก", group: "ปฏิบัติการ" },
  { href: `${BASE}/classes`, label: "คลาส", group: "ปฏิบัติการ" },
  { href: `${BASE}/checkin`, label: "Check-in", group: "ปฏิบัติการ" },
  { href: `${BASE}/packages`, label: "แพ็กเกจ", group: "CMS" },
  { href: `${BASE}/reports`, label: "รายงาน", group: "CMS" },
];
