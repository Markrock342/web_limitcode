"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/hotel-pms";

export type RoomStatus = "ว่าง" | "มีแขก" | "สกปรก" | "ซ่อมบำรุง";
export type PayStatus = "ชำระแล้ว" | "มัดจำ" | "ค้างชำระ";
export type StayType = "มาถึง" | "ออก";

export type Stay = { id: string; guest: string; room: string; type: StayType };
export type Room = { id: string; number: string; type: string; status: RoomStatus };
export type Booking = { id: string; guest: string; roomType: string; nights: number; pay: PayStatus; checkIn: string; checkOut: string };
export type HkTask = { id: string; room: string; task: string; done: boolean };
export type Guest = { id: string; name: string; phone: string; visits: number; note: string };

export type StayNestState = {
  stays: Stay[];
  rooms: Room[];
  bookings: Booking[];
  hk: HkTask[];
  guests: Guest[];
  toast: string | null;
};

export const ROOM_CYCLE: RoomStatus[] = ["ว่าง", "มีแขก", "สกปรก", "ซ่อมบำรุง"];

export const ROOM_STYLE: Record<RoomStatus, string> = {
  ว่าง: "bg-emerald-100 text-emerald-800 border-emerald-200",
  มีแขก: "bg-sky-100 text-sky-800 border-sky-200",
  สกปรก: "bg-amber-100 text-amber-900 border-amber-200",
  ซ่อมบำรุง: "bg-slate-200 text-slate-700 border-slate-300",
};

export const PAY_STYLE: Record<PayStatus, string> = {
  ชำระแล้ว: "bg-emerald-100 text-emerald-800",
  มัดจำ: "bg-amber-100 text-amber-900",
  ค้างชำระ: "bg-rose-100 text-rose-800",
};

export const stayInitial: StayNestState = {
  stays: [
    { id: "IN-1", guest: "คุณแอนนา", room: "302", type: "มาถึง" },
    { id: "IN-2", guest: "คุณบอส", room: "405", type: "มาถึง" },
    { id: "OUT-1", guest: "คุณเจมส์", room: "210", type: "ออก" },
    { id: "OUT-2", guest: "คุณลิน", room: "118", type: "ออก" },
  ],
  rooms: [
    { id: "r1", number: "101", type: "Standard", status: "ว่าง" },
    { id: "r2", number: "102", type: "Standard", status: "มีแขก" },
    { id: "r3", number: "118", type: "Deluxe", status: "สกปรก" },
    { id: "r4", number: "210", type: "Deluxe", status: "สกปรก" },
    { id: "r5", number: "302", type: "Suite", status: "ว่าง" },
    { id: "r6", number: "305", type: "Suite", status: "ซ่อมบำรุง" },
    { id: "r7", number: "405", type: "Deluxe", status: "ว่าง" },
    { id: "r8", number: "410", type: "Standard", status: "มีแขก" },
  ],
  bookings: [
    { id: "B-901", guest: "คุณแอนนา", roomType: "Suite", nights: 2, pay: "ชำระแล้ว", checkIn: "วันนี้", checkOut: "พ. 13 ก.ค." },
    { id: "B-902", guest: "คุณบอส", roomType: "Deluxe", nights: 3, pay: "มัดจำ", checkIn: "วันนี้", checkOut: "พฤ. 14 ก.ค." },
    { id: "B-903", guest: "คุณมายด์", roomType: "Standard", nights: 1, pay: "ค้างชำระ", checkIn: "พรุ่งนี้", checkOut: "อ. 12 ก.ค." },
    { id: "B-904", guest: "คุณเจมส์", roomType: "Deluxe", nights: 4, pay: "ชำระแล้ว", checkIn: "9 ก.ค.", checkOut: "วันนี้" },
    { id: "B-905", guest: "คุณลิน", roomType: "Deluxe", nights: 2, pay: "ชำระแล้ว", checkIn: "10 ก.ค.", checkOut: "วันนี้" },
  ],
  hk: [
    { id: "H1", room: "118", task: "ทำความสะอาดหลังเช็คเอาท์", done: false },
    { id: "H2", room: "210", task: "เปลี่ยนผ้าปูที่นอน", done: false },
    { id: "H3", room: "102", task: "เติมมินิบาร์", done: true },
    { id: "H4", room: "305", task: "ตรวจแอร์หลังซ่อม", done: false },
  ],
  guests: [
    { id: "G-01", name: "คุณแอนนา", phone: "081-xxx-2201", visits: 3, note: "ชอบห้องชั้นสูง" },
    { id: "G-02", name: "คุณบอส", phone: "089-xxx-4412", visits: 1, note: "" },
    { id: "G-03", name: "คุณเจมส์", phone: "062-xxx-7788", visits: 5, note: "สมาชิก Loyalty Gold" },
    { id: "G-04", name: "คุณลิน", phone: "086-xxx-3344", visits: 2, note: "แพ้อาหารทะเล" },
    { id: "G-05", name: "คุณมายด์", phone: "092-xxx-5566", visits: 1, note: "" },
  ],
  toast: null,
};

const store = createDemoStore("lcs-demo-staynest-v1", stayInitial);
export const StayNestProvider = store.Provider;
export const useStayNest = store.useStore;

export const stayBrand: DemoBrandMeta = {
  slug: "hotel-pms",
  name: "StayNest Hotel",
  subtitle: "PMS Front Desk + ห้องพัก",
  accent: "bg-slate-900",
  accentBg: "bg-amber-50",
  accentText: "text-amber-900",
};

export const stayNav: DemoNavItem[] = [
  { href: BASE, label: "บอร์ดวันนี้", group: "ทั่วไป" },
  { href: `${BASE}/front-desk`, label: "Front Desk", group: "ปฏิบัติการ" },
  { href: `${BASE}/rooms`, label: "ห้องพัก", group: "ปฏิบัติการ" },
  { href: `${BASE}/bookings`, label: "การจอง", group: "ปฏิบัติการ" },
  { href: `${BASE}/housekeeping`, label: "แม่บ้าน", group: "ปฏิบัติการ" },
  { href: `${BASE}/guests`, label: "แขก", group: "ข้อมูล" },
];
