import type { Metadata } from "next";
import { CONTACT, LINE_ID, LINE_URL } from "./site";
import { SYSTEM_DEMOS } from "./demos";

/** เปลี่ยนเป็นโดเมนจริงเมื่อ deploy แล้ว */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://limitcodestudio.vercel.app";

export const SITE_NAME = "LIMIT CODE STUDIO";
export const SITE_NAME_SHORT = "LIMIT CODE";

export const DEFAULT_DESCRIPTION =
  "LIMIT CODE STUDIO is a three-person freelance team — websites, booking, CRM, dashboards, and the tools a business actually uses. If the work still lives on LINE and Excel, bring it.";

export const SEO_KEYWORDS = [
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
    default: `${SITE_NAME} — freelance Web Apps and back-office systems for service businesses`,
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
    languages: {
      "en": SITE_URL,
      "th-TH": SITE_URL,
      "zh-CN": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["th_TH", "zh_CN"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — freelance Web Apps and back-office systems`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/brand/lcs-cover.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — freelance software studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — freelance Web Apps and back-office systems`,
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
      ? { index: false, follow: true }
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
      locale: "en_US",
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
    availableLanguage: ["English", "Thai", "Chinese", "en", "th", "zh"],
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Thai", "Chinese"],
        email: CONTACT.email,
        telephone: CONTACT.phoneHref.replace("tel:", ""),
        name: CONTACT.personThai,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Thai", "Chinese"],
        url: LINE_URL,
      },
    ],
    sameAs: [LINE_URL, CONTACT.facebookHref, CONTACT.pageFacebookHref],
    knowsAbout: [
      "Web App Development",
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
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/lcs-logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/showcase`,
      "query-input": "required name=search_term_string",
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
