"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, fmtThDate, isoDateOffset, pick, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/clinic-admin";

export type ApptStatus = "รอ" | "มาแล้ว" | "ไม่มา" | "ยกเลิก";

export type Appointment = {
  id: string;
  patient: string;
  patientId: string;
  memberUsername?: string;
  service: string;
  date: string;
  time: string;
  doctor: string;
  status: ApptStatus;
};

export type Patient = { id: string; name: string; phone: string; note: string };

export type DoctorBlock = {
  id: string;
  doctor: string;
  specialty: string;
  blocks: string[];
  active: boolean;
};

export type BookingDraft = {
  id: string;
  patient: string;
  patientId: string;
  memberUsername: string;
  service: string;
  date: string;
  time: string;
  doctor: string;
};

export type MediState = {
  session: DemoSession;
  appointments: Appointment[];
  patients: Patient[];
  schedule: DoctorBlock[];
  serviceId: string;
  dateChip: string;
  slot: string | null;
  name: string;
  phone: string;
  lastBookedId: string | null;
  pendingBooking: BookingDraft | null;
  apptFilter: ApptStatus | "ทั้งหมด";
};

export const SERVICES = [
  { id: "gp", name: "ตรวจสุขภาพทั่วไป", mins: 20, doctor: "พญ.มินตรา ศรีสุข", img: "/img/medical/doctor-1.jpg", blurb: "ตรวจสุขภาพเบื้องต้น ปรึกษาอาการ" },
  { id: "dental", name: "ทันตกรรมครบวงจร", mins: 40, doctor: "ทพ.กิตติพงศ์ วัฒนะ", img: "/img/medical/dental.jpg", blurb: "ขูดหินปูน อุดฟัน ตรวจช่องปาก" },
  { id: "physio", name: "กายภาพบำบัด", mins: 45, doctor: "กภ.อรุณี รุ่งเรือง", img: "/img/medical/physio.jpg", blurb: "บำบัดกล้ามเนื้อและข้อ" },
  { id: "vaccine", name: "วัคซีนและเวชศาสตร์เดินทาง", mins: 15, doctor: "พญ.มินตรา ศรีสุข", img: "/img/medical/steth.jpg", blurb: "วัคซีนตามฤดูกาลและแผนสุขภาพ" },
  { id: "skin", name: "ผิวหนังและเลเซอร์", mins: 30, doctor: "พญ.พิมพ์ชนก ไพศาล", img: "/img/medical/hospital.jpg", blurb: "ปรึกษาผิวหนัง ผื่นแพ้ และการดูแลผิว" },
  { id: "child", name: "ตรวจสุขภาพเด็ก", mins: 30, doctor: "พญ.วรินทร์ทิพย์ แสงทอง", img: "/img/medical/doctor-1.jpg", blurb: "ติดตามพัฒนาการและสุขภาพเด็ก" },
];

export const DATE_CHIPS = [isoDateOffset(0), isoDateOffset(1), isoDateOffset(2), isoDateOffset(3), isoDateOffset(4)];
export const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:00"];

export const STATUS_STYLE: Record<ApptStatus, string> = {
  รอ: "bg-amber-100 text-amber-800",
  มาแล้ว: "bg-emerald-100 text-emerald-800",
  ไม่มา: "bg-rose-100 text-rose-700",
  ยกเลิก: "bg-slate-200 text-slate-700",
};

export function formatMediDate(date: string) {
  return fmtThDate(date);
}

