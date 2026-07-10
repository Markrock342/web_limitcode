"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/dispatch";

export type OrderStatus = "pending" | "picking" | "delivering" | "done";

export type Order = {
  id: string;
  code: string;
  customer: string;
  zone: string;
  status: OrderStatus;
  courierId: string | null;
};

export type Courier = { id: string; name: string; online: boolean };

export type Zone = { id: string; name: string; color: string };

export type QuickState = {
  orders: Order[];
  couriers: Courier[];
  assignOrderId: string | null;
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
];

export const quickInitial: QuickState = {
  orders: [
    { id: "o1", code: "QD-1042", customer: "คุณมิก", zone: "สุขุมวิท", status: "pending", courierId: null },
    { id: "o2", code: "QD-1043", customer: "คุณแนน", zone: "ลาดพร้าว", status: "picking", courierId: "c1" },
    { id: "o3", code: "QD-1044", customer: "คุณบอส", zone: "บางนา", status: "delivering", courierId: "c2" },
    { id: "o4", code: "QD-1045", customer: "คุณเอ", zone: "พระราม 9", status: "pending", courierId: null },
    { id: "o5", code: "QD-1040", customer: "คุณจอย", zone: "สุขุมวิท", status: "done", courierId: "c1" },
  ],
  couriers: [
    { id: "c1", name: "ไรเดอร์ต้น", online: true },
    { id: "c2", name: "ไรเดอร์บีม", online: true },
    { id: "c3", name: "ไรเดอร์เก่ง", online: false },
    { id: "c4", name: "ไรเดอร์พลอย", online: true },
  ],
  assignOrderId: null,
};

const store = createDemoStore("lcs-demo-quickdrop-v1", quickInitial);
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
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/orders`, label: "ออเดอร์", group: "ปฏิบัติการ" },
  { href: `${BASE}/order`, label: "รายละเอียดออเดอร์", group: "ปฏิบัติการ" },
  { href: `${BASE}/couriers`, label: "พนักงานส่ง", group: "ปฏิบัติการ" },
  { href: `${BASE}/zones`, label: "โซน", group: "แผนที่" },
  { href: `${BASE}/summary`, label: "สรุปวัน", group: "แผนที่" },
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
