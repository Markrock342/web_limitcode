import type { Metadata } from "next";
import { LINE_ID, LINE_URL } from "./site";

/** เปลี่ยนเป็นโดเมนจริงเมื่อ deploy แล้ว */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://limitcodestudio.vercel.app";

export const SITE_NAME = "LIMIT CODE STUDIO";
export const SITE_NAME_SHORT = "LIMIT CODE";

export const DEFAULT_DESCRIPTION =
  "LIMIT CODE STUDIO รับทำเว็บไซต์ เว็บแอป แอปพลิเคชัน และระบบหลังบ้านสำหรับธุรกิจ SME คุยง่าย วางระบบเป็น เริ่มจาก MVP ได้ ปรึกษาฟรีผ่าน LINE OA";

export const SEO_KEYWORDS = [
  "รับทำเว็บไซต์",
  "รับทำเว็บแอป",
  "รับทำแอปพลิเคชัน",
  "รับทำระบบหลังบ้าน",
  "รับทำเว็บขายของ",
  "รับทำเว็บร้านอาหาร",
  "ระบบจองออนไลน์",
  "ระบบนัดหมาย",
  "เว็บไซต์ธุรกิจ",
  "พัฒนาเว็บไซต์",
  "พัฒนาแอป",
  "ทำเว็บ SME",
  "รับทำ MVP",
  "ฟรีแลนซ์พัฒนาเว็บ",
  "รับทำเว็บ Next.js",
  "LIMIT CODE STUDIO",
  "LIMIT CODE",
  LINE_ID,
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — รับทำเว็บไซต์ แอป และระบบหลังบ้านสำหรับธุรกิจ`,
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
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — รับทำเว็บไซต์ แอป และระบบหลังบ้าน`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/brand/lcs-cover.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — รับทำเว็บไซต์ แอป และระบบหลังบ้าน`,
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
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords ?? SEO_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: "/brand/lcs-cover.png", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
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
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/brand/lcs-logo.png`,
    logo: `${SITE_URL}/brand/lcs-logo.png`,
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
    availableLanguage: ["Thai"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Thai",
      url: LINE_URL,
    },
    sameAs: [LINE_URL],
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "E-commerce",
      "Booking System",
      "Business Dashboard",
      "Next.js",
      "React",
    ],
    offers: {
      "@type": "Offer",
      description: "รับพัฒนาเว็บไซต์ เว็บแอป และระบบหลังบ้านสำหรับธุรกิจ",
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
    inLanguage: "th-TH",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/lcs-logo.png`,
      },
    },
  };
}
