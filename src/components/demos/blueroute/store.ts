"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, pick, thaiName } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/fleet-ops";

export type JobStatus = "กำลังซ่อม" | "ปิดงานแล้ว";
export type JobSubtype = "ปกติ" | "เสียกลางทาง";

export type JobPart = { name: string; qty: number };
export type JobCost = { name: string; amount: number };

export type Job = {
  id: string;
  jobNum: string;
  tech: string;
  vehicle: string;
  plate: string;
  brand: string;
  model: string;
  mile: number;
  desc: string;
  report: string;
  status: JobStatus;
  subtype: JobSubtype;
  opened: string;
  parts: JobPart[];
  costs: JobCost[];
};

export type Vehicle = {
  id: string;
  name: string;
  plate: string;
  chassis: string;
  brand: string;
  model: string;
  route: string;
  company: string;
};

export type Part = { id: string; name: string; sku: string; stock: number; reorderAt: number; unit: string };

export type BlueRouteState = {
  session: DemoSession;
  jobs: Job[];
  vehicles: Vehicle[];
  parts: Part[];
};

export const TECHS = ["ช่างสมชาย", "ช่างวิชัย", "ช่างประยุทธ์", "ช่างอนุชา", "ไม่ระบุช่าง"] as const;

export const TODAY_PREFIX = "11/07";

const SEED_JOBS: Job[] = [
  {
    id: "1",
    jobNum: "R-120516",
    tech: "ช่างสมชาย",
    vehicle: "332",
    plate: "10-1234",
    brand: "Scania",
    model: "K360",
    mile: 482100,
    desc: "เปลี่ยนผ้าเบรกหน้า + ตรวจระบบลม",
    report: "เปลี่ยนผ้าเบรกหน้าคู่ ตรวจลมเบรกปกติ ทดลองวิ่งผ่าน",
    status: "กำลังซ่อม",
    subtype: "ปกติ",
    opened: "11/07/2569 07:12",
    parts: [
      { name: "ผ้าเบรกหน้า Scania", qty: 2 },
      { name: "จารบีเบรก", qty: 1 },
    ],
    costs: [{ name: "ค่าล้างระบบลม", amount: 350 }],
  },
  {
    id: "2",
    jobNum: "R-120517",
    tech: "ช่างสมชาย",
    vehicle: "118",
    plate: "81-4455",
    brand: "Hino",
    model: "RM380",
    mile: 391220,
    desc: "เปลี่ยนแบตเตอรี่ + เช็คไดชาร์จ",
    report: "เปลี่ยนแบต 200Ah ไดชาร์จปกติ",
    status: "ปิดงานแล้ว",
    subtype: "ปกติ",
    opened: "11/07/2569 08:40",
    parts: [{ name: "แบตเตอรี่ 200Ah", qty: 1 }],
    costs: [],
  },
  {
    id: "3",
    jobNum: "R-120520",
    tech: "ช่างวิชัย",
    vehicle: "905",
    plate: "70-8899",
    brand: "Mercedes",
    model: "O500",
    mile: 512880,
    desc: "ยางระเบิดกลางทาง กม.78",
    report: "เปลี่ยนยางอะไหล่หน้าซ้าย ลากเข้าอู่",
    status: "กำลังซ่อม",
    subtype: "เสียกลางทาง",
    opened: "11/07/2569 09:05",
    parts: [{ name: "ยาง 295/80R22.5", qty: 1 }],
    costs: [
      { name: "ค่ารถยก", amount: 2500 },
      { name: "ค่าเดินทางช่าง", amount: 800 },
    ],
  },
  {
    id: "4",
    jobNum: "R-120521",
    tech: "ช่างวิชัย",
    vehicle: "441",
    plate: "12-7788",
    brand: "Volvo",
    model: "B11R",
    mile: 288440,
    desc: "แอร์ไม่เย็น ตรวจคอมเพรสเซอร์",
    report: "เติมน้ำยา + ล้างคอยล์",
    status: "ปิดงานแล้ว",
    subtype: "ปกติ",
    opened: "11/07/2569 10:20",
    parts: [{ name: "น้ำยาแอร์ R134a", qty: 2 }],
    costs: [],
  },
  {
    id: "5",
    jobNum: "R-120530",
    tech: "ช่างประยุทธ์",
    vehicle: "220",
    plate: "99-1122",
    brand: "Scania",
    model: "K410",
    mile: 601330,
    desc: "เกียร์กระตุก ตรวจคลัตช์",
    report: "รออะไหล่คลัตช์ชุด",
    status: "กำลังซ่อม",
    subtype: "ปกติ",
    opened: "10/07/2569 15:10",
    parts: [],
    costs: [],
  },
  {
    id: "6",
    jobNum: "R-120531",
    tech: "ช่างประยุทธ์",
    vehicle: "156",
    plate: "15-3344",
    brand: "Hino",
    model: "RU1J",
    mile: 420100,
    desc: "ไฟเครื่องติด กลางทางอยุธยา",
    report: "เซ็นเซอร์อุณหภูมิเสีย เปลี่ยนแล้ว",
    status: "ปิดงานแล้ว",
    subtype: "เสียกลางทาง",
    opened: "10/07/2569 18:45",
    parts: [{ name: "เซ็นเซอร์อุณหภูมิ", qty: 1 }],
    costs: [{ name: "ค่าเดินทางช่าง", amount: 1200 }],
  },
  {
    id: "7",
    jobNum: "R-120540",
    tech: "ช่างอนุชา",
    vehicle: "078",
    plate: "77-5566",
    brand: "Scania",
    model: "K360",
    mile: 355000,
    desc: "เปลี่ยนถ่ายน้ำมันเครื่องตามรอบ",
    report: "ถ่ายน้ำมัน + กรองครบ",
    status: "ปิดงานแล้ว",
    subtype: "ปกติ",
    opened: "11/07/2569 06:50",
    parts: [
      { name: "น้ำมันเครื่อง 15W-40", qty: 8 },
      { name: "กรองน้ำมันเครื่อง", qty: 1 },
    ],
    costs: [],
  },
  {
    id: "8",
    jobNum: "R-120541",
    tech: "ไม่ระบุช่าง",
    vehicle: "501",
    plate: "50-9900",
    brand: "Volvo",
    model: "B8R",
    mile: 275600,
    desc: "กระจกข้างแตก รอคิวช่าง",
    report: "-",
    status: "กำลังซ่อม",
    subtype: "ปกติ",
    opened: "09/07/2569 11:00",
    parts: [],
    costs: [],
  },
  {
    id: "9",
    jobNum: "R-120550",
    tech: "ช่างสมชาย",
    vehicle: "332",
    plate: "10-1234",
    brand: "Scania",
    model: "K360",
    mile: 481900,
    desc: "ตรวจช่วงล่างก่อนออกทริป",
    report: "ช่วงล่างปกติ",
    status: "ปิดงานแล้ว",
    subtype: "ปกติ",
    opened: "09/07/2569 08:00",
    parts: [],
    costs: [],
  },
];

