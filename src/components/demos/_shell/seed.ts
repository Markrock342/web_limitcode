const FIRST = [
  "มานี",
  "วิชัย",
  "อรทัย",
  "สมชาย",
  "ก้อง",
  "นิดา",
  "บอย",
  "มิ้นท์",
  "ต้น",
  "แบงค์",
  "ออย",
  "น็อต",
  "แพร",
  "เจี๊ยบ",
  "ฝน",
  "กิ๊ฟ",
  "ปอ",
  "แอน",
  "โบว์",
  "ติ๊ก",
];

const LAST = [
  "ใจดี",
  "สุขสันต์",
  "ร่มเย็น",
  "ทองดี",
  "แสงทอง",
  "บุญมี",
  "ศรีสุข",
  "วัฒนา",
  "พงษ์ไทย",
  "เจริญ",
];

const STREETS = [
  "ถ.ตลาดใหม่",
  "ซ.ร่มเย็น",
  "ถ.สุขุมวิท",
  "หมู่บ้านสุขใจ",
  "อาคาร GreenHub",
  "คอนโด SkyPark",
  "ถ.พระราม 9",
  "ซ.ลาดพร้าว",
];

export function thaiName(i: number) {
  return `คุณ${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`;
}

export function thaiPhone(i: number) {
  const a = String(80 + (i % 10)).padStart(2, "0");
  const b = String(100 + ((i * 7) % 900)).padStart(3, "0");
  const c = String(1000 + ((i * 13) % 9000)).padStart(4, "0");
  return `0${a}-${b}-${c}`;
}

export function thaiAddress(i: number) {
  return `${10 + (i % 90)}/${1 + (i % 9)} ${STREETS[i % STREETS.length]}`;
}

export function isoDateOffset(days: number) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// Deterministic Thai date formatting — Intl/toLocaleDateString output differs
// between Node (SSR) and browsers, which breaks hydration.
const TH_WEEKDAYS = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
const TH_MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

export function fmtThDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return `${TH_WEEKDAYS[d.getDay()]} ${d.getDate()} ${TH_MONTHS[d.getMonth()]}`;
}

export function fmtThNumericDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}`;
}

export function demoId(prefix: string, n: number, pad = 4) {
  return `${prefix}-${String(n).padStart(pad, "0")}`;
}

export function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length];
}

export function money(n: number) {
  return `฿${n.toLocaleString("th-TH")}`;
}
