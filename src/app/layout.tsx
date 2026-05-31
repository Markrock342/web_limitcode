import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Sora } from "next/font/google";
import "./globals.css";

const thai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://limitcodestudio.vercel.app"
  ),
  title: "LIMIT CODE STUDIO — รับทำเว็บไซต์ แอป และระบบหลังบ้านสำหรับธุรกิจ",
  description:
    "ทีมฟรีแลนซ์สายพัฒนา เว็บไซต์ เว็บแอป แอปพลิเคชัน และระบบหลังบ้านสำหรับธุรกิจ คุยง่าย วางระบบเป็น เริ่มจาก MVP แล้วต่อยอดได้ ปรึกษาฟรีผ่าน LINE OA @026iaomj",
  keywords: [
    "รับทำเว็บไซต์",
    "รับทำเว็บแอป",
    "ระบบหลังบ้าน",
    "ระบบจอง",
    "เว็บร้านอาหาร",
    "เว็บขายของออนไลน์",
    "MVP",
    "Next.js",
    "React",
    "LIMIT CODE STUDIO",
  ],
  openGraph: {
    title: "LIMIT CODE STUDIO — รับทำเว็บไซต์ แอป และระบบหลังบ้าน",
    description:
      "ช่วยวางแผน ออกแบบ และพัฒนาระบบดิจิทัลให้ธุรกิจใช้งานได้จริง ตั้งแต่เว็บทั่วไป เว็บขายของ ระบบจอง ไปจนถึงระบบหลังบ้านเฉพาะทาง",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${thai.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
