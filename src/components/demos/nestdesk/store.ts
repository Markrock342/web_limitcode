"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { pick, thaiName } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/cowork-desk";

export type SpaceType = "hotdesk" | "meeting";

export type Space = {
  id: string;
  name: string;
  type: SpaceType;
  capacity: number;
  price: number;
  unit: string;
  img: string;
  available: number;
  total: number;
  blurb: string;
};

export type NestBooking = {
  id: string;
  member: string;
  spaceId: string;
  spaceName: string;
  date: string;
  slot: string;
  type: SpaceType;
  img: string;
};

export type NestMember = {
  id: string;
  name: string;
  plan: string;
  status: "active" | "expired";
  expiry: string;
  checkedIn: boolean;
};

export type NestState = {
  session: DemoSession;
  spaces: Space[];
  bookings: NestBooking[];
  members: NestMember[];
  packages: { id: string; name: string; price: number; credits: string }[];
  bookSpaceId: string;
  bookDate: string;
  bookSlot: string | null;
  bookName: string;
  lastBookedId: string | null;
  query: string;
};

export const BOOK_DATES = ["วันนี้", "พรุ่งนี้", "พ. 16 ก.ค.", "พฤ. 17 ก.ค.", "ศ. 18 ก.ค."];
export const SLOTS = ["09:00–12:00", "12:00–15:00", "15:00–18:00", "ทั้งวัน"];

export const nestInitial: NestState = {
  session: GUEST_SESSION,
  spaces: [
    {
      id: "hd-open",
      name: "Hot Desk โซนเปิด",
      type: "hotdesk",
      capacity: 1,
      price: 350,
      unit: "วัน",
      img: "/img/work-1.jpg",
      available: 8,
      total: 12,
      blurb: "โต๊ะร่วม พลังงานสูง ใกล้กาแฟ",
    },
    {
      id: "hd-quiet",
      name: "Hot Desk โซนเงียบ",
      type: "hotdesk",
      capacity: 1,
      price: 420,
      unit: "วัน",
      img: "/img/work-2.jpg",
      available: 4,
      total: 8,
      blurb: "โฟกัสงานลึก ไม่มีเสียงคุย",
    },
    {
      id: "mt-small",
      name: "ห้องประชุม A",
      type: "meeting",
      capacity: 4,
      price: 800,
      unit: "ช่วง",
      img: "/img/work-3.jpg",
      available: 2,
      total: 3,
      blurb: "จอ TV + ไวท์บอร์ด · 4 ที่นั่ง",
    },
    {
      id: "mt-large",
      name: "ห้องประชุม B",
      type: "meeting",
      capacity: 10,
      price: 1500,
      unit: "ช่วง",
      img: "/img/office-hero.jpg",
      available: 1,
      total: 2,
      blurb: "ห้องใหญ่ พร้อมโปรเจคเตอร์",
    },
    { id: "focus-pod", name: "Focus Pod", type: "hotdesk", capacity: 1, price: 290, unit: "วัน", img: "/img/work-2.jpg", available: 5, total: 6, blurb: "มุมส่วนตัว สำหรับงานที่ต้องการสมาธิ" },
    { id: "mt-creative", name: "Creative Room", type: "meeting", capacity: 6, price: 1100, unit: "ช่วง", img: "/img/work-3.jpg", available: 2, total: 2, blurb: "กระดานเขียนเต็มผนัง และชุดประชุม" },
  ],
  bookings: Array.from({ length: 20 }, (_, i) => {
    const space = pick([
      { id: "hd-open", name: "Hot Desk โซนเปิด", type: "hotdesk" as const, img: "/img/work-1.jpg" },
      { id: "hd-quiet", name: "Hot Desk โซนเงียบ", type: "hotdesk" as const, img: "/img/work-2.jpg" },
      { id: "mt-small", name: "ห้องประชุม A", type: "meeting" as const, img: "/img/work-3.jpg" },
      { id: "mt-large", name: "ห้องประชุม B", type: "meeting" as const, img: "/img/office-hero.jpg" },
    ], i);
    return { id: `NB-${101 + i}`, member: thaiName(i + 7), spaceId: space.id, spaceName: space.name, date: pick(BOOK_DATES, i), slot: pick(SLOTS, i), type: space.type, img: space.img };
  }),
  members: Array.from({ length: 12 }, (_, i) => ({ id: `M-${String(i + 1).padStart(2, "0")}`, name: thaiName(i), plan: pick(["Day Pass", "Monthly Desk", "Flex 10 วัน"], i), status: i === 9 ? "expired" as const : "active" as const, expiry: `${10 + i}/0${(i % 3) + 7}/2569`, checkedIn: i % 4 === 0 })),
  packages: [
    { id: "day", name: "Day Pass", price: 350, credits: "ใช้ได้ 1 วัน" },
    { id: "flex", name: "Flex 10", price: 2800, credits: "10 วัน / 60 วัน" },
    { id: "monthly", name: "Monthly Desk", price: 4900, credits: "โต๊ะประจำ 1 เดือน" },
  ],
  bookSpaceId: "hd-open",
  bookDate: "วันนี้",
  bookSlot: null,
  bookName: "",
  lastBookedId: null,
  query: "",
};

const store = createDemoStore("lcs-demo-nestdesk-v2", nestInitial);
export const NestDeskProvider = store.Provider;
export const useNestDesk = store.useStore;

export const nestBrand: DemoBrandMeta = {
  slug: "cowork-desk",
  name: "NestDesk Cowork",
  subtitle: "จองโต๊ะ · ห้องประชุม · สมาชิก",
  accent: "bg-[#3D4F6F]",
  accentBg: "bg-[#EEF1F6]",
  accentText: "text-[#3D4F6F]",
};

export const nestNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/book`, label: "จองพื้นที่", group: "ทั่วไป" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ทั่วไป", access: "member" },
  { href: `${BASE}/spaces`, label: "แคตตาล็อกพื้นที่", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/members`, label: "สมาชิก", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/checkin`, label: "Check-in", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/admin`, label: "แอดมินวันนี้", group: "หลังบ้าน", access: "staff" },
];
