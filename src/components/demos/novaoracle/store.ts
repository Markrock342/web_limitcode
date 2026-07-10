"use client";

import { createDemoStore } from "@/components/demos/_shell/createDemoStore";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export const BASE = "/demo/ai-cms";

export type PlanTier = "Free" | "Pro" | "Business";
export type ArticleStatus = "draft" | "published";

export type User = { id: string; name: string; plan: PlanTier; credits: number };
export type Persona = { id: string; name: string; enabled: boolean; prompt: string };
export type Article = { id: string; title: string; status: ArticleStatus };

export type NovaState = {
  users: User[];
  personas: Persona[];
  articles: Article[];
  editPersonaId: string | null;
  draftPrompt: string;
  newTitle: string;
};

export const PLANS: { id: PlanTier; price: string; features: string[] }[] = [
  { id: "Free", price: "฿0", features: ["50 เครดิต/เดือน", "1 Persona", "แชทพื้นฐาน"] },
  { id: "Pro", price: "฿990", features: ["500 เครดิต/เดือน", "5 Personas", "API access", "Priority queue"] },
  { id: "Business", price: "฿3,490", features: ["เครดิตไม่จำกัด", "Persona ไม่จำกัด", "SSO", "ทีมซัพพอร์ต"] },
];

export const novaInitial: NovaState = {
  users: [
    { id: "u1", name: "คุณแพรว", plan: "Pro", credits: 120 },
    { id: "u2", name: "คุณเจมส์", plan: "Free", credits: 18 },
    { id: "u3", name: "คุณฟ้า", plan: "Business", credits: 980 },
    { id: "u4", name: "คุณโอ๊ต", plan: "Pro", credits: 45 },
  ],
  personas: [
    { id: "pe1", name: "นักเขียนคอนเทนต์", enabled: true, prompt: "คุณเป็นนักเขียนภาษาไทยที่กระชับและน่าสนใจ" },
    { id: "pe2", name: "ที่ปรึกษา SEO", enabled: true, prompt: "วิเคราะห์คีย์เวิร์ดและโครงสร้างหน้าเว็บ" },
    { id: "pe3", name: "โค้ชขาย", enabled: false, prompt: "ช่วยร่างสคริปต์ขายและอีเมลติดตาม" },
  ],
  articles: [
    { id: "a1", title: "เริ่มต้นกับ NovaOracle ใน 5 นาที", status: "published" },
    { id: "a2", title: "วิธีตั้ง Persona ให้ตรงแบรนด์", status: "draft" },
    { id: "a3", title: "เครดิตและแพ็กเกจอธิบายง่าย ๆ", status: "published" },
  ],
  editPersonaId: null,
  draftPrompt: "",
  newTitle: "",
};

const store = createDemoStore("lcs-demo-novaoracle-v1", novaInitial);
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
  { href: `${BASE}/users`, label: "ผู้ใช้", group: "ผลิตภัณฑ์" },
  { href: `${BASE}/plans`, label: "แพ็กเกจ", group: "ผลิตภัณฑ์" },
  { href: `${BASE}/personas`, label: "Personas", group: "ผลิตภัณฑ์" },
  { href: `${BASE}/content`, label: "คอนเทนต์", group: "CMS" },
  { href: `${BASE}/analytics`, label: "วิเคราะห์", group: "CMS" },
];
