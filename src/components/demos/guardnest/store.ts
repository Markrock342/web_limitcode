"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/field-crm";

export type JobStatus = "รอเสนอราคา" | "นัดหมาย" | "กำลังทำ" | "เสร็จแล้ว";
export type QuoteStatus = "ร่าง" | "รออนุมัติ" | "อนุมัติแล้ว";

export type Job = {
  id: string;
  customerId: string;
  customer: string;
  address: string;
  type: string;
  tech: string;
  notes: string;
  status: JobStatus;
  time: string;
  day: string;
};

export type Quote = {
  id: string;
  customerId: string;
  customer: string;
  amount: number;
  status: QuoteStatus;
  service: string;
};

export type Customer = {
  id: string;
  name: string;
  address: string;
  phone: string;
  notes: string[];
};

export type GuardNestState = {
  jobs: Job[];
  quotes: Quote[];
  customers: Customer[];
};

export const DAYS = ["จ.", "อ.", "พ.", "พฤ.", "ศ."] as const;

export const JOB_STATUS_ORDER: JobStatus[] = ["รอเสนอราคา", "นัดหมาย", "กำลังทำ", "เสร็จแล้ว"];

export const STATUS_STYLE: Record<JobStatus, string> = {
  รอเสนอราคา: "bg-amber-100 text-amber-800",
  นัดหมาย: "bg-sky-100 text-sky-800",
  กำลังทำ: "bg-teal-100 text-teal-800",
  เสร็จแล้ว: "bg-emerald-100 text-emerald-800",
};

export const QUOTE_STYLE: Record<QuoteStatus, string> = {
  ร่าง: "bg-slate-100 text-slate-700",
  รออนุมัติ: "bg-amber-100 text-amber-800",
  อนุมัติแล้ว: "bg-emerald-100 text-emerald-800",
};

const SEED_CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "คุณมานี บ้านสวน",
    address: "88/2 ซ.ร่มเย็น อ.เมือง",
    phone: "081-234-1101",
    notes: ["พบรังใกล้เสาบ้านด้านหลัง", "นัดติดตามหลังพ่น 7 วัน"],
  },
  {
    id: "c2",
    name: "ร้านกาแฟ LeafNest",
    address: "12 ถ.ตลาดใหม่",
    phone: "082-445-2202",
    notes: ["เข้าได้หลัง 14:00", "คลังหลังร้านมีแมลงสาบ"],
  },
  {
    id: "c3",
    name: "คุณวิชัย คอนโด",
    address: "คอนโด SkyPark ชั้น 12",
    phone: "089-778-3303",
    notes: ["ลูกค้าขอใบเสนอราคาก่อน"],
  },
  {
    id: "c4",
    name: "ออฟฟิศ NestWorks",
    address: "อาคาร GreenHub ชั้น 3",
    phone: "02-115-4404",
    notes: ["งานเสร็จ เก็บหลักฐานรูปแล้ว"],
  },
  {
    id: "c5",
    name: "บ้านคุณอร",
    address: "45 หมู่บ้านสุขใจ",
    phone: "086-990-5505",
    notes: ["ติดตามผลใน 14 วัน"],
  },
];

const SEED_JOBS: Job[] = [
  {
    id: "J-2401",
    customerId: "c1",
    customer: "คุณมานี บ้านสวน",
    address: "88/2 ซ.ร่มเย็น อ.เมือง",
    type: "กำจัดปลวกใต้พื้น",
    tech: "ช่างก้อง",
    notes: "พบรังใกล้เสาบ้านด้านหลัง",
    status: "กำลังทำ",
    time: "09:00",
    day: "จ.",
  },
  {
    id: "J-2402",
    customerId: "c2",
    customer: "ร้านกาแฟ LeafNest",
    address: "12 ถ.ตลาดใหม่",
    type: "พ่นแมลงคลังสินค้า",
    tech: "ช่างบอย",
    notes: "เข้าได้หลัง 14:00",
    status: "นัดหมาย",
    time: "14:30",
    day: "อ.",
  },
  {
    id: "J-2403",
    customerId: "c3",
    customer: "คุณวิชัย คอนโด",
    address: "คอนโด SkyPark ชั้น 12",
    type: "ตรวจปลวกประจำปี",
    tech: "ช่างก้อง",
    notes: "ลูกค้าขอใบเสนอราคาก่อน",
    status: "รอเสนอราคา",
    time: "10:00",
    day: "พ.",
  },
  {
    id: "J-2404",
    customerId: "c4",
    customer: "ออฟฟิศ NestWorks",
    address: "อาคาร GreenHub ชั้น 3",
    type: "กำจัดมดและแมลงสาบ",
    tech: "ช่างนิด",
    notes: "งานเสร็จ เก็บหลักฐานรูปแล้ว",
    status: "เสร็จแล้ว",
    time: "11:00",
    day: "พฤ.",
  },
  {
    id: "J-2405",
    customerId: "c5",
    customer: "บ้านคุณอร",
    address: "45 หมู่บ้านสุขใจ",
    type: "วางเหยื่อปลวก",
    tech: "ช่างบอย",
    notes: "ติดตามผลใน 14 วัน",
    status: "นัดหมาย",
    time: "16:00",
    day: "ศ.",
  },
];

