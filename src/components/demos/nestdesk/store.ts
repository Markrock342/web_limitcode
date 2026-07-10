"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
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
  spaces: Space[];
  bookings: NestBooking[];
  members: NestMember[];
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
  ],
  bookings: [
    {
      id: "NB-101",
      member: "คุณมิ้นท์",
      spaceId: "hd-open",
      spaceName: "Hot Desk โซนเปิด",
      date: "วันนี้",
      slot: "ทั้งวัน",
      type: "hotdesk",
      img: "/img/work-1.jpg",
    },
    {
      id: "NB-102",
      member: "คุณแบงค์",
      spaceId: "mt-small",
      spaceName: "ห้องประชุม A",
      date: "วันนี้",
      slot: "09:00–12:00",
      type: "meeting",
      img: "/img/work-3.jpg",
    },
    {
      id: "NB-103",
      member: "คุณออย",
      spaceId: "hd-quiet",
      spaceName: "Hot Desk โซนเงียบ",
      date: "วันนี้",
      slot: "12:00–15:00",
      type: "hotdesk",
      img: "/img/work-2.jpg",
    },
  ],
  members: [
    { id: "M-01", name: "คุณมิ้นท์", plan: "Day Pass", status: "active", expiry: "11/10/2569", checkedIn: true },
    { id: "M-02", name: "คุณแบงค์", plan: "Monthly Desk", status: "active", expiry: "01/08/2569", checkedIn: false },
    { id: "M-03", name: "คุณออย", plan: "Flex 10 วัน", status: "active", expiry: "20/09/2569", checkedIn: false },
    { id: "M-04", name: "คุณน็อต", plan: "Monthly Desk", status: "expired", expiry: "01/06/2569", checkedIn: false },
    { id: "M-05", name: "คุณมาร์ค", plan: "Day Pass", status: "active", expiry: "15/07/2569", checkedIn: false },
  ],
  bookSpaceId: "hd-open",
  bookDate: "วันนี้",
  bookSlot: null,
  bookName: "",
  lastBookedId: null,
  query: "",
};

const store = createDemoStore("lcs-demo-nestdesk-v1", nestInitial);
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
  { href: `${BASE}/spaces`, label: "แคตตาล็อกพื้นที่", group: "ทั่วไป" },
  { href: `${BASE}/members`, label: "สมาชิก", group: "สมาชิก" },
  { href: `${BASE}/checkin`, label: "Check-in", group: "สมาชิก" },
  { href: `${BASE}/admin`, label: "แอดมินวันนี้", group: "หลังบ้าน" },
];
