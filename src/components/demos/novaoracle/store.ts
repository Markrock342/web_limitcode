"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import { GUEST_SESSION, type DemoSession } from "@/components/demos/_shell/demoAuth";
import { demoId, isoDateOffset, pick, thaiName } from "@/components/demos/_shell/seed";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/ai-cms";

export type PlanTier = "Free" | "Pro" | "Business";
export type ArticleStatus = "draft" | "published";

export type User = { id: string; name: string; plan: PlanTier; credits: number; joinedAt: string };
export type Persona = { id: string; name: string; enabled: boolean; prompt: string };
export type Article = { id: string; title: string; status: ArticleStatus; updatedAt: string };
export type CreditEntry = { id: string; userId: string; user: string; amount: number; note: string; at: string };

export type NovaState = {
  session: DemoSession;
  users: User[];
  personas: Persona[];
  articles: Article[];
  creditLedger: CreditEntry[];
  editPersonaId: string | null;
  draftPrompt: string;
  newTitle: string;
};

export const PLANS: { id: PlanTier; price: string; features: string[] }[] = [
  { id: "Free", price: "฿0", features: ["50 เครดิต/เดือน", "1 Persona", "แชทพื้นฐาน"] },
  { id: "Pro", price: "฿990", features: ["500 เครดิต/เดือน", "5 Personas", "API access", "Priority queue"] },
  { id: "Business", price: "฿3,490", features: ["เครดิตไม่จำกัด", "Persona ไม่จำกัด", "SSO", "ทีมซัพพอร์ต"] },
];

const PLAN_CYCLE: PlanTier[] = ["Free", "Pro", "Business", "Pro", "Free"];
const PERSONA_DATA = [
  ["นักเขียนคอนเทนต์", "คุณเป็นนักเขียนภาษาไทยที่กระชับและน่าสนใจ"],
  ["ที่ปรึกษา SEO", "วิเคราะห์คีย์เวิร์ดและโครงสร้างหน้าเว็บ"],
  ["โค้ชขาย", "ช่วยร่างสคริปต์ขายและอีเมลติดตาม"],
  ["นักวางแผนแคมเปญ", "สรุป objective กลุ่มเป้าหมายและช่องทาง"],
  ["นักวิจัยตลาด", "เปรียบเทียบคู่แข่งจากข้อมูลที่ให้เท่านั้น"],
  ["Customer Success", "ตอบลูกค้าด้วยน้ำเสียงช่วยเหลือและชัดเจน"],
  ["นักวิเคราะห์ข้อมูล", "หาข้อสังเกตจากตัวเลขและเสนอ next step"],
  ["บรรณาธิการแบรนด์", "ตรวจโทนเสียงและความสอดคล้องของแบรนด์"],
] as const;
const ARTICLE_TITLES = [
  "เริ่มต้นกับ NovaOracle ใน 5 นาที", "วิธีตั้ง Persona ให้ตรงแบรนด์", "เครดิตและแพ็กเกจอธิบายง่าย ๆ",
  "สร้าง content brief ที่ทีมใช้ต่อได้", "คู่มือเลือก Plan สำหรับทีมเติบโต", "เชื่อม workflow การขายกับ AI",
  "วิธีวัดคุณภาพคำตอบของ Persona", "รวม prompt สำหรับเจ้าของธุรกิจ", "ตั้ง governance ให้ทีมใช้ AI ปลอดภัย",
  "สิ่งที่ควรเตรียมก่อนเปิดใช้ API", "สรุป release notes เดือนนี้", "ทำให้ AI เข้าใจเสียงของแบรนด์",
] as const;

export const novaInitial: NovaState = {
  session: GUEST_SESSION,
  users: Array.from({ length: 16 }, (_, index) => {
    const n = index + 1;
    return { id: demoId("U", n), name: thaiName(n + 40), plan: pick(PLAN_CYCLE, n), credits: 30 + ((n * 83) % 880), joinedAt: isoDateOffset(-n * 7) };
  }),
  personas: PERSONA_DATA.map(([name, prompt], index) => ({ id: demoId("PE", index + 1), name, prompt, enabled: index !== 2 && index !== 6 })),
  articles: ARTICLE_TITLES.map((title, index) => ({ id: demoId("A", index + 1), title, status: index % 4 === 1 ? "draft" : "published", updatedAt: isoDateOffset(-index * 2) })),
  creditLedger: Array.from({ length: 22 }, (_, index) => {
    const userIndex = index % 16;
    const user = thaiName(userIndex + 41);
    const amount = index % 3 === 0 ? 100 : -(5 + (index % 5) * 5);
    return { id: demoId("CR", index + 1), userId: demoId("U", userIndex + 1), user, amount, note: amount > 0 ? "เติมเครดิตเดโม" : pick(["สร้างบทความ", "เรียกใช้ Persona", "สรุปรายงาน"], index), at: `${isoDateOffset(-index)} 10:${String(10 + index).padStart(2, "0")}` };
  }),
  editPersonaId: null,
  draftPrompt: "",
  newTitle: "",
};

const store = createDemoStore("lcs-demo-novaoracle-v2", novaInitial);
export const NovaOracleProvider = store.Provider;
export const useNovaOracle = store.useStore;

export const novaBrand: DemoBrandMeta = {
  slug: "ai-cms",
  name: "NovaOracle AI",
  subtitle: "แอดมินผลิตภัณฑ์ AI · เครดิต · Persona · CMS",
  accent: "bg-violet-700",
  accentBg: "bg-violet-50",
  accentText: "text-violet-800",
};

export const novaNav: DemoNavItem[] = [
  { href: BASE, label: "ภาพรวม", group: "ทั่วไป" },
  { href: `${BASE}/users`, label: "ผู้ใช้", group: "ผลิตภัณฑ์", access: "staff" },
  { href: `${BASE}/plans`, label: "แพ็กเกจ", group: "ผลิตภัณฑ์", access: "staff" },
  { href: `${BASE}/personas`, label: "Personas", group: "ผลิตภัณฑ์", access: "staff" },
  { href: `${BASE}/content`, label: "คอนเทนต์", group: "CMS", access: "staff" },
  { href: `${BASE}/analytics`, label: "วิเคราะห์", group: "CMS", access: "staff" },
  { href: `${BASE}/credits`, label: "เครดิต", group: "CMS", access: "staff" },
  { href: `${BASE}/account`, label: "บัญชีของฉัน", group: "บัญชี", access: "member" },
  { href: `${BASE}/login`, label: "เข้าสู่ระบบ", group: "ทั่วไป", access: "guest" },
];
