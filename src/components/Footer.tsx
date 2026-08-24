import Link from "next/link";
import { BRAND, CONTACT, LINE_ID, LINE_URL } from "@/lib/site";
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
                <li><Link href="/#services" className="hover:text-brand-700">ระบบจองและคิว</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">CRM / Job Order</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">Admin Dashboard</Link></li>
                <li><Link href="/#services" className="hover:text-brand-700">ระบบ AI ธุรกิจ</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">ผลงาน</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/showcase" className="hover:text-brand-700">รวมตัวอย่างทั้งหมด</Link></li>
                <li><Link href="/#clients" className="hover:text-brand-700">ลูกค้าของเรา</Link></li>
                <li><Link href="/demo/court-booking" className="hover:text-brand-700">SmashLane จองสนาม</Link></li>
                <li><Link href="/demo/field-crm" className="hover:text-brand-700">GuardNest CRM</Link></li>
                <li><Link href="/demo/ai-cms" className="hover:text-brand-700">NovaOracle AI</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">ติดต่อ</p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/contact" className="hover:text-brand-700">ติดต่อเรา</Link></li>
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-brand-700">
                    โทร{CONTACT.personThai} {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.pageFacebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700"
                  >
                    {CONTACT.pageFacebookName}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.facebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700"
                  >
                    Facebook {CONTACT.person}
                  </a>
                </li>
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
          <p>ออกแบบและพัฒนาโดยฟรีแลนซ์ LIMIT CODE STUDIO</p>
        </div>
      </Container>
    </footer>
  );
}
