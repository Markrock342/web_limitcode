import Link from "next/link";
import { BRAND, LINE_ID, LINE_URL } from "@/lib/site";
import { Container, LineGlyph } from "./ui";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <Logo className="size-9" />
              <span className="font-display text-lg font-bold tracking-tight text-ink">
                LIMIT<span className="text-brand-600"> CODE</span> STUDIO
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{BRAND.tagline}</p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white"
            >
              <LineGlyph className="size-4" />
              LINE OA: {LINE_ID}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-ink">บริการ</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/#services" className="hover:text-brand-700">เว็บไซต์บริษัท</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">เว็บขายของ</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">ระบบจอง</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">ระบบหลังบ้าน</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">ผลงาน</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/showcase" className="hover:text-brand-700">รวมตัวอย่างทั้งหมด</Link></li>
                <li><Link href="/demo/restaurant" className="hover:text-brand-700">เว็บร้านอาหาร</Link></li>
                <li><Link href="/demo/shop" className="hover:text-brand-700">เว็บขายของ</Link></li>
                <li><Link href="/demo/dashboard" className="hover:text-brand-700">ระบบหลังบ้าน</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">ติดต่อ</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/#contact" className="hover:text-brand-700">ปรึกษาโปรเจกต์</Link></li>
                <li>
                  <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                    LINE OA {LINE_ID}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LIMIT CODE STUDIO</p>
          <p>ออกแบบและพัฒนาโดยทีม LIMIT CODE STUDIO</p>
        </div>
      </Container>
    </footer>
  );
}