const GENERATED_JOBS: Job[] = Array.from({ length: 16 }, (_, i) => ({
  id: String(i + 10),
  jobNum: `R-${120560 + i}`,
  tech: pick(TECHS.slice(0, 4), i),
  vehicle: String(600 + ((i * 37) % 300)),
  plate: `${20 + i}-${String(1200 + i * 71).slice(-4)}`,
  brand: pick(["Scania", "Hino", "Volvo", "Mercedes"] as const, i),
  model: pick(["K360", "RM380", "B11R", "O500"] as const, i),
  mile: 240000 + i * 18350,
  desc: pick(["ตรวจเช็กระยะตามรอบ", "เปลี่ยนถ่ายน้ำมันเครื่อง", "แก้ระบบเบรก", "ตรวจระบบไฟ", "ซ่อมแอร์ห้องโดยสาร"], i),
  report: "บันทึกข้อมูลจากศูนย์ซ่อมเดโม",
  status: i % 3 === 0 ? "กำลังซ่อม" : "ปิดงานแล้ว",
  subtype: i % 6 === 0 ? "เสียกลางทาง" : "ปกติ",
  opened: `11/07/2569 ${String(7 + (i % 10)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  parts: [],
  costs: [],
}));

const SEED_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "332",
    plate: "10-1234",
    chassis: "YS2K4X2000XXXX",
    brand: "Scania",
    model: "K360",
    route: "กทม.–เชียงใหม่",
    company: "BlueRoute Transport",
  },
  {
    id: "v2",
    name: "118",
    plate: "81-4455",
    chassis: "JHDRM38XXX",
    brand: "Hino",
    model: "RM380",
    route: "กทม.–ขอนแก่น",
    company: "BlueRoute Transport",
  },
  {
    id: "v3",
    name: "905",
    plate: "70-8899",
    chassis: "WDBXXXX905",
    brand: "Mercedes",
    model: "O500",
    route: "กทม.–หาดใหญ่",
    company: "BlueRoute Transport",
  },
  {
    id: "v4",
    name: "441",
    plate: "12-7788",
    chassis: "YV3T2XXXX",
    brand: "Volvo",
    model: "B11R",
    route: "กทม.–พิษณุโลก",
    company: "BlueRoute Transport",
  },
  {
    id: "v5",
    name: "220",
    plate: "99-1122",
    chassis: "YS2K4X2000YYYY",
    brand: "Scania",
    model: "K410",
    route: "กทม.–อุดร",
    company: "BlueRoute Transport",
  },
];

const GENERATED_VEHICLES: Vehicle[] = Array.from({ length: 7 }, (_, i) => ({
  id: `v${i + 6}`,
  name: String(600 + i * 37),
  plate: `${20 + i}-${String(1200 + i * 71).slice(-4)}`,
  chassis: `DEMO${String(i + 6).padStart(3, "0")}FLEET`,
  brand: pick(["Scania", "Hino", "Volvo", "Mercedes"] as const, i),
  model: pick(["K360", "RM380", "B11R", "O500"] as const, i),
  route: pick(["กทม.–นครราชสีมา", "กทม.–ระยอง", "กทม.–เชียงราย", "กทม.–สุราษฎร์ธานี"], i),
  company: "BlueRoute Transport",
}));

export const blueInitial: BlueRouteState = {
  session: GUEST_SESSION,
  jobs: [...SEED_JOBS, ...GENERATED_JOBS],
  vehicles: [...SEED_VEHICLES, ...GENERATED_VEHICLES],
  parts: Array.from({ length: 16 }, (_, i) => ({
    id: demoId("P", i + 1, 3),
    name: pick(["ผ้าเบรกหน้า", "น้ำมันเครื่อง 15W-40", "กรองน้ำมันเครื่อง", "แบตเตอรี่ 200Ah", "ยาง 295/80R22.5", "เซ็นเซอร์อุณหภูมิ"], i),
    sku: `BR-${String(100 + i)}`,
    stock: 2 + ((i * 5) % 28),
    reorderAt: 6,
    unit: pick(["ชุด", "แกลลอน", "ชิ้น", "เส้น"] as const, i),
  })),
};

const store = createDemoStore("lcs-demo-blueroute-v2", blueInitial);
export const BlueRouteProvider = store.Provider;
export const useBlueRoute = store.useStore;

export const blueBrand: DemoBrandMeta = {
  slug: "fleet-ops",
  name: "BlueRoute Fleet",
  subtitle: "งานซ่อมบำรุงรถ · เดโมหลังบ้าน",
  accent: "bg-[#16234A]",
  accentBg: "bg-[#16234A]/10",
  accentText: "text-[#16234A]",
};

export const blueNav: DemoNavItem[] = [
  { href: BASE, label: "Dashboard", group: "ทั่วไป", access: "all" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "บัญชี", access: "guest" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "บัญชี", access: "member" },
  { href: `${BASE}/jobs`, label: "รายการงาน", group: "งานซ่อม", access: "staff" },
  { href: `${BASE}/job`, label: "สรุปงาน", group: "งานซ่อม", access: "staff" },
  { href: `${BASE}/breakdown`, label: "เสียกลางทาง", group: "งานซ่อม", access: "staff" },
  { href: `${BASE}/vehicles`, label: "ค้นหารถ", group: "รถ", access: "staff" },
  { href: `${BASE}/parts`, label: "คลังอะไหล่", group: "รถ", access: "staff" },
];

export function jobsForDay(jobs: Job[], tech?: string | null) {
  let list = jobs.filter((j) => j.opened.startsWith(TODAY_PREFIX));
  if (tech) list = list.filter((j) => j.tech === tech);
  return list;
}

export function jobsPending(jobs: Job[], tech?: string | null) {
  let list = jobs.filter((j) => j.status === "กำลังซ่อม");
  if (tech) list = list.filter((j) => j.tech === tech);
  return list;
}

export function jobsBreakdown(jobs: Job[]) {
  return jobs.filter((j) => j.subtype === "เสียกลางทาง");
}

export function dailyByTech(jobs: Job[]) {
  return TECHS.map((tech) => ({
    tech,
    count: jobs.filter((j) => j.tech === tech && j.opened.startsWith(TODAY_PREFIX)).length,
  })).filter((x) => x.count > 0 || x.tech !== "ไม่ระบุช่าง");
}

export function pendingByTech(jobs: Job[]) {
  return TECHS.map((tech) => ({
    tech,
    count: jobs.filter((j) => j.tech === tech && j.status === "กำลังซ่อม").length,
  })).filter((x) => x.count > 0);
}
