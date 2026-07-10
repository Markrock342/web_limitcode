import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, LineButton } from "@/components/ui";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, showcaseItemListJsonLd } from "@/lib/seo";
import { SYSTEM_DEMOS } from "@/lib/demos";

export const metadata = pageMetadata({
  title: "ตัวอย่างระบบ — Web App และระบบหลังบ้าน",
  description: `ดูตัวอย่างระบบม็อกอัพ ${SYSTEM_DEMOS.length} ธุรกิจจาก LIMIT CODE STUDIO ที่กดลองใช้ได้จริง พร้อมผลงาน Live ที่ deploy แล้ว`,
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
              ระบบม็อกอัพ + เดโมเว็บ กดลองได้
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              แบรนด์ในเดโมเป็นชื่อสมมติทั้งหมด — มีแอดมิน/CMS พร้อมรูปและหลายหน้า เช่น จองสนาม คลินิก ซักรีด Cowork ฮอลล์ คาร์แคร์
              การ์ดที่มีป้าย Live คือเว็บจริงที่ deploy แล้ว
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
