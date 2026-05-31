import type { IconName } from "./site";

export type DemoCategory = "ร้านอาหาร" | "ขายของ" | "จองบริการ" | "ระบบหลังบ้าน" | "เว็บบริษัท";

export type Demo = {
  slug: string;
  name: string;
  category: DemoCategory;
  icon: IconName;
  tagline: string;
  description: string;
  // real preview image (screenshot of the live demo)
  preview: string;
  // visual identity for the catalog card
  swatch: string; // gradient classes
  accentText: string;
  tags: string[];
  features: string[];
};

export const DEMOS: Demo[] = [
  {
    slug: "restaurant",
    name: "BISTRO CAFÉ",
    category: "ร้านอาหาร",
    icon: "coffee",
    tagline: "เว็บร้านอาหาร / คาเฟ่ + จองโต๊ะ",
    description:
      "ตัวอย่างเว็บร้านอาหารสไตล์พรีเมียม โทนครีม-อบอุ่น โชว์เมนูแยกหมวด ระบบจองโต๊ะ และแผนที่ร้าน",
    preview: "/showcase/restaurant.jpg",
    swatch: "from-amber-400 via-orange-400 to-rose-400",
    accentText: "text-amber-700",
    tags: ["เมนูออนไลน์", "จองโต๊ะ", "แผนที่"],
    features: ["เมนูแยกหมวด พร้อมราคา", "ฟอร์มจองโต๊ะเลือกวัน-เวลา-จำนวนคน", "ข้อมูลติดต่อและแผนที่ร้าน"],
  },
  {
    slug: "shop",
    name: "SweetShop",
    category: "ขายของ",
    icon: "cart",
    tagline: "เว็บขายของออนไลน์ + ตะกร้า + ชำระเงิน",
    description:
      "ตัวอย่างร้านค้าออนไลน์โทนพาสเทลน่ารัก มีหน้าสินค้า ตะกร้า เลือกวิธีชำระเงิน และสรุปออเดอร์",
    preview: "/showcase/shop.jpg",
    swatch: "from-rose-400 via-pink-400 to-fuchsia-400",
    accentText: "text-pink-600",
    tags: ["แคตตาล็อก", "ตะกร้า", "ชำระเงิน"],
    features: ["หน้าสินค้าพร้อมราคา", "ตะกร้าสินค้าแบบเรียลไทม์", "เลือกวิธีชำระเงิน + สรุปออเดอร์"],
  },
  {
    slug: "booking",
    name: "Glow Beauty & Wellness",
    category: "จองบริการ",
    icon: "calendar",
    tagline: "ระบบจองบริการ / นัดหมาย",
    description:
      "ตัวอย่างระบบนัดหมายสำหรับคลินิก ร้านเสริมสวย และฟิตเนส เลือกบริการ ปฏิทิน เวลา และยืนยันพร้อมแจ้งเตือน",
    preview: "/showcase/booking.jpg",
    swatch: "from-violet-400 via-purple-400 to-fuchsia-400",
    accentText: "text-violet-700",
    tags: ["เลือกบริการ", "ปฏิทิน + เวลา", "แจ้งเตือน"],
    features: ["เลือกบริการพร้อมราคา/ระยะเวลา", "ปฏิทินและช่วงเวลาว่าง", "ยืนยันพร้อมแจ้งเตือนนัดหมาย"],
  },
  {
    slug: "dashboard",
    name: "LCS Business Dashboard",
    category: "ระบบหลังบ้าน",
    icon: "dashboard",
    tagline: "ระบบหลังบ้าน / เว็บเฉพาะธุรกิจ",
    description:
      "ตัวอย่างระบบหลังบ้านโทน Dark Tech มีภาพรวมธุรกิจ KPI กราฟยอดขาย ตารางออเดอร์ และสินค้าขายดี",
    preview: "/showcase/dashboard.jpg",
    swatch: "from-blue-600 via-sky-500 to-slate-800",
    accentText: "text-blue-700",
    tags: ["KPI", "กราฟยอดขาย", "ตารางออเดอร์"],
    features: ["การ์ดสรุปยอดขาย/ออเดอร์", "กราฟยอดขาย + โดนัทสัดส่วน", "ตารางออเดอร์ + สินค้าขายดี"],
  },
  {
    slug: "corporate",
    name: "COMPANY",
    category: "เว็บบริษัท",
    icon: "globe",
    tagline: "เว็บไซต์บริษัท โทนพรีเมียม",
    description:
      "ตัวอย่างเว็บไซต์บริษัทโทน Navy-Gold ดูน่าเชื่อถือ โครงสร้างครบ ตั้งแต่ Hero บริการ ผลงาน ไปจนถึงฟอร์มติดต่อ",
    preview: "/showcase/corporate.jpg",
    swatch: "from-slate-800 via-blue-900 to-amber-600",
    accentText: "text-amber-700",
    tags: ["องค์กร", "บริการ", "ติดต่อ"],
    features: ["Hero + ตัวเลขความน่าเชื่อถือ", "บริการ 4 ด้าน + ผลงาน", "ฟอร์มติดต่อทีมขาย"],
  },
];

export function getDemo(slug: string): Demo | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
