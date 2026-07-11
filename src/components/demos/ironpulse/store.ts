"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, isoDateOffset, pick, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/gym-admin";

export type MemberStatus = "active" | "expired";

export type Member = {
  id: string;
  name: string;
  phone: string;
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

export type CheckinRecord = { id: string; memberId: string; member: string; at: string };

export type IronState = {
  session: DemoSession;
  members: Member[];
  classes: GymClass[];
  packages: Package[];
  checkins: CheckinRecord[];
  day: string;
  query: string;
  editId: string | null;
};

export const DAYS = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
export const DAY_FULL = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"];

const MEMBER_PLANS = ["Basic 8 ครั้ง", "12 ครั้ง", "Pro 30 วัน", "Unlimited"] as const;
const CLASS_NAMES = ["HIIT Burn", "Yoga Flow", "Spin Power", "Boxing Fundamentals", "Core Blast", "Stretch & Recover", "Strength Lab", "Pilates Align", "Dance Cardio", "Mobility Reset", "Barbell Basics", "Kickboxing"] as const;

const members: Member[] = Array.from({ length: 24 }, (_, index) => {
  const n = index + 1;
  const status: MemberStatus = n % 6 === 0 ? "expired" : "active";
  return {
    id: demoId("M", n),
    name: thaiName(n + 10),
    phone: thaiPhone(n + 10),
    plan: pick(MEMBER_PLANS, n),
    expiry: new Date(`${isoDateOffset(status === "active" ? 20 + n : -n)}T12:00:00`).toLocaleDateString("th-TH"),
    status,
    checkedIn: n % 5 === 0,
  };
});

const classes: GymClass[] = Array.from({ length: 12 }, (_, index) => {
  const n = index + 1;
  const seats = 12 + (n % 4) * 4;
  const booked = n === 5 ? seats : Math.min(seats - 1, 4 + ((n * 3) % seats));
  return { id: demoId("C", n), name: pick(CLASS_NAMES, n - 1), time: pick(["06:30", "08:00", "09:30", "12:15", "17:30", "19:00"], n), day: pick(DAYS, n - 1), seats, booked, mine: n === 2 };
});

export const ironInitial: IronState = {
  session: GUEST_SESSION,
  members,
  classes,
  packages: [
    { id: "p1", name: "Starter 4 ครั้ง", quota: 4, price: 1190, popular: false },
    { id: "p2", name: "Basic 8 ครั้ง", quota: 8, price: 1990, popular: false },
    { id: "p3", name: "Flex 12 ครั้ง", quota: 12, price: 2590, popular: false },
    { id: "p4", name: "Pro 30 วัน", quota: 30, price: 2990, popular: true },
    { id: "p5", name: "Unlimited", quota: 999, price: 4490, popular: false },
    { id: "p6", name: "Couple Unlimited", quota: 999, price: 7590, popular: false },
  ],
  checkins: Array.from({ length: 18 }, (_, index) => {
    const member = pick(members, index);
    return { id: demoId("CI", index + 1), memberId: member.id, member: member.name, at: `${isoDateOffset(-(index % 6))} ${pick(["06:52", "08:14", "12:07", "17:48", "19:22"], index)}` };
  }),
  day: "จ",
  query: "",
  editId: null,
};

const store = createDemoStore("lcs-demo-ironpulse-v2", ironInitial);
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
  { href: `${BASE}/members`, label: "สมาชิก", group: "ปฏิบัติการ", access: "staff" },
  { href: `${BASE}/classes`, label: "คลาส", group: "ปฏิบัติการ", access: "staff" },
  { href: `${BASE}/checkin`, label: "Check-in", group: "ปฏิบัติการ", access: "staff" },
  { href: `${BASE}/packages`, label: "แพ็กเกจ", group: "CMS", access: "staff" },
  { href: `${BASE}/reports`, label: "รายงาน", group: "CMS", access: "staff" },
  { href: `${BASE}/book-class`, label: "จองคลาส", group: "สมาชิก", access: "member" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "สมาชิก", access: "member" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "ทั่วไป", access: "guest" },
];
