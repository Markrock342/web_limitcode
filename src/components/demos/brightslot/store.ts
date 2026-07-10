"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/tutor-admin";

export type BookingStatus = "รออนุมัติ" | "อนุมัติแล้ว" | "ยกเลิก";

export type Booking = {
  id: string;
  student: string;
  subject: string;
  tutor: string;
  slot: string;
  status: BookingStatus;
};

export type Student = { id: string; name: string; grade: string; subject: string };

export type Tutor = { id: string; name: string; subject: string; load: number; img: string; bio: string };

export type BrightState = {
  bookings: Booking[];
  students: Student[];
  subject: string;
  tutorId: string;
  slot: string;
  confirmed: boolean;
  newStudent: string;
};

export const SUBJECTS = ["คณิตศาสตร์", "ภาษาอังกฤษ", "วิทยาศาสตร์", "ภาษาไทย"];

export const TUTORS: Tutor[] = [
  { id: "t1", name: "ครูเอิร์ธ", subject: "คณิตศาสตร์", load: 70, img: "/img/work-1.jpg", bio: "ติวเข้ม ม.ต้น–ม.ปลาย" },
  { id: "t2", name: "ครูมายด์", subject: "ภาษาอังกฤษ", load: 45, img: "/img/work-2.jpg", bio: "Speaking + Grammar" },
  { id: "t3", name: "ครูพีช", subject: "วิทยาศาสตร์", load: 85, img: "/img/work-3.jpg", bio: "ฟิสิกส์–เคมี ปูพื้นฐาน" },
  { id: "t4", name: "ครูแนน", subject: "ภาษาไทย", load: 30, img: "/img/office-hero.jpg", bio: "วรรณกรรม + ข้อสอบเข้า" },
];

export const SLOTS = ["จ 16:00", "อ 17:00", "พ 16:00", "พฤ 18:00", "ศ 17:00", "ส 10:00"];

export const STATUS_STYLE: Record<BookingStatus, string> = {
  รออนุมัติ: "bg-amber-100 text-amber-700",
  อนุมัติแล้ว: "bg-emerald-100 text-emerald-700",
  ยกเลิก: "bg-rose-100 text-rose-700",
};

export const brightInitial: BrightState = {
  bookings: [
    { id: "b1", student: "น้องภูมิ", subject: "คณิตศาสตร์", tutor: "ครูเอิร์ธ", slot: "จ 16:00", status: "รออนุมัติ" },
    { id: "b2", student: "น้องมาย", subject: "ภาษาอังกฤษ", tutor: "ครูมายด์", slot: "อ 17:00", status: "อนุมัติแล้ว" },
    { id: "b3", student: "น้องพลอย", subject: "วิทยาศาสตร์", tutor: "ครูพีช", slot: "ส 10:00", status: "รออนุมัติ" },
  ],
  students: [
    { id: "s1", name: "น้องภูมิ", grade: "ม.2", subject: "คณิตศาสตร์" },
    { id: "s2", name: "น้องมาย", grade: "ป.6", subject: "ภาษาอังกฤษ" },
    { id: "s3", name: "น้องพลอย", grade: "ม.1", subject: "วิทยาศาสตร์" },
  ],
  subject: SUBJECTS[0],
  tutorId: "t1",
  slot: SLOTS[0],
  confirmed: false,
  newStudent: "",
};

const store = createDemoStore("lcs-demo-brightslot-v1", brightInitial);
export const BrightSlotProvider = store.Provider;
export const useBrightSlot = store.useStore;

export const brightBrand: DemoBrandMeta = {
  slug: "tutor-admin",
  name: "BrightSlot Tutor",
  subtitle: "สถาบันกวดวิชาม็อกอัพ",
  accent: "bg-[#1B3A5C]",
  accentBg: "bg-[#EEF3F8]",
  accentText: "text-[#1B3A5C]",
};

export const brightNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/book`, label: "จองคาบ", group: "ผู้ปกครอง" },
  { href: `${BASE}/schedule`, label: "ตารางจอง", group: "หลังบ้าน" },
  { href: `${BASE}/tutors`, label: "ติวเตอร์", group: "หลังบ้าน" },
  { href: `${BASE}/students`, label: "นักเรียน", group: "หลังบ้าน" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน" },
];
