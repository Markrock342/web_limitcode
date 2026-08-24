import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/lcs-logo.png";
import {
  CP_ABOUT,
  CP_CONTACT,
  CP_CONTACT_PAGE,
  CP_COVER,
  CP_ENGAGEMENT,
  CP_INDUSTRIES,
  CP_PROBLEMS,
  CP_PROCESS,
  CP_PROJECTS,
  CP_SERVICES,
  CP_TECH,
  CP_WHY,
} from "@/lib/profile";
import { PrintButton } from "./PrintButton";
import "./company-profile.css";

export const metadata: Metadata = {
  title: "Company Profile — LIMIT CODE STUDIO",
  description: CP_COVER.description,
};

/* ---------- building blocks (โทนเอกสารทางการ) ---------- */

function SheetHeader() {
  return (
    <div className="mb-8 flex items-center justify-between border-b-2 border-slate-800 pb-3">
      <span className="flex items-center gap-2.5">
        <span className="relative inline-flex size-7 shrink-0 overflow-hidden rounded-full">
          <Image src={logo} alt="" fill sizes="28px" className="object-cover" loading="eager" />
        </span>
        <span className="font-display text-[11px] font-bold tracking-[0.14em] text-slate-900">
          LIMIT CODE STUDIO
        </span>
      </span>
      <span className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Company Profile
      </span>
    </div>
  );
}

function SheetFooter({ page }: { page: string }) {
  return (
    <div className="absolute inset-x-[18mm] bottom-[10mm] flex items-center justify-between border-t border-slate-300 pt-2.5 text-[9px] text-slate-500">
      <span className="font-display tracking-wider">{CP_CONTACT.websiteDisplay}</span>
      <span>LIMIT CODE STUDIO — Company Profile</span>
      <span className="font-display tracking-wider">หน้า {page} / 09</span>
    </div>
  );
}

function SectionTitle({ no, title, en }: { no: string; title: string; en?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[15px] font-bold text-brand-700">{no}.</span>
        <h2 className="text-[22px] font-bold leading-snug text-slate-900">{title}</h2>
      </div>
      {en ? (
        <p className="ml-[26px] font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {en}
        </p>
      ) : null}
      <div className="ml-[26px] mt-2 h-[2px] w-14 bg-brand-600" />
    </div>
  );
}

function Sheet({
  page,
  children,
}: {
  page: string;
  children: React.ReactNode;
}) {
  return (
    <section className="cp-sheet">
      <div className="px-[18mm] pb-[26mm] pt-[13mm]">
        <SheetHeader />
        {children}
      </div>
      <SheetFooter page={page} />
    </section>
  );
}

const th = "border border-slate-300 bg-slate-100 px-3 py-2 text-left text-[10.5px] font-bold text-slate-700";
const td = "border border-slate-300 px-3 py-2 text-[11px] text-slate-700 align-top";

/* ---------- page ---------- */

