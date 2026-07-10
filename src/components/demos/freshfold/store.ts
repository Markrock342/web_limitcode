"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/laundry-ops";

export type OrderStatus = "รับแล้ว" | "กำลังซัก" | "พร้อมส่ง" | "ส่งแล้ว";

export type LaundryPackage = {
  id: string;
  name: string;
  blurb: string;
  price: number;
  unit: string;
  img: string;
  active: boolean;
};

export type LaundryOrder = {
  id: string;
  customer: string;
  address: string;
  packageId: string;
  packageName: string;
  pickupDate: string;
  status: OrderStatus;
  note: string;
  img: string;
};

export type LaundryCustomer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string;
};

export type FreshState = {
  packages: LaundryPackage[];
  orders: LaundryOrder[];
  customers: LaundryCustomer[];
  orderFilter: OrderStatus | "ทั้งหมด";
  formName: string;
  formAddress: string;
  formPackageId: string;
  formDate: string;
  lastPickupId: string | null;
  editPriceId: string | null;
};

export const STATUS_FLOW: OrderStatus[] = ["รับแล้ว", "กำลังซัก", "พร้อมส่ง", "ส่งแล้ว"];

export const STATUS_STYLE: Record<OrderStatus, string> = {
  รับแล้ว: "bg-sky-100 text-sky-800",
  กำลังซัก: "bg-amber-100 text-amber-800",
  พร้อมส่ง: "bg-emerald-100 text-emerald-800",
  ส่งแล้ว: "bg-slate-100 text-slate-600",
};

export const PICKUP_DATES = ["วันนี้", "พรุ่งนี้", "จ. 14 ก.ค.", "อ. 15 ก.ค.", "พ. 16 ก.ค."];

export const freshInitial: FreshState = {
  packages: [
    {
      id: "wash-fold",
      name: "ซักพับมาตรฐาน",
      blurb: "ซักอบพับครบ · ส่งคืนภายใน 48 ชม.",
      price: 89,
      unit: "กก.",
      img: "/img/food-1.jpg",
      active: true,
    },
    {
      id: "express",
      name: "ด่วนพิเศษ 24 ชม.",
      blurb: "รับเช้า ส่งเย็นวันถัดไป",
      price: 149,
      unit: "กก.",
      img: "/img/food-3.jpg",
      active: true,
    },
    {
      id: "dryclean",
      name: "ซักแห้งสูท",
      blurb: "สูท เสื้อเชิ้ต ชุดทางการ",
      price: 220,
      unit: "ชิ้น",
      img: "/img/drink-1.jpg",
      active: true,
    },
    {
      id: "bedding",
      name: "ชุดเครื่องนอน",
      blurb: "ผ้าปู ที่นอน ปลอกหมอน",
      price: 350,
      unit: "ชุด",
      img: "/img/shop-hero.jpg",
      active: true,
    },
  ],
  orders: [
    {
      id: "LF-101",
      customer: "คุณมายด์",
      address: "คอนโดโนวา ชั้น 12",
      packageId: "wash-fold",
      packageName: "ซักพับมาตรฐาน",
      pickupDate: "วันนี้",
      status: "รับแล้ว",
      note: "มีผ้าขาวแยกถุง",
      img: "/img/food-1.jpg",
    },
    {
      id: "LF-102",
      customer: "คุณต้น",
      address: "บ้านสุขใจ ซอย 5",
      packageId: "express",
      packageName: "ด่วนพิเศษ 24 ชม.",
      pickupDate: "วันนี้",
      status: "กำลังซัก",
      note: "",
      img: "/img/food-3.jpg",
    },
    {
      id: "LF-103",
      customer: "คุณพลอย",
      address: "ออฟฟิศเพลินจิต",
      packageId: "dryclean",
      packageName: "ซักแห้งสูท",
      pickupDate: "เมื่อวาน",
      status: "พร้อมส่ง",
      note: "สูทสีกรม",
      img: "/img/drink-1.jpg",
    },
    {
      id: "LF-104",
      customer: "คุณเอิร์ธ",
      address: "ลาดพร้าว 101",
      packageId: "bedding",
      packageName: "ชุดเครื่องนอน",
      pickupDate: "เมื่อวาน",
      status: "ส่งแล้ว",
      note: "",
      img: "/img/shop-hero.jpg",
    },
  ],
  customers: [
    { id: "C-01", name: "คุณมายด์", phone: "081-xxx-2201", address: "คอนโดโนวา ชั้น 12", note: "ชอบน้ำยาอ่อนโยน" },
    { id: "C-02", name: "คุณต้น", phone: "089-xxx-4412", address: "บ้านสุขใจ ซอย 5", note: "" },
    { id: "C-03", name: "คุณพลอย", phone: "062-xxx-7788", address: "ออฟฟิศเพลินจิต", note: "สูทประจำสัปดาห์" },
    { id: "C-04", name: "คุณเอิร์ธ", phone: "095-xxx-3310", address: "ลาดพร้าว 101", note: "เครื่องนอนทุก 2 สัปดาห์" },
  ],
  orderFilter: "ทั้งหมด",
  formName: "",
  formAddress: "",
  formPackageId: "wash-fold",
  formDate: "วันนี้",
  lastPickupId: null,
  editPriceId: null,
};

const store = createDemoStore("lcs-demo-freshfold-v1", freshInitial);
export const FreshFoldProvider = store.Provider;
export const useFreshFold = store.useStore;

export const freshBrand: DemoBrandMeta = {
  slug: "laundry-ops",
  name: "FreshFold Laundry",
  subtitle: "รับผ้า · ซัก · ส่งคืน · หลังบ้าน",
  accent: "bg-[#2C5F4F]",
  accentBg: "bg-[#E8F2EE]",
  accentText: "text-[#2C5F4F]",
};

export const freshNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/pickup`, label: "เรียกรับผ้า", group: "ลูกค้า" },
  { href: `${BASE}/orders`, label: "บอร์ดงาน", group: "หลังบ้าน" },
  { href: `${BASE}/order`, label: "รายละเอียดงาน", group: "หลังบ้าน" },
  { href: `${BASE}/pricing`, label: "แพ็กเกจ CMS", group: "หลังบ้าน" },
  { href: `${BASE}/customers`, label: "ลูกค้า", group: "ลูกค้า" },
];

export function nextStatus(status: OrderStatus): OrderStatus | null {
  const i = STATUS_FLOW.indexOf(status);
  if (i < 0 || i >= STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[i + 1];
}

export function advanceOrder(state: FreshState, id: string): FreshState {
  return {
    ...state,
    orders: state.orders.map((o) => {
      if (o.id !== id) return o;
      const n = nextStatus(o.status);
      return n ? { ...o, status: n } : o;
    }),
  };
}
