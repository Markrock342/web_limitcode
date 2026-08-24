import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, LineButton } from "@/components/ui";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { JsonLd } from "@/components/JsonLd";
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
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-white">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <Container className="py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-soft">
              <span className="size-1.5 rounded-full bg-brand-500" />
              ตัวอย่างระบบ · Live Demo
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              ลูกค้าของเรา และระบบม็อกอัพที่กดลองได้
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              กรองหมวดลูกค้าของเราเพื่อดูเว็บที่ออนไลน์แล้ว เช่น NurseGo KindGo และ Horasard
              ส่วนเดโมม็อกอัพมีแอดมิน/CMS ให้คลิกเล่น การ์ดป้าย Live คือเว็บจริง
            </p>
            <div className="mt-7">
              <LineButton>มีโจทย์ระบบ ทักมาคุยได้เลย</LineButton>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <ShowcaseGrid />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
