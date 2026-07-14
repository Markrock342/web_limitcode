"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, pick, thaiAddress, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/laundry-ops";

export type OrderStatus = "รับแล้ว" | "กำลังซัก" | "กำลังรีด" | "พร้อมส่ง" | "ส่งแล้ว";

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
  memberUsername?: string;
};

export type LaundryCustomer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string;
};

export type FreshState = {
  session: DemoSession;
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

export const STATUS_FLOW: OrderStatus[] = ["รับแล้ว", "กำลังซัก", "กำลังรีด", "พร้อมส่ง", "ส่งแล้ว"];

export const STATUS_STYLE: Record<OrderStatus, string> = {
  รับแล้ว: "bg-sky-100 text-sky-800",
  กำลังซัก: "bg-amber-100 text-amber-800",
  กำลังรีด: "bg-violet-100 text-violet-800",
  พร้อมส่ง: "bg-emerald-100 text-emerald-800",
  ส่งแล้ว: "bg-slate-100 text-slate-600",
};

export const PICKUP_DATES = ["วันนี้", "พรุ่งนี้", "จ. 14 ก.ค.", "อ. 15 ก.ค.", "พ. 16 ก.ค."];

export const freshInitial: FreshState = {
  session: GUEST_SESSION,
  packages: [
    {
      id: "wash-fold",
      name: "ซักพับมาตรฐาน",
      blurb: "ซักอบพับครบ · ส่งคืนภายใน 48 ชม.",
      price: 89,
      unit: "กก.",
      img: "/img/laundry/shirt.jpg",
      active: true,
    },
    {
      id: "express",
      name: "ด่วนพิเศษ 24 ชม.",
      blurb: "รับเช้า ส่งเย็นวันถัดไป",
      price: 149,
      unit: "กก.",
      img: "/img/laundry/machines.jpg",
      active: true,
    },
    {
      id: "dryclean",
      name: "ซักแห้งสูท",
      blurb: "สูท เสื้อเชิ้ต ชุดทางการ",
      price: 220,
      unit: "ชิ้น",
      img: "/img/laundry/suit.jpg",
      active: true,
    },
    {
      id: "bedding",
      name: "ชุดเครื่องนอน",
      blurb: "ผ้าปู ที่นอน ปลอกหมอน",
      price: 350,
      unit: "ชุด",
      img: "/img/laundry/bedding.jpg",
      active: true,
    },
    { id: "curtain", name: "ผ้าม่านและผ้าห่ม", blurb: "ดูแลผ้าชิ้นใหญ่ พร้อมอบแห้ง", price: 480, unit: "ชุด", img: "/img/laundry/towels.jpg", active: true },
    { id: "sneaker", name: "สปารองเท้า", blurb: "ทำความสะอาดรองเท้าผ้าใบ", price: 320, unit: "คู่", img: "/img/laundry/sneaker.jpg", active: true },
  ],
  orders: Array.from({ length: 24 }, (_, i) => {
    const pkg = pick([
      { id: "wash-fold", name: "ซักพับมาตรฐาน", img: "/img/laundry/shirt.jpg" },
      { id: "express", name: "ด่วนพิเศษ 24 ชม.", img: "/img/laundry/machines.jpg" },
      { id: "dryclean", name: "ซักแห้งสูท", img: "/img/laundry/suit.jpg" },
      { id: "bedding", name: "ชุดเครื่องนอน", img: "/img/laundry/bedding.jpg" },
      { id: "curtain", name: "ผ้าม่านและผ้าห่ม", img: "/img/laundry/towels.jpg" },
      { id: "sneaker", name: "สปารองเท้า", img: "/img/laundry/sneaker.jpg" },
    ], i);
    return { id: demoId("LF", 101 + i, 3), customer: thaiName(i), address: thaiAddress(i), packageId: pkg.id, packageName: pkg.name, pickupDate: pick(PICKUP_DATES, i), status: pick(STATUS_FLOW, i), note: i % 3 === 0 ? "แยกผ้าขาว" : "", img: pkg.img, memberUsername: i < 3 ? "member" : undefined };
  }),
  customers: Array.from({ length: 14 }, (_, i) => ({ id: demoId("C", i + 1, 2), name: thaiName(i), phone: thaiPhone(i), address: thaiAddress(i), note: i % 4 === 0 ? "แจ้งก่อนถึง 15 นาที" : "" })),
  orderFilter: "ทั้งหมด",
  formName: "",
  formAddress: "",
  formPackageId: "wash-fold",
  formDate: "วันนี้",
  lastPickupId: null,
  editPriceId: null,
};

const store = createDemoStore("lcs-demo-freshfold-v3", freshInitial);
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
  { href: BASE, label: "หน้าหลัก", group: "ลูกค้า" },
  { href: `${BASE}/pickup`, label: "เรียกรับผ้า", group: "ลูกค้า" },
  { href: `${BASE}/account`, label: "รายการของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/orders`, label: "บอร์ดงาน", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/order`, label: "รายละเอียดงาน", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/pricing`, label: "แพ็กเกจ CMS", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/customers`, label: "ลูกค้า", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "เข้าสู่ระบบ", access: "guest" },
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
