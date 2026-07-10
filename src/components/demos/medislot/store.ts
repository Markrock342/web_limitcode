"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/clinic-admin";

export type ApptStatus = "รอตรวจ" | "มาแล้ว" | "ไม่มา";

export type Appointment = {
  id: string;
  patient: string;
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

export type MediState = {
  appointments: Appointment[];
  patients: Patient[];
  schedule: DoctorBlock[];
  serviceId: string;
  dateChip: string;
  slot: string | null;
  name: string;
  phone: string;
  lastBookedId: string | null;
  apptFilter: ApptStatus | "ทั้งหมด";
};

export const SERVICES = [
  { id: "gp", name: "ตรวจทั่วไป", mins: 20, doctor: "พญ.มินตรา", img: "/img/spa-2.jpg", blurb: "ตรวจสุขภาพเบื้องต้น ปรึกษาอาการ" },
  { id: "dental", name: "ทันตกรรม", mins: 40, doctor: "ทพ.กิตติ", img: "/img/spa-3.jpg", blurb: "ขูดหินปูน อุดฟัน ตรวจช่องปาก" },
  { id: "physio", name: "กายภาพบำบัด", mins: 45, doctor: "กภ.อรุณ", img: "/img/spa-4.jpg", blurb: "บำบัดกล้ามเนื้อและข้อ" },
  { id: "vaccine", name: "ฉีดวัคซีน", mins: 15, doctor: "พญ.มินตรา", img: "/img/spa-1.jpg", blurb: "วัคซีนตามฤดูกาลและแผนสุขภาพ" },
];

export const DATE_CHIPS = ["วันนี้", "พรุ่งนี้", "พ. 16 ก.ค.", "พฤ. 17 ก.ค.", "ศ. 18 ก.ค."];
export const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:00"];

export const STATUS_STYLE: Record<ApptStatus, string> = {
  รอตรวจ: "bg-cyan-100 text-cyan-800",
  มาแล้ว: "bg-emerald-100 text-emerald-800",
  ไม่มา: "bg-rose-100 text-rose-700",
};

export const mediInitial: MediState = {
  appointments: [
    { id: "A-101", patient: "คุณนภา", service: "ตรวจทั่วไป", date: "วันนี้", time: "09:00", doctor: "พญ.มินตรา", status: "รอตรวจ" },
    { id: "A-102", patient: "คุณธนพล", service: "ทันตกรรม", date: "วันนี้", time: "10:00", doctor: "ทพ.กิตติ", status: "มาแล้ว" },
    { id: "A-103", patient: "คุณพิมพ์", service: "กายภาพบำบัด", date: "วันนี้", time: "11:00", doctor: "กภ.อรุณ", status: "รอตรวจ" },
    { id: "A-104", patient: "คุณเอิร์ธ", service: "ฉีดวัคซีน", date: "พรุ่งนี้", time: "14:00", doctor: "พญ.มินตรา", status: "รอตรวจ" },
  ],
  patients: [
    { id: "P-01", name: "คุณนภา", phone: "081-xxx-2201", note: "แพ้เพนิซิลลิน" },
    { id: "P-02", name: "คุณธนพล", phone: "089-xxx-4412", note: "นัดติดตามฟันผุ" },
    { id: "P-03", name: "คุณพิมพ์", phone: "062-xxx-7788", note: "" },
  ],
  schedule: [
    { id: "D1", doctor: "พญ.มินตรา", specialty: "อายุรกรรม", blocks: ["08:00–12:00", "12:00–16:00"], active: true },
    { id: "D2", doctor: "ทพ.กิตติ", specialty: "ทันตกรรม", blocks: ["08:00–12:00"], active: true },
    { id: "D3", doctor: "กภ.อรุณ", specialty: "กายภาพบำบัด", blocks: ["08:00–12:00", "16:00–20:00"], active: true },
  ],
  serviceId: "gp",
  dateChip: "วันนี้",
  slot: null,
  name: "",
  phone: "",
  lastBookedId: null,
  apptFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-medislot-v1", mediInitial);
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
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/book`, label: "จองคิว", group: "ผู้ป่วย" },
  { href: `${BASE}/appointments`, label: "นัดหมาย", group: "หลังบ้าน" },
  { href: `${BASE}/patients`, label: "ผู้ป่วย", group: "หลังบ้าน" },
  { href: `${BASE}/schedule`, label: "ตารางหมอ", group: "หลังบ้าน" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน" },
];
