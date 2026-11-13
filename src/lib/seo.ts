import type { Metadata } from "next";
import { CONTACT, LINE_ID, LINE_URL } from "./site";
import { SYSTEM_DEMOS } from "./demos";

/** Canonical origin: never fall back to an old deployment domain. */
export const SITE_URL =
  new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.limitcode.shop").origin;

export const SITE_NAME = "LIMIT CODE STUDIO";
export const SITE_NAME_SHORT = "LIMIT CODE";

export const DEFAULT_DESCRIPTION =
  "LIMIT CODE STUDIO ทีมฟรีแลนซ์รับทำระบบ ERP ตามการทำงานของธุรกิจ เชื่อมงานขาย จัดซื้อ คลังสินค้า และ CRM พร้อมพัฒนาเว็บไซต์และระบบจอง";

export const SEO_KEYWORDS = [
  "รับทำ ERP",
  "รับพัฒนาระบบ ERP",
  "ERP สำหรับธุรกิจนำเข้าและจัดจำหน่าย",
  "รับทำระบบจองออนไลน์",
  "รับทำระบบหลังบ้าน",
  "รับทำ Web App",
  "รับทำ Admin Dashboard",
  "รับทำระบบ CRM",
  "รับทำ Job Order",
  "ระบบจองสนาม",
  "ระบบนัดหมายออนไลน์",
  "ระบบจองคลินิก",
  "ระบบโรงแรม PMS",
  "ระบบฟิตเนสสมาชิก",
  "ระบบ AI สำหรับธุรกิจ",
  "ระบบซักรีดออนไลน์",
  "ระบบ coworking",
  "ระบบจองฮอลล์",
  "ระบบคาร์แคร์",
  "ฟรีแลนซ์ทำระบบ",
  "ฟรีแลนซ์ Software Studio",
  "Software Studio ไทย",
  "พัฒนาเว็บแอป SME",
  "รับทำระบบธุรกิจบริการ",
  "LIMIT CODE STUDIO",
  "LIMIT CODE",
  LINE_ID,
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — รับทำระบบ ERP และระบบหลังบ้านสำหรับธุรกิจ`,
    template: `%s | ${SITE_NAME_SHORT}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — รับทำระบบ ERP และระบบหลังบ้านสำหรับธุรกิจ`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/brand/lcs-cover.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ฟรีแลนซ์ Software Studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — รับทำระบบ ERP และระบบหลังบ้านสำหรับธุรกิจ`,
    description: DEFAULT_DESCRIPTION,
    images: ["/brand/lcs-cover.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "TH",
    "geo.placename": "Thailand",
  },
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** หน้าย่อยในเดโมบางหน้าอาจไม่ต้อง index ลึก — ค่าเริ่มต้นยัง index */
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords ?? SEO_KEYWORDS,
    robots: noIndex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "th_TH",
      type: "website",
      images: [{ url: "/brand/lcs-cover.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/lcs-cover.png"],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME_SHORT,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/brand/lcs-logo.png`,
    logo: `${SITE_URL}/brand/lcs-logo.png`,
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
    availableLanguage: ["Thai", "English", "Chinese", "th", "en", "zh"],
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Thai", "English", "Chinese"],
        email: CONTACT.email,
        telephone: CONTACT.phoneHref.replace("tel:", ""),
        name: CONTACT.personThai,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Thai", "English", "Chinese"],
        url: LINE_URL,
      },
    ],
    sameAs: [LINE_URL, CONTACT.facebookHref, CONTACT.pageFacebookHref],
    knowsAbout: [
      "Web App Development",
      "Custom ERP Development",
      "ERP for Import and Distribution Businesses",
      "Booking System",
      "CRM",
      "Job Order System",
      "Business Dashboard",
      "AI Integration",
      "Hotel PMS",
      "Clinic Appointment System",
      "Fleet Maintenance Software",
      "Next.js",
      "React",
    ],
    offers: {
      "@type": "Offer",
      description: "พัฒนา Web App และระบบหลังบ้านสำหรับธุรกิจบริการ",
      url: `${SITE_URL}/contact`,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "th-TH",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/** ItemList ของระบบม็อกอัพ — ช่วยให้ Google เข้าใจพอร์ตโฟลิโอ */
export function showcaseItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ตัวอย่างระบบม็อกอัพจาก LIMIT CODE STUDIO",
    description: "ระบบ Web App และหลังบ้านที่กดลองใช้ได้จริง",
    numberOfItems: SYSTEM_DEMOS.length,
    itemListElement: SYSTEM_DEMOS.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      description: d.description,
      url: `${SITE_URL}/demo/${d.slug}`,
    })),
  };
}
