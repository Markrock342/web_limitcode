"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, isoDateOffset, pick, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
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

export type BookingDraft = Omit<Appointment, "status"> & { phone: string };

export type PawState = {
  session: DemoSession;
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
  pendingBooking: BookingDraft | null;
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

export const DATE_CHIPS = [isoDateOffset(0), isoDateOffset(1), isoDateOffset(2), isoDateOffset(3), isoDateOffset(4)];
export const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:00"];

export const STATUS_STYLE: Record<ApptStatus, string> = {
  รอตรวจ: "bg-violet-100 text-violet-800",
  มาแล้ว: "bg-emerald-100 text-emerald-800",
  ไม่มา: "bg-rose-100 text-rose-700",
};

export const pawInitial: PawState = {
  session: GUEST_SESSION,
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
    ...Array.from({ length: 20 }, (_, i) => {
      const service = pick(SERVICES, i);
      return {
        id: demoId("V", 105 + i, 3),
        owner: thaiName(i),
        pet: pick(["โมจิ", "โกโก้", "ถั่วแดง", "ลูก้า", "มะลิ", "พุดดิ้ง", "จัมโบ้", "ข้าวปั้น"], i),
        species: i % 3 === 0 ? "แมว" : "สุนัข",
        service: service.name,
        date: pick(DATE_CHIPS, i),
        time: pick(SLOTS, i * 2),
        vet: service.vet,
        status: pick<ApptStatus>(["รอตรวจ", "มาแล้ว", "ไม่มา"], i),
      };
    }),
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
    ...Array.from({ length: 9 }, (_, i) => ({
      id: demoId("PET", i + 4, 2),
      pet: pick(["โมจิ", "โกโก้", "ถั่วแดง", "ลูก้า", "มะลิ", "พุดดิ้ง", "จัมโบ้", "ข้าวปั้น", "เจ้าเนย"], i),
      species: i % 3 === 0 ? "แมว" : "สุนัข",
      breed: pick(["ชิสุ", "โกลเด้น", "สก็อตติชโฟลด์", "ปอมเมอเรเนียน"], i),
      owner: thaiName(i + 4),
      phone: thaiPhone(i + 4),
      note: i % 3 === 0 ? "แจ้งเตือนวัคซีนประจำปี" : "",
      img: pick(SERVICES, i).img,
    })),
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
    { id: "VT4", vet: "สพ.ญ.ธารา", specialty: "ศัลยกรรมสัตว์เล็ก", img: "/img/spa-1.jpg", blocks: ["12:00–16:00", "16:00–20:00"], active: true },
    { id: "VT5", vet: "สพ.ญ.ลลิตา", specialty: "ผิวหนังและภูมิแพ้", img: "/img/spa-4.jpg", blocks: ["08:00–12:00"], active: true },
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
  pendingBooking: null,
  apptFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-pawcare-v2", pawInitial);
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
  { href: BASE, label: "หน้าหลัก", group: "ลูกค้า" },
  { href: `${BASE}/book`, label: "จองคิว", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/confirm`, label: "ยืนยันนัด", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/account`, label: "นัดของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/appointments`, label: "นัดหมาย", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/patients`, label: "สัตว์เลี้ยง", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/vets`, label: "ตารางสัตวแพทย์", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "เข้าสู่ระบบ", access: "guest" },
];