export default function CompanyProfilePage() {
  return (
    <div className="cp-root">
      {/* toolbar (ไม่ถูกพิมพ์) */}
      <div className="cp-toolbar fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative inline-flex size-8 overflow-hidden rounded-full ring-1 ring-slate-200">
              <Image src={logo} alt="LIMIT CODE STUDIO" fill sizes="32px" className="object-cover" />
            </span>
            <span className="font-display text-sm font-bold text-slate-900">
              LIMIT<span className="text-brand-600"> CODE</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-700 sm:block"
            >
              กลับหน้าเว็บ
            </Link>
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="cp-pages">
        <p className="cp-hint mx-auto mb-6 max-w-[210mm] text-center text-xs text-slate-500">
          กด “พิมพ์ / บันทึกเป็น PDF” แล้วเลือก Save as PDF เพื่อดาวน์โหลดเป็นไฟล์เอกสาร
        </p>

        {/* ================= PAGE 1 — COVER ================= */}
        <section className="cp-sheet">
          <div className="flex h-full min-h-[297mm] flex-col px-[18mm] py-[16mm]">
            {/* หัวเอกสาร */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-5">
              <span className="flex items-center gap-3">
                <span className="relative inline-flex size-12 overflow-hidden rounded-full">
                  <Image src={logo} alt="LIMIT CODE STUDIO" fill sizes="48px" className="object-cover" priority />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-[17px] font-bold tracking-wide text-slate-900">
                    LIMIT CODE STUDIO
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Software Studio — Web Application • Internal System • Business Workflow
                  </span>
                </span>
              </span>
              <span className="border border-slate-800 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-slate-800">
                Company Profile
              </span>
            </div>

            {/* กลางหน้า */}
            <div className="flex flex-1 flex-col justify-center">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                เอกสารแนะนำบริษัท
              </p>
              <h1 className="mt-3 max-w-[150mm] text-[38px] font-bold leading-[1.25] text-slate-900">
                {CP_COVER.headline}
              </h1>
              <p className="mt-4 text-[16px] font-medium text-slate-700">{CP_COVER.subHeadline}</p>
              <p className="mt-2 font-display text-[11.5px] tracking-wide text-slate-500">{CP_COVER.modules}</p>

              <div className="mt-8 max-w-[140mm] border-l-[3px] border-brand-600 bg-slate-50 px-5 py-4">
                <p className="text-[12.5px] leading-relaxed text-slate-700">{CP_COVER.description}</p>
              </div>

              <p className="mt-5 text-[12px] font-medium text-slate-600">{CP_COVER.statement}</p>
            </div>

            {/* ท้ายหน้า — ข้อมูลติดต่อแบบตาราง */}
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className={td + " w-1/3"}>
                    <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">Website</p>
                    <p className="font-display font-semibold text-slate-800">{CP_CONTACT.websiteDisplay}</p>
                  </td>
                  <td className={td + " w-1/3"}>
                    <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">ติดต่อ</p>
                    <p className="font-semibold text-slate-800">
                      {CP_CONTACT.person} ({CP_CONTACT.personThai}) • {CP_CONTACT.phoneDisplay}
                    </p>
                  </td>
                  <td className={td + " w-1/3"}>
                    <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">LINE OA</p>
                    <p className="font-display font-semibold text-slate-800">{CP_CONTACT.lineId}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= PAGE 2 — ABOUT ================= */}
        <Sheet page="02">
          <SectionTitle no="1" title={CP_ABOUT.heading} en="About Us" />

          <div className="space-y-3 text-[12.5px] leading-relaxed text-slate-700">
            {CP_ABOUT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <p className="mt-5 border-l-[3px] border-brand-600 bg-slate-50 px-4 py-3 text-[12px] italic leading-relaxed text-slate-600">
            “{CP_ABOUT.marketingPhrase}”
          </p>

          <div className="cp-avoid-break mt-7">
            <p className="mb-3 text-[13px] font-bold text-slate-800">{CP_ABOUT.fitTitle}</p>
            <table className="w-full border-collapse">
              <tbody>
                {[0, 2, 4].map((i) => (
                  <tr key={i}>
                    {[CP_ABOUT.fitList[i], CP_ABOUT.fitList[i + 1]].map((item, j) =>
                      item ? (
                        <td key={j} className={td + " w-1/2"}>
                          <span className="mr-2 font-bold text-brand-700">•</span>
                          {item}
                        </td>
                      ) : (
                        <td key={j} className={td + " w-1/2"} />
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cp-avoid-break mt-7">
            <p className="mb-3 text-[13px] font-bold text-slate-800">แนวทางการทำงานของเรา</p>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  {CP_ABOUT.highlights.slice(0, 2).map((c) => (
                    <td key={c.no} className={td + " w-1/2"}>
                      <span className="font-display text-[13px] font-bold text-brand-700">{c.no}</span>
                      <p className="mt-1 text-[12px] font-semibold text-slate-800">{c.title}</p>
                    </td>
                  ))}
                </tr>
                <tr>
                  {CP_ABOUT.highlights.slice(2, 4).map((c) => (
                    <td key={c.no} className={td + " w-1/2"}>
                      <span className="font-display text-[13px] font-bold text-brand-700">{c.no}</span>
                      <p className="mt-1 text-[12px] font-semibold text-slate-800">{c.title}</p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Sheet>

        {/* ================= PAGE 3 — SERVICES ================= */}
        <Sheet page="03">
          <SectionTitle no="2" title="บริการของเรา" en="Software Solutions" />
          <p className="-mt-2 mb-5 text-[12px] text-slate-600">
            บริการพัฒนาระบบครอบคลุมตั้งแต่หน้าบ้านถึงหลังบ้าน ออกแบบตามโจทย์และ Workflow ของแต่ละองค์กร
          </p>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th + " w-10 text-center"}>ที่</th>
                <th className={th + " w-[38%]"}>บริการ</th>
                <th className={th}>ขอบเขตงาน</th>
              </tr>
            </thead>
            <tbody>
              {CP_SERVICES.map((s, i) => (
                <tr key={s.title} className="cp-avoid-break">
                  <td className={td + " text-center font-display font-semibold text-slate-500"}>
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className={td + " font-display text-[11.5px] font-bold text-slate-900"}>{s.title}</td>
                  <td className={td}>{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>

        {/* ================= PAGE 4 — PROBLEMS ================= */}
        <Sheet page="04">
          <SectionTitle no="3" title={CP_PROBLEMS.heading} en="Problems We Solve" />

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th + " w-1/2"}>ก่อนมีระบบ (Before)</th>
                <th className={th + " w-1/2"}>หลังมีระบบ (After)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>
                  <ul className="space-y-1.5">
                    {CP_PROBLEMS.before.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </td>
                <td className={td + " bg-brand-50/40"}>
                  <ul className="space-y-1.5">
                    {CP_PROBLEMS.after.map((a) => (
                      <li key={a} className="font-medium text-slate-800">
                        • {a}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mb-3 mt-8 text-[13px] font-bold text-slate-800">ตัวอย่างการแก้ปัญหา</p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th + " w-[55%]"}>ปัญหาหน้างาน</th>
                <th className={th}>ระบบที่ตอบโจทย์</th>
              </tr>
            </thead>
            <tbody>
              {CP_PROBLEMS.examples.map((ex) => (
                <tr key={ex.problem} className="cp-avoid-break">
                  <td className={td}>“{ex.problem}”</td>
                  <td className={td + " font-display text-[11px] font-bold text-brand-800"}>{ex.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>

        {/* ================= PAGE 5 — PROJECTS ================= */}
        <Sheet page="05">
          <SectionTitle no="4" title="ผลงานที่ผ่านมา" en="Selected Projects" />

          <div className="space-y-4">
            {CP_PROJECTS.map((p) => (
              <div key={p.name} className="cp-avoid-break border border-slate-300">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-[13px] font-bold text-slate-900">{p.name}</h3>
                    <span className="text-[10px] text-slate-500">{p.category}</span>
                  </div>
                  <span className="font-display text-[9px] font-bold uppercase tracking-wider text-brand-700">
                    {p.label}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[11.5px] leading-relaxed text-slate-700">{p.desc}</p>
                  {p.points ? (
                    <p className="mt-2 text-[10.5px] leading-relaxed text-slate-500">
                      {p.points.join(" • ")}
                    </p>
                  ) : null}
                  {p.note ? <p className="mt-2 text-[10px] italic text-slate-400">{p.note}</p> : null}
                  {p.url ? (
                    <p className="mt-2 font-display text-[10px] font-medium text-brand-700">{p.url}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Sheet>

        {/* ================= PAGE 6 — INDUSTRIES & ENGAGEMENT ================= */}
        <Sheet page="06">
          <SectionTitle no="5" title="กลุ่มอุตสาหกรรมที่รองรับ" en="Industries" />

          <table className="w-full border-collapse">
            <tbody>
              {[0, 2, 4, 6, 8].map((i) => (
                <tr key={i}>
                  {[CP_INDUSTRIES.items[i], CP_INDUSTRIES.items[i + 1]].map((item, j) =>
                    item ? (
                      <td key={j} className={td + " w-1/2"}>
                        <span className="font-semibold text-slate-800">{item.th}</span>
                        <span className="ml-2 font-display text-[10px] text-slate-400">{item.en}</span>
                      </td>
                    ) : (
                      <td key={j} className={td + " w-1/2"} />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[11px] text-slate-500">หมายเหตุ: {CP_INDUSTRIES.note}</p>

          <div className="mt-9">
            <SectionTitle no="6" title={CP_ENGAGEMENT.heading} en="Engagement Model" />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th + " w-[32%]"}>รูปแบบ</th>
                  <th className={th}>รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {CP_ENGAGEMENT.models.map((m) => (
                  <tr key={m.title} className="cp-avoid-break">
                    <td className={td + " font-display text-[11.5px] font-bold text-slate-900"}>{m.title}</td>
                    <td className={td}>{m.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] text-slate-500">
              หมายเหตุ: ประเมินราคาตามขอบเขตงานจริง — ส่ง Requirement เพื่อประเมิน Scope ได้โดยไม่มีค่าใช้จ่าย
            </p>
          </div>
        </Sheet>

        {/* ================= PAGE 7 — PROCESS ================= */}
        <Sheet page="07">
          <SectionTitle no="7" title={CP_PROCESS.heading} en="Development Process" />

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th + " w-12 text-center"}>ขั้น</th>
                <th className={th + " w-[38%]"}>กระบวนการ</th>
                <th className={th}>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {CP_PROCESS.steps.map((s) => (
                <tr key={s.no} className="cp-avoid-break">
                  <td className={td + " text-center font-display text-[12px] font-bold text-brand-700"}>{s.no}</td>
                  <td className={td + " font-display text-[11.5px] font-bold text-slate-900"}>{s.title}</td>
                  <td className={td}>{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cp-avoid-break mt-8 border border-slate-300 bg-slate-50 px-5 py-4">
            <p className="text-[12px] leading-relaxed text-slate-600">
              ทุกโปรเจกต์มีการล็อกขอบเขตงาน (Scope) เป็นลายลักษณ์อักษรก่อนเริ่มพัฒนา
              ส่งมอบ Demo ให้ตรวจเป็นรอบ และทดสอบร่วมกับผู้ใช้จริง (UAT) ก่อนขึ้นระบบ
            </p>
          </div>
        </Sheet>

        {/* ================= PAGE 8 — TECHNOLOGY & WHY US ================= */}
        <Sheet page="08">
          <SectionTitle no="8" title="เทคโนโลยีที่ใช้" en="Technology Stack" />
          <p className="-mt-2 mb-4 text-[11.5px] text-slate-600">{CP_TECH.note}</p>

          <table className="w-full border-collapse">
            <tbody>
              {CP_TECH.groups.map((g) => (
                <tr key={g.name} className="cp-avoid-break">
                  <td className={td + " w-[30%] bg-slate-50 font-display text-[10.5px] font-bold uppercase tracking-wider text-slate-600"}>
                    {g.name}
                  </td>
                  <td className={td + " font-display text-[11px]"}>{g.items.join(" • ")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-9">
            <SectionTitle no="9" title={CP_WHY.heading} en="Why LIMIT CODE" />
            <table className="w-full border-collapse">
              <tbody>
                {[0, 2, 4].map((i) => (
                  <tr key={i}>
                    {[CP_WHY.cards[i], CP_WHY.cards[i + 1]].map((cItem, j) =>
                      cItem ? (
                        <td key={j} className={td + " w-1/2"}>
                          <span className="mr-2 font-bold text-brand-700">✓</span>
                          <span className="font-semibold text-slate-800">{cItem}</span>
                        </td>
                      ) : (
                        <td key={j} className={td + " w-1/2"} />
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 border-l-[3px] border-brand-600 bg-slate-50 px-4 py-3 text-[12px] font-medium leading-relaxed text-slate-700">
              “{CP_WHY.quote}”
            </p>
          </div>
        </Sheet>

        {/* ================= PAGE 9 — CONTACT ================= */}
        <section className="cp-sheet">
          <div className="flex h-full min-h-[297mm] flex-col px-[18mm] pb-[26mm] pt-[13mm]">
            <SheetHeader />

            <div className="flex flex-1 flex-col justify-center">
              <SectionTitle no="10" title={CP_CONTACT_PAGE.heading} en="Contact" />
              <p className="max-w-[130mm] text-[12.5px] leading-relaxed text-slate-700">
                {CP_CONTACT_PAGE.text}
              </p>

              <div className="cp-avoid-break mt-8 max-w-[150mm]">
                <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
                  <span className="relative inline-flex size-11 overflow-hidden rounded-full">
                    <Image src={logo} alt="LIMIT CODE STUDIO" fill sizes="44px" className="object-cover" loading="eager" />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold text-slate-900">LIMIT CODE STUDIO</p>
                    <p className="text-[10.5px] text-slate-500">{CP_COVER.positioning}</p>
                  </div>
                </div>

                <table className="mt-0 w-full border-collapse">
                  <tbody>
                    {[
                      ["ผู้ติดต่อ", `${CP_CONTACT.person} (${CP_CONTACT.personThai}) • โทร ${CP_CONTACT.phoneDisplay}`],
                      ["LINE Official Account", CP_CONTACT.lineId],
                      ["Website", CP_CONTACT.websiteDisplay],
                      ["Facebook ส่วนตัว", CP_CONTACT.facebookLabel],
                      ["Facebook Page", CP_CONTACT.pageFacebookLabel],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className={td + " w-[38%] bg-slate-50 font-bold text-slate-600"}>{label}</td>
                        <td className={td + " font-medium text-slate-800"}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="mt-5 text-[11px] leading-relaxed text-slate-500">
                  ยินดีนำเสนอรายละเอียดระบบ ตัวอย่างผลงาน และประเมินขอบเขตงานเพิ่มเติม
                  ตามความต้องการขององค์กรของท่าน
                </p>
              </div>
            </div>

            <SheetFooter page="09" />
          </div>
        </section>
      </div>
    </div>
  );
}
