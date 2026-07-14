"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { pick, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
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
  session: DemoSession;
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
  session: GUEST_SESSION,
  packages: [
    {
      id: "express",
      name: "Express Wash",
      mins: 45,
      price: 490,
      blurb: "ล้างภายนอก + ดูดฝุ่นเบื้องต้น",
      img: "/img/cars/polish.jpg",
    },
    {
      id: "premium",
      name: "Premium Detail",
      mins: 120,
      price: 1890,
      blurb: "ล้างขัดเคลือบ ภายในลึก",
      img: "/img/cars/porsche.jpg",
    },
    {
      id: "ceramic",
      name: "Ceramic Coat",
      mins: 180,
      price: 4500,
      blurb: "เคลือบเซรามิก ปกป้องสีรถ",
      img: "/img/cars/classic.jpg",
    },
    {
      id: "interior",
      name: "Interior Deep",
      mins: 90,
      price: 1290,
      blurb: "ทำความสะอาดภายในลึก พรมเบาะ",
      img: "/img/cars/interior.jpg",
    },
    { id: "wash-wax", name: "Wash & Wax", mins: 75, price: 890, blurb: "ล้างเคลือบเงา สำหรับการดูแลรายเดือน", img: "/img/cars/mustang.jpg" },
    { id: "suv-reset", name: "SUV Reset", mins: 150, price: 2390, blurb: "ฟื้นฟูภายในและภายนอกรถ SUV", img: "/img/cars/car-red.jpg" },
  ],
  bays: [
    { id: "bay-1", name: "Bay 1 · Express", slots: ["09:00", "10:00", "11:00", "14:00"], busy: true, img: "/img/cars/polish.jpg" },
    { id: "bay-2", name: "Bay 2 · Detail", slots: ["09:00", "13:00", "15:00", "17:00"], busy: true, img: "/img/cars/porsche.jpg" },
    { id: "bay-3", name: "Bay 3 · Ceramic", slots: ["10:00", "14:00"], busy: false, img: "/img/cars/classic.jpg" },
    { id: "bay-4", name: "Bay 4 · Interior", slots: ["11:00", "13:00", "16:00"], busy: false, img: "/img/cars/interior.jpg" },
    { id: "bay-5", name: "Bay 5 · Wax", slots: ["09:00", "12:00", "15:00"], busy: true, img: "/img/cars/mustang.jpg" },
    { id: "bay-6", name: "Bay 6 · SUV", slots: ["10:00", "13:00", "16:00"], busy: false, img: "/img/cars/car-red.jpg" },
  ],
  jobs: Array.from({ length: 20 }, (_, i) => {
    const pkg = pick([{ id: "express", name: "Express Wash", img: "/img/cars/polish.jpg" }, { id: "premium", name: "Premium Detail", img: "/img/cars/porsche.jpg" }, { id: "ceramic", name: "Ceramic Coat", img: "/img/cars/classic.jpg" }, { id: "interior", name: "Interior Deep", img: "/img/cars/interior.jpg" }], i);
    const bay = pick([{ id: "bay-1", name: "Bay 1 · Express" }, { id: "bay-2", name: "Bay 2 · Detail" }, { id: "bay-3", name: "Bay 3 · Ceramic" }, { id: "bay-4", name: "Bay 4 · Interior" }], i);
    return { id: `J-${101 + i}`, code: `SA-${2401 + i}`, customer: thaiName(i), car: pick(["Honda Civic", "Toyota Yaris", "Mazda CX-5", "BMW 320d", "BYD Atto 3"], i), plate: `${i + 1}กก-${String(1234 + i * 31).slice(-4)}`, packageId: pkg.id, packageName: pkg.name, bayId: bay.id, bayName: bay.name, date: i < 14 ? "วันนี้" : "พรุ่งนี้", time: pick(SLOTS, i), status: pick<JobStatus>(["รอคิว", "กำลังทำ", "เสร็จ"], i), img: pkg.img, note: i % 4 === 0 ? "ตรวจรอยขีดข่วนก่อนเริ่มงาน" : "" };
  }),
  members: Array.from({ length: 10 }, (_, i) => ({ id: `M-${String(i + 1).padStart(2, "0")}`, name: thaiName(i), phone: thaiPhone(i), points: 250 + i * 430, tier: pick(["Member", "Silver", "Gold", "Platinum"], i), visits: 1 + i * 2, img: pick(["/img/cars/cabin.jpg", "/img/cars/cockpit.jpg", "/img/cars/interior.jpg"], i) })),
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

const store = createDemoStore("lcs-demo-shineauto-v3", shineInitial);
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
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/bays`, label: "ตารางเบย์", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/jobs`, label: "งานวันนี้", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/members`, label: "สมาชิก", group: "หลังบ้าน", access: "staff" },
];

export function nextJobStatus(s: JobStatus): JobStatus {
  if (s === "รอคิว") return "กำลังทำ";
  if (s === "กำลังทำ") return "เสร็จ";
  return "รอคิว";
}
