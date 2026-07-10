"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/venue-booking";

export type EventStatus = "รออนุมัติ" | "อนุมัติแล้ว" | "ปฏิเสธ";
export type QuoteStatus = "ร่าง" | "รออนุมัติ" | "อนุมัติแล้ว";

export type Venue = {
  id: string;
  name: string;
  capacity: number;
  price: number;
  blurb: string;
  img: string;
  tags: string[];
};

export type BookingRequest = {
  id: string;
  venueId: string;
  venueName: string;
  client: string;
  phone: string;
  date: string;
  guests: number;
  note: string;
  status: EventStatus;
  img: string;
};

export type Quote = {
  id: string;
  client: string;
  venue: string;
  amount: number;
  status: QuoteStatus;
  img: string;
};

export type VenueState = {
  venues: Venue[];
  events: BookingRequest[];
  quotes: Quote[];
  venueId: string;
  dateChip: string;
  guests: number;
  client: string;
  phone: string;
  note: string;
  lastBookedId: string | null;
  eventFilter: EventStatus | "ทั้งหมด";
};

export const DATE_CHIPS = ["ส. 12 ก.ค.", "อา. 13 ก.ค.", "ส. 19 ก.ค.", "อา. 20 ก.ค.", "ส. 26 ก.ค."];

export const EVENT_STYLE: Record<EventStatus, string> = {
  รออนุมัติ: "bg-amber-100 text-amber-800",
  อนุมัติแล้ว: "bg-emerald-100 text-emerald-800",
  ปฏิเสธ: "bg-rose-100 text-rose-700",
};

export const QUOTE_STYLE: Record<QuoteStatus, string> = {
  ร่าง: "bg-slate-100 text-slate-600",
  รออนุมัติ: "bg-amber-100 text-amber-800",
  อนุมัติแล้ว: "bg-emerald-100 text-emerald-800",
};

export const venueInitial: VenueState = {
  venues: [
    {
      id: "hall-a",
      name: "Grand Ballroom A",
      capacity: 280,
      price: 45000,
      blurb: "ห้องบอลรูมใหญ่ เหมาะงานแต่ง / กาล่า",
      img: "/img/resto-hero.jpg",
      tags: ["งานแต่ง", "กาล่า", "เวที"],
    },
    {
      id: "hall-b",
      name: "Garden Pavilion",
      capacity: 120,
      price: 28000,
      blurb: "ศาลาสวนกลางแจ้ง บรรยากาศอบอุ่น",
      img: "/img/food-1.jpg",
      tags: ["งานหมั้น", "ปาร์ตี้", "สวน"],
    },
    {
      id: "hall-c",
      name: "Sky Lounge",
      capacity: 80,
      price: 22000,
      blurb: "เลานจ์ชั้นบน วิวเมือง งานค็อกเทล",
      img: "/img/food-3.jpg",
      tags: ["ค็อกเทล", "เปิดตัว", "VIP"],
    },
    {
      id: "hall-d",
      name: "Studio Hall",
      capacity: 60,
      price: 15000,
      blurb: "ห้องอเนกประสงค์ สัมมนา / เวิร์กช็อป",
      img: "/img/office-hero.jpg",
      tags: ["สัมมนา", "เวิร์กช็อป", "ประชุม"],
    },
    {
      id: "hall-e",
      name: "Market Court",
      capacity: 150,
      price: 32000,
      blurb: "โถงตลาดสไตล์อินดัสเทรียล งานป๊อปอัพ",
      img: "/img/shop-hero.jpg",
      tags: ["ป๊อปอัพ", "แฟร์", "ตลาด"],
    },
    {
      id: "hall-f",
      name: "Chef's Dining",
      capacity: 40,
      price: 18000,
      blurb: "ห้องดินเนอร์ส่วนตัว เชฟคอร์ส",
      img: "/img/food-5.jpg",
      tags: ["ดินเนอร์", "ไพรเวท", "เชฟ"],
    },
  ],
  events: [
    {
      id: "EV-101",
      venueId: "hall-a",
      venueName: "Grand Ballroom A",
      client: "คุณมาร์ค · งานแต่ง",
      phone: "081-xxx-1100",
      date: "ส. 19 ก.ค.",
      guests: 220,
      note: "ต้องการเวที + ไฟ",
      status: "รออนุมัติ",
      img: "/img/resto-hero.jpg",
    },
    {
      id: "EV-102",
      venueId: "hall-c",
      venueName: "Sky Lounge",
      client: "บริษัท Nova Soft",
      phone: "02-xxx-4412",
      date: "อา. 13 ก.ค.",
      guests: 70,
      note: "เปิดตัวผลิตภัณฑ์",
      status: "อนุมัติแล้ว",
      img: "/img/food-3.jpg",
    },
    {
      id: "EV-103",
      venueId: "hall-d",
      venueName: "Studio Hall",
      client: "คุณพิมพ์ · เวิร์กช็อป",
      phone: "062-xxx-7788",
      date: "ส. 12 ก.ค.",
      guests: 45,
      note: "",
      status: "รออนุมัติ",
      img: "/img/office-hero.jpg",
    },
  ],
  quotes: [
    {
      id: "Q-501",
      client: "คุณมาร์ค · งานแต่ง",
      venue: "Grand Ballroom A",
      amount: 52000,
      status: "รออนุมัติ",
      img: "/img/resto-hero.jpg",
    },
    {
      id: "Q-502",
      client: "บริษัท Nova Soft",
      venue: "Sky Lounge + แพ็กค็อกเทล",
      amount: 31000,
      status: "อนุมัติแล้ว",
      img: "/img/food-3.jpg",
    },
    {
      id: "Q-503",
      client: "คุณเอิร์ธ · ป๊อปอัพ",
      venue: "Market Court",
      amount: 28000,
      status: "ร่าง",
      img: "/img/shop-hero.jpg",
    },
  ],
  venueId: "hall-a",
  dateChip: "ส. 19 ก.ค.",
  guests: 80,
  client: "",
  phone: "",
  note: "",
  lastBookedId: null,
  eventFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-venuehive-v1", venueInitial);
export const VenueHiveProvider = store.Provider;
export const useVenueHive = store.useStore;

export const venueBrand: DemoBrandMeta = {
  slug: "venue-booking",
  name: "VenueHive",
  subtitle: "จองห้องจัดเลี้ยง · อีเวนต์ + ใบเสนอราคา",
  accent: "bg-[#6B3F3F]",
  accentBg: "bg-[#F6EEEE]",
  accentText: "text-[#6B3F3F]",
};

export const venueNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/venues`, label: "ห้องจัดเลี้ยง", group: "ลูกค้า" },
  { href: `${BASE}/book`, label: "ขอจอง", group: "ลูกค้า" },
  { href: `${BASE}/events`, label: "อีเวนต์", group: "หลังบ้าน" },
  { href: `${BASE}/quotes`, label: "ใบเสนอราคา", group: "หลังบ้าน" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน" },
];

export function cycleQuoteStatus(s: QuoteStatus): QuoteStatus {
  if (s === "ร่าง") return "รออนุมัติ";
  if (s === "รออนุมัติ") return "อนุมัติแล้ว";
  return "ร่าง";
}