const PATIENT_NAMES = [
  "คุณชลธิชา วัฒนพงศ์", "คุณณัฐวุฒิ สายสมบัติ", "คุณพิมพ์ลภัส บุญญานันท์", "คุณอภิรดี รัตนมณี",
  "คุณกิตติภพ จิรภัทร", "คุณณิชาภัทร สุขเกษม", "คุณธนกฤต พิพัฒน์กุล", "คุณวรัญญา ตั้งสกุล",
  "คุณปกรณ์ชัย ศรีวิไล", "คุณพิชชาภา อุดมทรัพย์", "คุณธีรภัทร มหาสาร", "คุณกัญญารัตน์ ภู่วัฒนา",
  "คุณศุภณัฐ นาคะวัฒน์", "คุณอริสรา รุ่งสว่าง", "คุณพีรณัฐ อัครเดช", "คุณภัทรวดี มงคลชัย",
  "คุณนพดล เจริญผล", "คุณสุภัสสรา พรหมรักษ์", "คุณธัญชนก วงศ์วิจิตร", "คุณณรงค์ฤทธิ์ ศรีสมบูรณ์",
];

const SEED_PATIENTS: Patient[] = Array.from({ length: 20 }, (_, i) => ({
  id: demoId("P", i + 1, 3),
  name: PATIENT_NAMES[i] ?? thaiName(i),
  phone: thaiPhone(i + 3),
  note: pick(["แพ้เพนิซิลลิน", "ติดตามผล 3 เดือน", "", "แจ้งเตือนก่อนนัด 1 วัน", "มีโรคประจำตัว: ความดัน"], i),
}));

const SEED_APPOINTMENTS: Appointment[] = Array.from({ length: 24 }, (_, i) => {
  const patient = SEED_PATIENTS[i % SEED_PATIENTS.length];
  const service = pick(SERVICES, i);
  return {
    id: demoId("A", 101 + i, 3),
    patient: patient.name,
    patientId: patient.id,
    memberUsername: i < 4 ? "member" : undefined,
    service: service.name,
    date: isoDateOffset(i % 5),
    time: pick(SLOTS, i * 2),
    doctor: service.doctor,
    status: pick<ApptStatus>(["รอ", "มาแล้ว", "ไม่มา", "ยกเลิก"], i),
  };
});

export const mediInitial: MediState = {
  session: GUEST_SESSION,
  appointments: SEED_APPOINTMENTS,
  patients: SEED_PATIENTS,
  schedule: [
    { id: "D1", doctor: "พญ.มินตรา ศรีสุข", specialty: "อายุรกรรม", blocks: ["08:00–12:00", "12:00–16:00"], active: true },
    { id: "D2", doctor: "ทพ.กิตติพงศ์ วัฒนะ", specialty: "ทันตกรรม", blocks: ["08:00–12:00"], active: true },
    { id: "D3", doctor: "กภ.อรุณี รุ่งเรือง", specialty: "กายภาพบำบัด", blocks: ["08:00–12:00", "16:00–20:00"], active: true },
    { id: "D4", doctor: "พญ.พิมพ์ชนก ไพศาล", specialty: "ผิวหนัง", blocks: ["12:00–16:00"], active: true },
    { id: "D5", doctor: "พญ.วรินทร์ทิพย์ แสงทอง", specialty: "กุมารเวชศาสตร์", blocks: ["08:00–12:00"], active: false },
  ],
  serviceId: "gp",
  dateChip: "วันนี้",
  slot: null,
  name: "",
  phone: "",
  lastBookedId: null,
  pendingBooking: null,
  apptFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-medislot-v2", mediInitial);
export const MediSlotProvider = store.Provider;
export const useMediSlot = store.useStore;

export const mediBrand: DemoBrandMeta = {
  slug: "clinic-admin",
  name: "MediSlot Clinic",
  subtitle: "คลินิกม็อกอัพ · จองคิว + หลังบ้าน",
  accent: "bg-[#0F6B6B]",
  accentBg: "bg-[#E6F4F3]",
  accentText: "text-[#0F6B6B]",
};

export const mediNav: DemoNavItem[] = [
  { href: BASE, label: "หน้าหลัก", group: "ลูกค้า" },
  { href: `${BASE}/book`, label: "จองคิว", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/confirm`, label: "ยืนยันนัด", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/appointments`, label: "นัดหมาย", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/patients`, label: "ผู้ป่วย", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/schedule`, label: "ตารางหมอ", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "เข้าสู่ระบบ", access: "guest" },
];
