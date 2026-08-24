import Link from "next/link";
import { CONTACT, LINE_ID } from "@/lib/site";
import { Container, FacebookGlyph, LineButton, LineGlyph, PhoneGlyph } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Typewriter } from "@/components/Typewriter";

const HELP = [
  "อยากได้เว็บไซต์บริษัท หน้าแลนดิ้ง หรือเว็บที่ลูกค้าเข้ามาใช้",
  "อยากได้ระบบจอง CRM Dashboard หรือหลังบ้านทีม",
  "งานยังอยู่บน LINE / Excel แล้วอยากให้เป็นของใช้จริง",
];

const PROMPTS = ["ส่งโจทย์มาได้เลย", "เว็บก็ทำ ระบบก็ทำ", "ทัก LINE OA ได้ทันที"];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-[#0b1f3a] py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-200">contact.init()</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              <Typewriter phrases={PROMPTS} className="text-white" />
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/70">
              เว็บไซต์ก็รับ ระบบก็รับ — ส่งตัวอย่างที่อยากได้ หรือเล่างานที่ทำอยู่ตอนนี้มาได้เลย
              ทีม 3 คน ช่วยประเมินแนวทางเบื้องต้นให้ครับ
            </p>
            <ul className="mt-6 space-y-2.5">
              {HELP.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-white/80">
                  <Icon name="check" className="size-4 shrink-0 text-brand-300" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <span className="status-run" />
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center bg-[#06C755] text-white">
                  <LineGlyph className="size-6" />
                </span>
                <div>
                  <p className="text-sm text-white/55">ช่องทางหลัก · LINE OA</p>
                  <p className="font-display text-2xl font-bold tracking-tight">{LINE_ID}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/55">ปรึกษาฟรี · ตอบไว · เป็นกันเอง</p>
              <LineButton className="mt-5 w-full sm:w-auto">ทัก LINE OA: {LINE_ID}</LineButton>
              <div className="mt-5 space-y-1 text-sm">
                <a href={CONTACT.phoneHref} className="flex min-h-11 items-center gap-2.5 text-white/80 hover:text-white">
                  <PhoneGlyph className="size-4 shrink-0 text-brand-300" />
                  โทร{CONTACT.personThai} {CONTACT.phoneDisplay}
                </a>
                <a
                  href={CONTACT.pageFacebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 text-white/80 hover:text-white"
                >
                  <FacebookGlyph className="size-4 shrink-0 text-brand-300" />
                  {CONTACT.pageFacebookName}
                </a>
                <a
                  href={CONTACT.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 text-white/80 hover:text-white"
                >
                  <FacebookGlyph className="size-4 shrink-0 text-brand-300" />
                  Facebook {CONTACT.person}
                </a>
                <Link href="/contact" className="inline-flex min-h-11 items-center text-brand-200 hover:text-white">
                  เปิดคอนโซลติดต่อทั้งหมด →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
