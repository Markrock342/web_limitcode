import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ShowcasePageView } from "@/components/showcase/ShowcasePageView";
import { pageMetadata, showcaseItemListJsonLd } from "@/lib/seo";
import { SYSTEM_DEMOS } from "@/lib/demos";

export const metadata = pageMetadata({
  title: "ตัวอย่างระบบ — Web App และระบบหลังบ้าน",
  description: `ดูงานลูกค้าจริงอย่าง NurseGo KindGo Horasard และตัวอย่างระบบม็อกอัพ ${SYSTEM_DEMOS.length} ธุรกิจจาก LIMIT CODE STUDIO ที่กดลองใช้ได้จริง`,
  path: "/showcase",
  keywords: [
    "ตัวอย่างระบบจอง",
    "ตัวอย่าง Admin Dashboard",
    "ตัวอย่าง Web App",
    "ตัวอย่างระบบหลังบ้าน",
    "LIMIT CODE STUDIO",
  ],
});

export default function ShowcasePage() {
  return (
    <>
      <JsonLd data={showcaseItemListJsonLd()} />
      <Navbar />
      <ShowcasePageView />
      <Footer />
    </>
  );
}
