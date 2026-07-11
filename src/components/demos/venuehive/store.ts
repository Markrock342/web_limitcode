"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { pick, thaiName, thaiPhone } from "@/components/demos/_shell/seed";
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
  session: DemoSession;
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
  session: GUEST_SESSION,
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
    { id: "hall-g", name: "Riverside Deck", capacity: 90, price: 24000, blurb: "ดาดฟ้าริมน้ำ สำหรับงานเย็น", img: "/img/food-1.jpg", tags: ["ริมแม่น้ำ", "ค็อกเทล", "เย็น"] },
    { id: "hall-h", name: "The Workshop", capacity: 35, price: 12000, blurb: "ห้องเวิร์กช็อป แสงธรรมชาติ", img: "/img/work-1.jpg", tags: ["เทรนนิ่ง", "เวิร์กช็อป", "ทีม"] },
  ],
  events: Array.from({ length: 12 }, (_, i) => {
    const venue = pick([
      { id: "hall-a", name: "Grand Ballroom A", price: 45000, img: "/img/resto-hero.jpg" },
      { id: "hall-b", name: "Garden Pavilion", price: 28000, img: "/img/food-1.jpg" },
      { id: "hall-c", name: "Sky Lounge", price: 22000, img: "/img/food-3.jpg" },
      { id: "hall-d", name: "Studio Hall", price: 15000, img: "/img/office-hero.jpg" },
    ], i);
    return { id: `EV-${101 + i}`, venueId: venue.id, venueName: venue.name, client: thaiName(i), phone: thaiPhone(i), date: pick(DATE_CHIPS, i), guests: 30 + i * 15, note: i % 3 ? "แพ็กเกจอาหารและเครื่องเสียง" : "ต้องการเวที + ไฟ", status: pick<EventStatus>(["รออนุมัติ", "อนุมัติแล้ว", "ปฏิเสธ"], i), img: venue.img };
  }),
  quotes: Array.from({ length: 10 }, (_, i) => {
    const venue = pick([{ name: "Grand Ballroom A", price: 45000, img: "/img/resto-hero.jpg" }, { name: "Garden Pavilion", price: 28000, img: "/img/food-1.jpg" }, { name: "Sky Lounge", price: 22000, img: "/img/food-3.jpg" }], i);
    return { id: `Q-${501 + i}`, client: thaiName(i + 12), venue: venue.name, amount: venue.price + i * 2500, status: pick<QuoteStatus>(["ร่าง", "รออนุมัติ", "อนุมัติแล้ว"], i), img: venue.img };
  }),
  venueId: "hall-a",
  dateChip: "ส. 19 ก.ค.",
  guests: 80,
  client: "",
  phone: "",
  note: "",
  lastBookedId: null,
  eventFilter: "ทั้งหมด",
};

const store = createDemoStore("lcs-demo-venuehive-v2", venueInitial);
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
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "ลูกค้า", access: "member" },
  { href: `${BASE}/events`, label: "อีเวนต์", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/quotes`, label: "ใบเสนอราคา", group: "หลังบ้าน", access: "staff" },
  { href: `${BASE}/admin`, label: "แอดมิน", group: "หลังบ้าน", access: "staff" },
];

export function cycleQuoteStatus(s: QuoteStatus): QuoteStatus {
  if (s === "ร่าง") return "รออนุมัติ";
  if (s === "รออนุมัติ") return "อนุมัติแล้ว";
  return "ร่าง";
}
