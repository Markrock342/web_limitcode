"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/auto-detail";

export type JobStatus = "รอคิว" | "กำลังทำ" | "เสร็จ";

export type Package = {
  id: string;
  name: string;
  mins: number;
  price: number;
  blurb: string;
  img: string;
};

export type Bay = {
  id: string;
  name: string;
  slots: string[];
  busy: boolean;
  img: string;
};

export type Job = {
  id: string;
  code: string;
  customer: string;
  car: string;
  plate: string;
  packageId: string;
  packageName: string;
  bayId: string;
  bayName: string;
  date: string;
  time: string;
  status: JobStatus;
  img: string;
  note: string;
};

export type Member = {
  id: string;
  name: string;
  phone: string;
  points: number;
  tier: string;
  visits: number;
  img: string;
};

export type ShineState = {
  packages: Package[];
  bays: Bay[];
  jobs: Job[];
  members: Member[];
  packageId: string;
  bayId: string;
  dateChip: string;
  slot: string | null;
  customer: string;
  car: string;
  plate: string;
  phone: string;
  lastBookedId: string | null;
  jobFilter: JobStatus | "ทั้งหมด";
};

export const DATE_CHIPS = ["วันนี้", "พรุ่งนี้", "พ. 16 ก.ค.", "พฤ. 17 ก.ค.", "ศ. 18 ก.ค."];
export const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const STATUS_STYLE: Record<JobStatus, string> = {
  รอคิว: "bg-amber-100 text-amber-800",
  กำลังทำ: "bg-sky-100 text-sky-800",
  เสร็จ: "bg-emerald-100 text-emerald-800",
};

export const shineInitial: ShineState = {
  packages: [
    {
      id: "express",
      name: "Express Wash",
      mins: 45,
      price: 490,
      blurb: "ล้างภายนอก + ดูดฝุ่นเบื้องต้น",
      img: "/img/prod-1.jpg",
    },
    {
      id: "premium",
      name: "Premium Detail",
      mins: 120,
      price: 1890,
      blurb: "ล้างขัดเคลือบ ภายในลึก",
      img: "/img/prod-2.jpg",
    },
    {
      id: "ceramic",
      name: "Ceramic Coat",
      mins: 180,
      price: 4500,
      blurb: "เคลือบเซรามิก ปกป้องสีรถ",
      img: "/img/prod-3.jpg",
    },
    {
      id: "interior",
      name: "Interior Deep",
      mins: 90,
      price: 1290,
      blurb: "ทำความสะอาดภายในลึก พรมเบาะ",
      img: "/img/prod-4.jpg",
    },
  ],
  bays: [
    { id: "bay-1", name: "Bay 1 · Express", slots: ["09:00", "10:00", "11:00", "14:00"], busy: true, img: "/img/work-1.jpg" },
    { id: "bay-2", name: "Bay 2 · Detail", slots: ["09:00", "13:00", "15:00", "17:00"], busy: true, img: "/img/work-2.jpg" },
    { id: "bay-3", name: "Bay 3 · Ceramic", slots: ["10:00", "14:00"], busy: false, img: "/img/work-3.jpg" },
    { id: "bay-4", name: "Bay 4 · Interior", slots: ["11:00", "13:00", "16:00"], busy: false, img: "/img/shop-hero.jpg" },
  ],
  jobs: [
    {
      id: "J-101",
      code: "SA-2401",
      customer: "คุณมาร์ค",
      car: "Honda Civic",
      plate: "1กก-1234",
      packageId: "premium",
      packageName: "Premium Detail",
      bayId: "bay-2",
      bayName: "Bay 2 · Detail",
      date: "วันนี้",
      time: "09:00",
      status: "กำลังทำ",
      img: "/img/prod-2.jpg",
      note: "มีรอยขีดข่วนฝั่งขวา",
    },
    {
      id: "J-102",
      code: "SA-2402",
      customer: "คุณนภา",
      car: "Toyota Yaris",
      plate: "2ขข-5678",
      packageId: "express",
      packageName: "Express Wash",
      bayId: "bay-1",
      bayName: "Bay 1 · Express",
      date: "วันนี้",
      time: "10:00",
      status: "รอคิว",
      img: "/img/prod-1.jpg",
      note: "",
    },
    {
      id: "J-103",
      code: "SA-2403",
      customer: "คุณธนพล",
      car: "Mazda CX-5",
      plate: "3คง-9012",
      packageId: "ceramic",
      packageName: "Ceramic Coat",
      bayId: "bay-3",
      bayName: "Bay 3 · Ceramic",
      date: "วันนี้",
      time: "14:00",
      status: "รอคิว",
      img: "/img/prod-3.jpg",
      note: "จองล่วงหน้า เคลือบเต็มคัน",
    },
    {
      id: "J-104",
      code: "SA-2399",
      customer: "คุณพิมพ์",
      car: "BMW 320d",
      plate: "4จจ-3456",
      packageId: "interior",
      packageName: "Interior Deep",
      bayId: "bay-4",
      bayName: "Bay 4 · Interior",
      date: "เมื่อวาน",
      time: "15:00",
      status: "เสร็จ",
      img: "/img/prod-4.jpg",
      note: "เสร็จเรียบร้อย",
    },
  ],
  members: [
    { id: "M-01", name: "คุณมาร์ค", phone: "081-xxx-1100", points: 2400, tier: "Gold", visits: 12, img: "/img/prod-5.jpg" },
    { id: "M-02", name: "คุณนภา", phone: "089-xxx-2201", points: 890, tier: "Silver", visits: 5, img: "/img/prod-6.jpg" },
    { id: "M-03", name: "คุณธนพล", phone: "062-xxx-4412", points: 4200, tier: "Platinum", visits: 18, img: "/img/work-1.jpg" },
    { id: "M-04", name: "คุณพิมพ์", phone: "086-xxx-7788", points: 320, tier: "Member", visits: 2, img: "/img/work-2.jpg" },
  ],
  packageId: "premium",
  bayId: "bay-2",
  dateChip: "วันนี้",
  slot: null,
  customer: "",
  car: "",
  plate: "",
  phone: "",
  lastBookedId: null,
  jobFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-shineauto-v1", shineInitial);
export const ShineAutoProvider = store.Provider;
export const useShineAuto = store.useStore;

export const shineBrand: DemoBrandMeta = {
  slug: "auto-detail",
  name: "ShineAuto Detail",
  subtitle: "จองคิวล้างรถ · เบย์ + สมาชิก",
  accent: "bg-[#1F3A5F]",
  accentBg: "bg-[#E8EEF5]",
  accentText: "text-[#1F3A5F]",
};

export const shineNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/book`, label: "จองคิว", group: "ลูกค้า" },
  { href: `${BASE}/bays`, label: "ตารางเบย์", group: "หลังบ้าน" },
  { href: `${BASE}/jobs`, label: "งานวันนี้", group: "หลังบ้าน" },
  { href: `${BASE}/members`, label: "สมาชิก", group: "หลังบ้าน" },
];

export function nextJobStatus(s: JobStatus): JobStatus {
  if (s === "รอคิว") return "กำลังทำ";
  if (s === "กำลังทำ") return "เสร็จ";
  return "รอคิว";
}
