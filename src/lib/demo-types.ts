import type { IconName } from "./site";

export type DemoCategory =
  | "ลูกค้าของเรา"
  | "ร้านอาหาร"
  | "ขายของ"
  | "จองบริการ"
  | "ระบบหลังบ้าน"
  | "เว็บบริษัท"
  | "อสังหาริมทรัพย์"
  | "โอเพนซอร์ส";

export type OssKind =
  | "booking"
  | "crm"
  | "shop"
  | "cms"
  | "chat"
  | "erp"
  | "ops"
  | "forms"
  | "analytics"
  | "auth"
  | "docs"
  | "automation"
  | "ai"
  | "dev";

export type Demo = {
  slug: string;
  name: string;
  category: DemoCategory;
  icon: IconName;
  tagline: string;
  description: string;
  /** ลิงก์เว็บจริงที่ deploy แล้ว (ถ้ามี การ์ดจะเปิดแท็บใหม่แทน /demo) */
  liveUrl?: string;
  /** Empty string = gradient fallback (used for large OSS catalogs) */
  preview?: string;
  swatch: string;
  accentText: string;
  tags: string[];
  features: string[];
  /** Third-party open-source example — not studio work */
  openSource?: {
    repo: string;
    license: string;
    kind: OssKind;
    domain?: string;
  };
};