const SEED_QUOTES: Quote[] = [
  {
    id: "Q-881",
    customerId: "c3",
    customer: "คุณวิชัย คอนโด",
    amount: 4500,
    status: "รออนุมัติ",
    service: "ตรวจปลวกประจำปี",
  },
  {
    id: "Q-882",
    customerId: "c2",
    customer: "ร้านกาแฟ LeafNest",
    amount: 7800,
    status: "ร่าง",
    service: "พ่นแมลงคลัง",
  },
  {
    id: "Q-883",
    customerId: "c4",
    customer: "ออฟฟิศ NestWorks",
    amount: 3200,
    status: "อนุมัติแล้ว",
    service: "กำจัดมด",
  },
];

export const guardInitial: GuardNestState = {
  jobs: SEED_JOBS,
  quotes: SEED_QUOTES,
  customers: SEED_CUSTOMERS,
};

const store = createDemoStore("lcs-demo-guardnest-v1", guardInitial);
export const GuardNestProvider = store.Provider;
export const useGuardNest = store.useStore;

export const guardBrand: DemoBrandMeta = {
  slug: "field-crm",
  name: "GuardNest Field",
  subtitle: "CRM / Job Order ทีมหน้างาน",
  accent: "bg-emerald-700",
  accentBg: "bg-emerald-50",
  accentText: "text-emerald-800",
};

export const guardNav: DemoNavItem[] = [
  { href: BASE, label: "Dashboard", group: "ทั่วไป" },
  { href: `${BASE}/jobs`, label: "งานทั้งหมด", group: "งาน" },
  { href: `${BASE}/job`, label: "สรุปงาน", group: "งาน" },
  { href: `${BASE}/quotes`, label: "ใบเสนอราคา", group: "งาน" },
  { href: `${BASE}/calendar`, label: "ปฏิทินทีม", group: "งาน" },
  { href: `${BASE}/customers`, label: "ลูกค้า", group: "ลูกค้า" },
];

export function nextJobStatus(s: JobStatus): JobStatus {
  return JOB_STATUS_ORDER[(JOB_STATUS_ORDER.indexOf(s) + 1) % JOB_STATUS_ORDER.length];
}

export function nextQuoteStatus(s: QuoteStatus): QuoteStatus {
  if (s === "ร่าง") return "รออนุมัติ";
  if (s === "รออนุมัติ") return "อนุมัติแล้ว";
  return "ร่าง";
}

export function updateJobStatus(state: GuardNestState, id: string, status?: JobStatus): GuardNestState {
  return {
    ...state,
    jobs: state.jobs.map((j) =>
      j.id === id ? { ...j, status: status ?? nextJobStatus(j.status) } : j,
    ),
  };
}

export function approveQuote(state: GuardNestState, id: string): GuardNestState {
  return {
    ...state,
    quotes: state.quotes.map((q) =>
      q.id === id ? { ...q, status: nextQuoteStatus(q.status) } : q,
    ),
  };
}

export function addCustomerNote(state: GuardNestState, customerId: string, note: string): GuardNestState {
  const trimmed = note.trim();
  if (!trimmed) return state;
  return {
    ...state,
    customers: state.customers.map((c) =>
      c.id === customerId ? { ...c, notes: [trimmed, ...c.notes] } : c,
    ),
  };
}

export function openJobsCount(jobs: Job[]) {
  return jobs.filter((j) => j.status !== "เสร็จแล้ว").length;
}

export function approvedRevenue(quotes: Quote[]) {
  return quotes.filter((q) => q.status === "อนุมัติแล้ว").reduce((s, q) => s + q.amount, 0) + 42800;
}

export function slaPercent(jobs: Job[]) {
  const done = jobs.filter((j) => j.status === "เสร็จแล้ว").length;
  return Math.max(Math.round((done / Math.max(jobs.length, 1)) * 100) || 92, 88);
}
