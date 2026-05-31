import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, LineButton } from "@/components/ui";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";

export const metadata: Metadata = {
  title: "ผลงานตัวอย่าง — LIMIT CODE STUDIO",
  description:
    "รวมตัวอย่างเว็บไซต์หลายแนวจาก LIMIT CODE STUDIO ทั้งเว็บร้านอาหาร เว็บขายของ ระบบจอง ระบบหลังบ้าน และเว็บบริษัท เปิดดูตัวอย่างจริงได้ทันที",
};

export default function ShowcasePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-white">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <Container className="py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-soft">
              <span className="size-1.5 rounded-full bg-brand-500" />
              ผลงานตัวอย่าง · Live Demo
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              เลือกแนวเว็บที่ใช่ แล้วกดดูตัวอย่างจริง
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              เรามีหลายแนวให้เลือกดู ทั้งเว็บร้านอาหาร เว็บขายของ ระบบจอง ระบบหลังบ้าน และเว็บบริษัท
              ทุกตัวอย่างเป็นเดโมที่กดเข้าไปใช้งานได้จริงบนเว็บของทีมเรา
            </p>
            <div className="mt-7">
              <LineButton>ชอบแนวไหน ทักมาคุยได้เลย</LineButton>
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
