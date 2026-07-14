"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, pick, thaiName } from "@/components/demos/_shell/seed";
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
  memberUsername?: string;
};

export type Student = { id: string; name: string; grade: string; subject: string };

export type Tutor = { id: string; name: string; subject: string; load: number; img: string; bio: string };

export type BrightState = {
  session: DemoSession;
  bookings: Booking[];
  students: Student[];
  subject: string;
  tutorId: string;
  slot: string;
  confirmed: boolean;
  newStudent: string;
  pendingBooking: Booking | null;
  lastBookingId: string | null;
};

export const SUBJECTS = ["คณิตศาสตร์", "ภาษาอังกฤษ", "วิทยาศาสตร์", "ภาษาไทย"];

export const TUTORS: Tutor[] = [
  { id: "t1", name: "ครูเอิร์ธ", subject: "คณิตศาสตร์", load: 70, img: "/img/education/tutor-f1.jpg", bio: "ติวเข้ม ม.ต้น–ม.ปลาย" },
  { id: "t2", name: "ครูมายด์", subject: "ภาษาอังกฤษ", load: 45, img: "/img/education/tutor-m1.jpg", bio: "Speaking + Grammar" },
  { id: "t3", name: "ครูพีช", subject: "วิทยาศาสตร์", load: 85, img: "/img/education/tutor-f2.jpg", bio: "ฟิสิกส์–เคมี ปูพื้นฐาน" },
  { id: "t4", name: "ครูแนน", subject: "ภาษาไทย", load: 30, img: "/img/education/tutor-m2.jpg", bio: "วรรณกรรม + ข้อสอบเข้า" },
  { id: "t5", name: "ครูฟ้า", subject: "คณิตศาสตร์", load: 55, img: "/img/education/tutor-m1.jpg", bio: "โจทย์ประยุกต์และสอบเข้า" },
  { id: "t6", name: "ครูนนท์", subject: "ภาษาอังกฤษ", load: 62, img: "/img/education/tutor-f2.jpg", bio: "Writing + IELTS foundation" },
  { id: "t7", name: "ครูลูกแก้ว", subject: "วิทยาศาสตร์", load: 48, img: "/img/education/tutor-m2.jpg", bio: "ชีววิทยาและเคมี" },
  { id: "t8", name: "ครูไอซ์", subject: "ภาษาไทย", load: 76, img: "/img/education/tutor-f1.jpg", bio: "อ่านจับใจความและ TGAT" },
];

export const SLOTS = ["จ 16:00", "อ 17:00", "พ 16:00", "พฤ 18:00", "ศ 17:00", "ส 10:00"];

export const STATUS_STYLE: Record<BookingStatus, string> = {
  รออนุมัติ: "bg-amber-100 text-amber-700",
  อนุมัติแล้ว: "bg-emerald-100 text-emerald-700",
  ยกเลิก: "bg-rose-100 text-rose-700",
};

const SEED_BOOKINGS: Booking[] = [
    { id: "b1", student: "น้องภูมิ", subject: "คณิตศาสตร์", tutor: "ครูเอิร์ธ", slot: "จ 16:00", status: "รออนุมัติ" },
    { id: "b2", student: "น้องมาย", subject: "ภาษาอังกฤษ", tutor: "ครูมายด์", slot: "อ 17:00", status: "อนุมัติแล้ว" },
    { id: "b3", student: "น้องพลอย", subject: "วิทยาศาสตร์", tutor: "ครูพีช", slot: "ส 10:00", status: "รออนุมัติ" },
];

const SEED_STUDENTS: Student[] = [
    { id: "s1", name: "น้องภูมิ", grade: "ม.2", subject: "คณิตศาสตร์" },
    { id: "s2", name: "น้องมาย", grade: "ป.6", subject: "ภาษาอังกฤษ" },
    { id: "s3", name: "น้องพลอย", grade: "ม.1", subject: "วิทยาศาสตร์" },
];

const EXTRA_STUDENTS: Student[] = Array.from({ length: 9 }, (_, index) => {
  const n = index + 4;
  return { id: `s${n}`, name: `น้อง${thaiName(n).replace("คุณ", "")}`, grade: pick(["ป.5", "ป.6", "ม.1", "ม.2", "ม.3"], n), subject: pick(SUBJECTS, n) };
});

const EXTRA_BOOKINGS: Booking[] = Array.from({ length: 17 }, (_, index) => {
  const n = index + 4;
  const student = pick([...SEED_STUDENTS, ...EXTRA_STUDENTS], n);
  const tutor = pick(TUTORS.filter((item) => item.subject === student.subject), n);
  return {
    id: demoId("B", n, 3),
    student: student.name,
    subject: student.subject,
    tutor: tutor.name,
    slot: pick(SLOTS, n),
    status: pick<BookingStatus>(["รออนุมัติ", "อนุมัติแล้ว", "อนุมัติแล้ว", "ยกเลิก"], n),
  };
});

export const brightInitial: BrightState = {
  session: GUEST_SESSION,
  bookings: [...SEED_BOOKINGS, ...EXTRA_BOOKINGS],
  students: [...SEED_STUDENTS, ...EXTRA_STUDENTS],
  subject: SUBJECTS[0],
  tutorId: "t1",
  slot: SLOTS[0],
  confirmed: false,
  newStudent: "",
  pendingBooking: null,
  lastBookingId: null,
};

const store = createDemoStore("lcs-demo-brightslot-v2", brightInitial);
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
  { href: `${BASE}/book`, label: "จองคาบ", group: "ผู้ปกครอง", access: "member" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ผู้ปกครอง", access: "member" },
  { href: `${BASE}/schedule`, label: "ตารางจอง", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/tutors`, label: "ติวเตอร์", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/students`, label: "นักเรียน", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "บัญชี", access: "guest" },
];
