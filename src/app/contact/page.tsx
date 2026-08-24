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
  title: "ติดต่อเรา — Mark Kitti คุณมาร์ค",
  description: `ติดต่อ LIMIT CODE STUDIO ผ่าน ${CONTACT.personThai} (${CONTACT.person}) โทร ${CONTACT.phoneDisplay} Facebook หรือ LINE OA ${LINE_ID}`,
  path: "/contact",
  keywords: [
    "ติดต่อ LIMIT CODE STUDIO",
    "Mark Kitti",
    "คุณมาร์ค",
    "โทร 084-265-2544",
    "LINE OA @026iaomj",
    "ฟรีแลนซ์ทำระบบ",
  ],
});

function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONTACT.person,
    alternateName: CONTACT.personThai,
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "LIMIT CODE STUDIO",
    },
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    url: CONTACT.facebookHref,
    sameAs: [CONTACT.facebookHref, LINE_URL],
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd()} />
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-brand-50/70 to-white">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <Container className="py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-soft">
              <span className="size-1.5 rounded-full bg-brand-500" />
              ติดต่อเรา · LIMIT CODE STUDIO
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              คุยกับ{CONTACT.personThai}ได้เลย
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              {CONTACT.person} — ฟรีแลนซ์ Software Studio
              ส่งโจทย์ระบบ ปัญหาที่ทีมเจอ หรือตัวอย่างที่อยากได้มาได้เลย ปรึกษาฟรี
            </p>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <a
                href={CONTACT.phoneHref}
                className="group block rounded-3xl bg-[#0b1f3a] px-7 py-8 text-white shadow-soft transition-transform duration-300 ease-out-quart hover:-translate-y-0.5 sm:px-10 sm:py-10"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-brand-200">
                  <PhoneGlyph className="size-6" />
                </span>
                <p className="mt-6 text-sm font-medium text-white/55">โทร{CONTACT.personThai}</p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  {CONTACT.phoneDisplay}
                </p>
                <p className="mt-4 text-sm text-white/70">
                  กดเบอร์นี้เพื่อโทรออก · {CONTACT.person}
                </p>
              </a>

              <div className="flex flex-col gap-4">
                <a
                  href={CONTACT.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#1877F2] text-white">
                    <FacebookGlyph className="size-6" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-slate-500">Facebook</span>
                    <span className="mt-0.5 block font-display text-xl font-bold text-ink">
                      {CONTACT.person}
                    </span>
                    <span className="mt-1 block text-sm text-brand-700 group-hover:underline">
                      {CONTACT.facebookLabel}
                    </span>
                  </span>
                </a>

                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#06C755]/40 hover:bg-[#06C755]/5"
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#06C755] text-white">
                    <LineGlyph className="size-6" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-slate-500">LINE Official Account</span>
                    <span className="mt-0.5 block font-display text-xl font-bold text-ink">
                      {LINE_ID}
                    </span>
                    <span className="mt-1 block text-sm text-brand-700">ทักมาคุยโจทย์ระบบได้เลย</span>
                  </span>
                </a>

                <LineButton className="mt-1 w-full">ทัก LINE OA: {LINE_ID}</LineButton>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
