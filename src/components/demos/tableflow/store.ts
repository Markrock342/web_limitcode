"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, pick, thaiName } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/kitchen-board";

export type OrderCol = "ใหม่" | "กำลังทำ" | "พร้อมเสิร์ฟ" | "เสร็จแล้ว";

export type Reservation = {
  id: string;
  name: string;
  size: number;
  time: string;
  status: "รอโต๊ะ" | "นั่งแล้ว" | "ยกเลิก";
};

export type Order = {
  id: string;
  table: string;
  items: string;
  col: OrderCol;
  total: number;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  soldOut: boolean;
};

export type TableFlowState = {
  session: DemoSession;
  reservations: Reservation[];
  orders: Order[];
  menu: MenuItem[];
  party: number;
  time: string;
  guest: string;
  lastReserveId: string | null;
};

export const TIMES = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];
export const COLS: OrderCol[] = ["ใหม่", "กำลังทำ", "พร้อมเสิร์ฟ", "เสร็จแล้ว"];
export const KITCHEN_COLS: OrderCol[] = ["ใหม่", "กำลังทำ", "พร้อมเสิร์ฟ"];

export const COL_STYLE: Record<OrderCol, string> = {
  ใหม่: "border-rose-200 bg-rose-50",
  กำลังทำ: "border-amber-200 bg-amber-50",
  พร้อมเสิร์ฟ: "border-emerald-200 bg-emerald-50",
  เสร็จแล้ว: "border-slate-200 bg-slate-50",
};

export const tableFlowInitial: TableFlowState = {
  session: GUEST_SESSION,
  reservations: [
    { id: "R-1", name: "คุณมิ้นท์", size: 2, time: "18:00", status: "รอโต๊ะ" },
    { id: "R-2", name: "คุณต้น", size: 4, time: "19:00", status: "รอโต๊ะ" },
    { id: "R-3", name: "คุณออย", size: 3, time: "18:30", status: "นั่งแล้ว" },
    ...Array.from({ length: 9 }, (_, i) => ({
      id: demoId("R", i + 10, 3),
      name: thaiName(i + 5),
      size: pick([2, 3, 4, 5, 6] as const, i),
      time: pick(TIMES, i + 2),
      status: pick(["รอโต๊ะ", "นั่งแล้ว", "ยกเลิก"] as const, i),
    })),
  ],
  orders: [
    { id: "O-11", table: "T3", items: "พาสต้าครีม · สลัด", col: "ใหม่", total: 328 },
    { id: "O-12", table: "T1", items: "สเต็กหมู · น้ำส้ม", col: "กำลังทำ", total: 349 },
    { id: "O-13", table: "T5", items: "พิซซ่ามาร์เกริต้า", col: "พร้อมเสิร์ฟ", total: 249 },
    { id: "O-14", table: "T2", items: "ซุปครีม · ขนมปัง", col: "ใหม่", total: 189 },
    { id: "O-15", table: "T4", items: "ริซอตโต้เห็ด", col: "กำลังทำ", total: 279 },
    { id: "O-16", table: "T6", items: "สลัดซีซาร์", col: "เสร็จแล้ว", total: 159 },
    ...Array.from({ length: 14 }, (_, i) => ({
      id: demoId("O", i + 20, 3),
      table: `T${(i % 12) + 1}`,
      items: pick(
        ["ข้าวริซอตโต้เห็ด", "สปาเกตตีคาโบนาร่า", "สเต็กเนื้อย่าง", "แซลมอนย่าง", "ซีซาร์สลัด"],
        i,
      ),
      col: pick(COLS, i),
      total: 159 + ((i * 47) % 220),
    })),
  ],
  menu: [
    { id: "M1", name: "สเต็กหมูซอสพริกไทย", price: 289, soldOut: false },
    { id: "M2", name: "พาสต้าครีมเบคอน", price: 199, soldOut: false },
    { id: "M3", name: "พิซซ่ามาร์เกริต้า", price: 249, soldOut: true },
    { id: "M4", name: "ริซอตโต้เห็ดทรัฟเฟิล", price: 279, soldOut: false },
    { id: "M5", name: "ซุปครีมเห็ด", price: 129, soldOut: false },
    ...([
      { id: "M6", name: "สเต็กเนื้อซอสไวน์แดง", price: 459 },
      { id: "M7", name: "แซลมอนย่างเลมอน", price: 329 },
      { id: "M8", name: "ซีซาร์สลัดไก่ย่าง", price: 189 },
      { id: "M9", name: "มันฝรั่งอบโรสแมรี", price: 109 },
      { id: "M10", name: "ทีรามิสุ", price: 149 },
      { id: "M11", name: "เลมอนทาร์ต", price: 129 },
      { id: "M12", name: "โซดามะนาว", price: 79 },
    ] satisfies Omit<MenuItem, "soldOut">[]).map((item, i) => ({ ...item, soldOut: i === 5 })),
  ],
  party: 2,
  time: "18:00",
  guest: "",
  lastReserveId: null,
};

const store = createDemoStore("lcs-demo-tableflow-v2", tableFlowInitial);
export const TableFlowProvider = store.Provider;
export const useTableFlow = store.useStore;

export const tableBrand: DemoBrandMeta = {
  slug: "kitchen-board",
  name: "TableFlow Bistro",
  subtitle: "จองโต๊ะ + Kitchen Board + เมนู",
  accent: "bg-amber-700",
  accentBg: "bg-amber-50",
  accentText: "text-amber-900",
};

export const tableNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป", access: "all" },
  { href: `${BASE}/order`, label: "สั่งอาหาร", group: "ลูกค้า", access: "all" },
  { href: `${BASE}/reserve`, label: "จองโต๊ะ", group: "ลูกค้า", access: "all" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "บัญชี", access: "guest" },
  { href: `${BASE}/reservations`, label: "รายการจอง", group: "พนักงาน", access: "staff" },
  { href: `${BASE}/kitchen`, label: "Kitchen Board", group: "พนักงาน", access: "staff" },
  { href: `${BASE}/menu`, label: "เมนู CMS", group: "พนักงาน", access: "staff" },
  { href: `${BASE}/orders`, label: "ออเดอร์", group: "พนักงาน", access: "staff" },
];
