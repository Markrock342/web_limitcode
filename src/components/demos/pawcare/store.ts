"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/pet-clinic";

export type ApptStatus = "รอตรวจ" | "มาแล้ว" | "ไม่มา";

export type Appointment = {
  id: string;
  owner: string;
  pet: string;
  species: string;
  service: string;
  date: string;
  time: string;
  vet: string;
  status: ApptStatus;
};

export type Patient = {
  id: string;
  pet: string;
  species: string;
  breed: string;
  owner: string;
  phone: string;
  note: string;
  img: string;
};

export type VetBlock = {
  id: string;
  vet: string;
  specialty: string;
  img: string;
  blocks: string[];
  active: boolean;
};

export type PawState = {
  appointments: Appointment[];
  patients: Patient[];
  schedule: VetBlock[];
  serviceId: string;
  dateChip: string;
  slot: string | null;
  owner: string;
  pet: string;
  phone: string;
  lastBookedId: string | null;
  apptFilter: ApptStatus | "ทั้งหมด";
};

export const SERVICES = [
  {
    id: "checkup",
    name: "ตรวจสุขภาพทั่วไป",
    mins: 30,
    vet: "สพ.ญ.มินตรา",
    price: 650,
    img: "/img/spa-1.jpg",
    blurb: "ตรวจร่างกาย ชั่งน้ำหนัก ปรึกษาอาการ",
  },
  {
    id: "vaccine",
    name: "ฉีดวัคซีน",
    mins: 20,
    vet: "สพ.ญ.มินตรา",
    price: 450,
    img: "/img/spa-2.jpg",
    blurb: "วัคซีนตามอายุและแผนสุขภาพ",
  },
  {
    id: "dental",
    name: "ทำความสะอาดฟัน",
    mins: 45,
    vet: "สพ.กิตติ",
    price: 1800,
    img: "/img/spa-3.jpg",
    blurb: "ขูดหินปูน ตรวจช่องปากสัตว์เลี้ยง",
  },
  {
    id: "groom",
    name: "อาบน้ำตัดขน",
    mins: 60,
    vet: "ทีมกรูมมิ่ง",
    price: 890,
    img: "/img/spa-4.jpg",
    blurb: "อาบน้ำ ตัดขน ตัดเล็บ เป่าแห้ง",
  },
];

export const DATE_CHIPS = ["วันนี้", "พรุ่งนี้", "พ. 16 ก.ค.", "พฤ. 17 ก.ค.", "ศ. 18 ก.ค."];
export const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:00"];

export const STATUS_STYLE: Record<ApptStatus, string> = {
  รอตรวจ: "bg-violet-100 text-violet-800",
  มาแล้ว: "bg-emerald-100 text-emerald-800",
  ไม่มา: "bg-rose-100 text-rose-700",
};

export const pawInitial: PawState = {
  appointments: [
    {
      id: "V-101",
      owner: "คุณนภา",
      pet: "มอลลี่",
      species: "สุนัข",
      service: "ตรวจสุขภาพทั่วไป",
      date: "วันนี้",
      time: "09:00",
      vet: "สพ.ญ.มินตรา",
      status: "รอตรวจ",
    },
    {
      id: "V-102",
      owner: "คุณธนพล",
      pet: "นุ่น",
      species: "แมว",
      service: "ฉีดวัคซีน",
      date: "วันนี้",
      time: "10:00",
      vet: "สพ.ญ.มินตรา",
      status: "มาแล้ว",
    },
    {
      id: "V-103",
      owner: "คุณพิมพ์",
      pet: "บราวนี่",
      species: "สุนัข",
      service: "ทำความสะอาดฟัน",
      date: "วันนี้",
      time: "11:00",
      vet: "สพ.กิตติ",
      status: "รอตรวจ",
    },
    {
      id: "V-104",
      owner: "คุณเอิร์ธ",
      pet: "ส้มจี๊ด",
      species: "แมว",
      service: "อาบน้ำตัดขน",
      date: "พรุ่งนี้",
      time: "14:00",
      vet: "ทีมกรูมมิ่ง",
      status: "รอตรวจ",
    },
  ],
  patients: [
    {
      id: "PET-01",
      pet: "มอลลี่",
      species: "สุนัข",
      breed: "พุดเดิ้ล",
      owner: "คุณนภา",
      phone: "081-xxx-2201",
      note: "แพ้อาหารทะเล",
      img: "/img/spa-1.jpg",
    },
    {
      id: "PET-02",
      pet: "นุ่น",
      species: "แมว",
      breed: "เปอร์เซีย",
      owner: "คุณธนพล",
      phone: "089-xxx-4412",
      note: "นัดติดตามวัคซีน",
      img: "/img/spa-2.jpg",
    },
    {
      id: "PET-03",
      pet: "บราวนี่",
      species: "สุนัข",
      breed: "ชิวาว่า",
      owner: "คุณพิมพ์",
      phone: "062-xxx-7788",
      note: "",
      img: "/img/spa-3.jpg",
    },
  ],
  schedule: [
    {
      id: "VT1",
      vet: "สพ.ญ.มินตรา",
      specialty: "อายุรกรรมสัตว์เล็ก",
      img: "/img/spa-2.jpg",
      blocks: ["08:00–12:00", "12:00–16:00"],
      active: true,
    },
    {
      id: "VT2",
      vet: "สพ.กิตติ",
      specialty: "ทันตกรรมสัตว์",
      img: "/img/spa-3.jpg",
      blocks: ["08:00–12:00"],
      active: true,
    },
    {
      id: "VT3",
      vet: "ทีมกรูมมิ่ง",
      specialty: "อาบน้ำตัดขน",
      img: "/img/spa-4.jpg",
      blocks: ["08:00–12:00", "16:00–20:00"],
      active: true,
    },
  ],
  serviceId: "checkup",
  dateChip: "วันนี้",
  slot: null,
  owner: "",
  pet: "",
  phone: "",
  lastBookedId: null,
  apptFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-pawcare-v1", pawInitial);
export const PawCareProvider = store.Provider;
export const usePawCare = store.useStore;

export const pawBrand: DemoBrandMeta = {
  slug: "pet-clinic",
  name: "PawCare Vet Clinic",
  subtitle: "คลินิกสัตว์เลี้ยง · จองคิว + หลังบ้าน",
  accent: "bg-[#5B4B8A]",
  accentBg: "bg-[#F0ECF7]",
  accentText: "text-[#5B4B8A]",
};

export const pawNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/book`, label: "จองคิว", group: "เจ้าของสัตว์" },
  { href: `${BASE}/appointments`, label: "นัดหมาย", group: "หลังบ้าน" },
  { href: `${BASE}/patients`, label: "สัตว์เลี้ยง", group: "หลังบ้าน" },
  { href: `${BASE}/vets`, label: "ตารางสัตวแพทย์", group: "หลังบ้าน" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน" },
];
