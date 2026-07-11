"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, pick, thaiAddress, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/dispatch";

export type OrderStatus = "pending" | "picking" | "delivering" | "done";

export type Order = {
  id: string;
  code: string;
  customer: string;
  phone: string;
  address: string;
  zone: string;
  status: OrderStatus;
  courierId: string | null;
  memberUsername?: string;
};

export type Courier = { id: string; name: string; online: boolean };

export type Zone = { id: string; name: string; color: string };

export type QuickState = {
  session: DemoSession;
  orders: Order[];
  couriers: Courier[];
  assignOrderId: string | null;
  createName: string;
  createPhone: string;
  createAddress: string;
  createZone: string;
  lastCreatedId: string | null;
};

export const STATUS_FLOW: OrderStatus[] = ["pending", "picking", "delivering", "done"];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "รอดำเนินการ",
  picking: "กำลังจัดของ",
  delivering: "กำลังส่ง",
  done: "เสร็จสิ้น",
};

export const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  picking: "bg-indigo-100 text-indigo-800",
  delivering: "bg-sky-100 text-sky-800",
  done: "bg-emerald-100 text-emerald-800",
};

export const ZONES: Zone[] = [
  { id: "z1", name: "สุขุมวิท", color: "bg-indigo-500" },
  { id: "z2", name: "ลาดพร้าว", color: "bg-[#ff6b4a]" },
  { id: "z3", name: "บางนา", color: "bg-violet-500" },
  { id: "z4", name: "พระราม 9", color: "bg-sky-500" },
  { id: "z5", name: "รัชดา", color: "bg-rose-500" },
  { id: "z6", name: "สาทร", color: "bg-emerald-500" },
];

const courierNames = ["ไรเดอร์ต้น", "ไรเดอร์บีม", "ไรเดอร์เก่ง", "ไรเดอร์พลอย", "ไรเดอร์อาร์ต", "ไรเดอร์จอย", "ไรเดอร์ไผ่", "ไรเดอร์ดาว"];
const SEED_ORDERS: Order[] = Array.from({ length: 24 }, (_, i) => ({
  id: demoId("O", 1042 + i, 4),
  code: `QD-${1042 + i}`,
  customer: thaiName(i),
  phone: thaiPhone(i),
  address: thaiAddress(i),
  zone: pick(ZONES, i).name,
  status: pick(STATUS_FLOW, i),
  courierId: i % 4 === 0 ? null : `c${(i % 8) + 1}`,
  memberUsername: i < 3 ? "member" : undefined,
}));

export const quickInitial: QuickState = {
  session: GUEST_SESSION,
  orders: SEED_ORDERS,
  couriers: courierNames.map((name, i) => ({ id: `c${i + 1}`, name, online: i !== 2 && i !== 6 })),
  assignOrderId: null,
  createName: "",
  createPhone: "",
  createAddress: "",
  createZone: ZONES[0].name,
  lastCreatedId: null,
};

const store = createDemoStore("lcs-demo-quickdrop-v2", quickInitial);
export const QuickDropProvider = store.Provider;
export const useQuickDrop = store.useStore;

export const quickBrand: DemoBrandMeta = {
  slug: "dispatch",
  name: "QuickDrop Logistics",
  subtitle: "Dispatch Console · ออเดอร์ · ไรเดอร์ · โซน",
  accent: "bg-indigo-700",
  accentBg: "bg-indigo-50",
  accentText: "text-indigo-800",
};

export const quickNav: DemoNavItem[] = [
  { href: BASE, label: "หน้าหลัก", group: "ลูกค้า" },
  { href: `${BASE}/create`, label: "สร้างรายการส่ง", group: "ลูกค้า" },
  { href: `${BASE}/account`, label: "รายการของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/orders`, label: "ออเดอร์", group: "ปฏิบัติการ", access: "staff" },
  { href: `${BASE}/order`, label: "รายละเอียดออเดอร์", group: "ปฏิบัติการ", access: "staff" },
  { href: `${BASE}/couriers`, label: "พนักงานส่ง", group: "ปฏิบัติการ", access: "staff" },
  { href: `${BASE}/zones`, label: "โซน", group: "แผนที่", access: "staff" },
  { href: `${BASE}/summary`, label: "สรุปวัน", group: "แผนที่", access: "staff" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "เข้าสู่ระบบ", access: "guest" },
];

export function advanceOrder(state: QuickState, id: string): QuickState {
  return {
    ...state,
    orders: state.orders.map((o) => {
      if (o.id !== id) return o;
      const i = STATUS_FLOW.indexOf(o.status);
      if (i >= STATUS_FLOW.length - 1) return o;
      return { ...o, status: STATUS_FLOW[i + 1] };
    }),
  };
}

export function assignCourier(state: QuickState, orderId: string, courierId: string): QuickState {
  return {
    ...state,
    assignOrderId: null,
    orders: state.orders.map((o) =>
      o.id === orderId
        ? { ...o, courierId, status: o.status === "pending" ? "picking" : o.status }
        : o,
    ),
  };
}
