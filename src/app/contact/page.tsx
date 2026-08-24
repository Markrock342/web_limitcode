import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Container,
  FacebookGlyph,
  LineButton,
  LineGlyph,
  PhoneGlyph,
} from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { CONTACT, LINE_ID, LINE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ติดต่อเรา — คุณ Mark Project Manager",
  description: `ติดต่อ LIMIT CODE STUDIO ผ่าน ${CONTACT.personThai} (${CONTACT.person}) โทร ${CONTACT.phoneDisplay} Facebook Page หรือ LINE OA ${LINE_ID}`,
  path: "/contact",
  keywords: [
    "ติดต่อ LIMIT CODE STUDIO",
    "Mark Kitti",
    "คุณ Mark",
    "Project Manager",
    "โทร 084-265-2544",
    "LINE OA @026iaomj",
    "เพจทางการ LIMIT CODE STUDIO",
    "ฟรีแลนซ์ทำระบบ",
  ],
});

function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTACT.person,
    alternateName: CONTACT.personThai,
    jobTitle: CONTACT.role,
    worksFor: {
      "@type": "Organization",
      name: "LIMIT CODE STUDIO",
    },
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    url: CONTACT.facebookHref,
    sameAs: [CONTACT.facebookHref, CONTACT.pageFacebookHref, LINE_URL],
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd()} />
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <span aria-hidden className="beam-x top-[120px] [animation-delay:-2s]" />
          <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                contact.console()
              </p>
              <h1 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                คุยกับ {CONTACT.personThai} ตำแหน่ง {CONTACT.role} ได้เลย
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-600">
                {CONTACT.person} · {CONTACT.role} ของทีม {CONTACT.teamSize} คน
                เว็บไซต์ก็ทำ ระบบก็ทำ ส่งโจทย์มาคุยได้เลย ปรึกษาฟรี
              </p>
              <ol className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
                {["01 Requirement", "02 Scope", "03 Build", "04 Deploy"].map((step) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand-500" />
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-[#0b1f3a] p-7 text-white shadow-lift sm:p-8">
              <span className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">primary channel</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex size-12 items-center justify-center bg-[#06C755]">
                  <LineGlyph className="size-6" />
                </span>
                <div>
                  <p className="text-sm text-white/55">LINE Official Account</p>
                  <p className="font-display text-3xl font-bold tracking-tight">{LINE_ID}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">ช่องทางหลักสำหรับคุยโจทย์ ล็อก scope และส่งตัวอย่างระบบ</p>
              <LineButton className="mt-6 w-full">ทัก LINE OA: {LINE_ID}</LineButton>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-4 lg:grid-cols-3">
              <a
                href={CONTACT.phoneHref}
                className="group relative overflow-hidden rounded-3xl bg-[#0b1f3a] px-6 py-7 text-white shadow-soft transition-transform duration-300 ease-out-quart hover:-translate-y-0.5"
              >
                <span className="status-run" />
                <PhoneGlyph className="size-6 text-brand-200" />
                <p className="mt-8 text-sm font-medium text-white/55">โทร{CONTACT.personThai}</p>
                <p className="mt-1 font-display text-3xl font-bold tracking-tight">{CONTACT.phoneDisplay}</p>
                <p className="mt-3 text-sm text-white/70">กดเบอร์นี้เพื่อโทรออก · {CONTACT.person}</p>
              </a>

              <a
                href={CONTACT.pageFacebookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
              >
                <span className="status-run" />
                <span className="inline-flex size-12 items-center justify-center bg-[#1877F2] text-white">
                  <FacebookGlyph className="size-6" />
                </span>
                <p className="mt-5 text-sm font-medium text-slate-500">Facebook Page</p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{CONTACT.pageFacebookLabel}</p>
                <p className="mt-2 text-sm text-brand-700">{CONTACT.pageFacebookName}</p>
              </a>

              <a
                href={CONTACT.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 hover:border-brand-200"
              >
                <span className="status-run" />
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#1877F2] text-white">
                    <FacebookGlyph className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">personal</span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{CONTACT.person}</p>
                  <p className="mt-1 text-sm text-brand-700">{CONTACT.facebookLabel}</p>
                </div>
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
