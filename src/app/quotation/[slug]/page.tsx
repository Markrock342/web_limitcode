import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QUOTATIONS, getQuotation, type Quotation, type QuoteTableRow } from "@/lib/quotations";
import { PrintButton } from "./PrintButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const dynamicParams = false;

export function generateStaticParams() {
  return QUOTATIONS.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = getQuotation(slug);
  if (!q) return {};
  return {
    title: `ใบเสนอราคา${q.edition ? ` (${q.edition})` : ""} ${q.docNo} — ${q.projectShort}`,
    robots: { index: false, follow: false },
  };
}

/** Renders **bold** spans inside data strings. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function SectionTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="quote-section-title mb-3 flex items-center gap-2.5 text-[15px] font-bold text-ink">
      <span className="h-5 w-1 shrink-0 rounded-sm bg-[#E8862E]" />
      {n}. {children}
    </h2>
  );
}

const cellBase = "border border-slate-300 px-3 py-2 align-top";
const headCell = `${cellBase} bg-slate-50 text-center text-[12px] font-medium text-slate-400`;

function DataTable({
  head,
  rows,
  totalRow,
  lastColAlign = "right",
  midWidth = "22%",
  lastWidth = "24%",
}: {
  head: QuoteTableRow;
  rows: QuoteTableRow[];
  totalRow?: QuoteTableRow;
  lastColAlign?: "right" | "left";
  midWidth?: string;
  lastWidth?: string;
}) {
  const lastAlign = lastColAlign === "right" ? "text-right" : "text-left";
  return (
    <table className="w-full border-collapse text-[13px] leading-relaxed">
      <thead>
        <tr>
          <th className={headCell}>{head[0]}</th>
          <th className={headCell} style={{ width: midWidth }}>
            {head[1]}
          </th>
          <th className={headCell} style={{ width: lastWidth }}>
            {head[2]}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>
            <td className={cellBase}>
              <Rich text={r[0]} />
            </td>
            <td className={`${cellBase} text-center text-slate-600`}>{r[1]}</td>
            <td className={`${cellBase} ${lastAlign} font-semibold text-ink`}>{r[2]}</td>
          </tr>
        ))}
        {totalRow &&
          (totalRow[1] === "" ? (
            <tr>
              <td colSpan={2} className={`${cellBase} bg-slate-50 text-right font-bold text-ink`}>
                {totalRow[0]}
              </td>
              <td className={`${cellBase} ${lastAlign} bg-slate-50 font-bold text-ink`}>
                <Rich text={totalRow[2]} />
              </td>
            </tr>
          ) : (
            <tr>
              <td className={`${cellBase} bg-slate-50 font-bold text-ink`}>{totalRow[0]}</td>
              <td className={`${cellBase} bg-slate-50 text-center font-bold text-ink`}>{totalRow[1]}</td>
              <td className={`${cellBase} ${lastAlign} bg-slate-50 font-bold text-ink`}>
                <Rich text={totalRow[2]} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function PackageCard({ pkg }: { pkg: Quotation["packages"][number] }) {
  return (
    <section
      className={`break-inside-avoid rounded-2xl border bg-white p-5 ${
        pkg.recommended ? "border-2 border-brand-600" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17px] font-bold text-slate-400">
            {pkg.name}
            {pkg.recommended && (
              <span className="ml-2 align-middle text-[12px] font-bold text-brand-600">แนะนำ</span>
            )}
          </p>
          <p className="mt-0.5 text-[11.5px] text-slate-400">{pkg.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[23px] font-bold leading-none tracking-tight text-slate-300">
            {pkg.price.toLocaleString()}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">{pkg.priceUnit}</p>
        </div>
      </div>
      <ul className="mt-3">
        {pkg.items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 border-b border-slate-100 py-1 text-[12.5px] leading-relaxed text-slate-700 last:border-0"
          >
            <span className="mt-px shrink-0 font-bold text-emerald-600">+</span>
            <span>
              <Rich text={item} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[11.5px] text-slate-500">{pkg.duration}</p>
    </section>
  );
}

export default async function QuotationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = getQuotation(slug);
  if (!q) notFound();

  const infoRows: [string, React.ReactNode, string, React.ReactNode][] = [
    [
      "เลขที่เอกสาร",
      <span key="doc">
        <span className="font-semibold text-ink">{q.docNo}</span>
        {q.edition && <span className="ml-2 text-[12px] font-bold text-[#E8862E]">{q.edition}</span>}
      </span>,
      "วันที่เสนอราคา",
      q.date,
    ],
    ["ผู้เสนอราคา", q.proposer, "ยืนราคา", q.validFor],
    ["ติดต่อผู้เสนอ", q.contact, "เดโมอ้างอิง", q.demoRef ?? "-"],
    ["ลูกค้า", q.client, "ช่องทาง", q.channel],
  ];

  const footerText = `Limit Code Studio · ใบเสนอราคา ${q.docNo} · LINE @026iaomj`;

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      <style>{`
        @page { size: A4; margin: 12mm 11mm 16mm; }
        @media print {
          .quote-footer { position: fixed; bottom: 0; left: 0; right: 0; }
          .quote-section-title { break-after: avoid; }
          .quote-packages { break-before: page; }
        }
      `}</style>

      {/* toolbar — screen only */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[210mm] items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <Link href="/" className="text-xs font-semibold text-brand-600 hover:underline">
              ← limitcode.shop
            </Link>
            <p className="truncate text-sm font-bold text-ink">
              ใบเสนอราคา {q.docNo}
              {q.edition && <span className="ml-1.5 font-medium text-slate-500">({q.edition})</span>}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="print:hidden">
              <LanguageSwitcher size="compact" />
            </span>
            <PrintButton />
          </div>
        </div>
      </div>

      {/* A4 sheet */}
      <main className="mx-auto max-w-[210mm] bg-white px-7 py-8 shadow-lg sm:px-10 print:max-w-none print:px-0 print:py-0 print:shadow-none">
        {/* header */}
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[26px] font-bold tracking-tight text-ink">&lt;/&gt; limitcode</p>
            <p className="mt-1 text-[13px] text-slate-600">Limit Code Studio</p>
          </div>
          <div className="text-right">
            <h1 className="text-[24px] font-bold leading-tight text-ink">ใบเสนอราคา / QUOTATION</h1>
            <p className="mt-1 text-[12px] text-slate-600">{q.subtitle}</p>
          </div>
        </header>

        {/* info table */}
        <table className="mt-5 w-full border-collapse border-t-2 border-t-ink text-[13px] leading-relaxed">
          <tbody>
            {infoRows.map(([l1, v1, l2, v2]) => (
              <tr key={l1}>
                <td className={`${cellBase} w-[17%] font-semibold text-ink`}>{l1}</td>
                <td className={`${cellBase} text-slate-700`}>{v1}</td>
                <td className={`${cellBase} w-[17%] font-semibold text-ink`}>{l2}</td>
                <td className={`${cellBase} w-[19%] text-slate-700`}>{v2}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 1. summary */}
        <section className="mt-7 break-inside-avoid">
          <SectionTitle n={1}>สรุปงาน</SectionTitle>
          <p className="text-[13px] leading-relaxed text-slate-700">
            <Rich text={q.summary} />
          </p>
          {q.demoCallout && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-[13px] text-slate-700">
              {q.demoCallout.label}{" "}
              <a href={q.demoCallout.url} className="font-semibold text-brand-600 underline">
                {q.demoCallout.url}
              </a>
            </div>
          )}
        </section>

        {/* 2. price summary */}
        <section className="mt-7 break-inside-avoid">
          <SectionTitle n={2}>{q.priceTableTitle}</SectionTitle>
          <table className="w-full border-collapse text-[13px] leading-relaxed">
            <thead>
              <tr>
                <th className={`${headCell} w-[26%]`}>แพ็กเกจ</th>
                <th className={headCell}>เหมาะกับ</th>
                <th className={`${headCell} w-[20%]`}>ราคาทั้งสิ้น</th>
              </tr>
            </thead>
            <tbody>
              {q.packages.map((p) => (
                <tr key={p.code}>
                  <td className={`${cellBase} font-bold text-ink`}>
                    {p.name}
                    {p.recommended && <span className="ml-2 text-[11px] font-bold text-brand-600">แนะนำ</span>}
                  </td>
                  <td className={`${cellBase} text-slate-700`}>{p.fitFor}</td>
                  <td className={`${cellBase} text-right font-bold text-ink`}>{p.price.toLocaleString()} บาท</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">{q.priceFootnote}</p>
        </section>

        {/* 3. packages */}
        <section className="quote-packages mt-7">
          <SectionTitle n={3}>รายการที่ได้ในแต่ละแพ็กเกจ</SectionTitle>
          <div className="space-y-5">
            {q.packages.map((p) => (
              <PackageCard key={p.code} pkg={p} />
            ))}
          </div>
        </section>

        {/* 4. client costs */}
        <section className="mt-7 break-inside-avoid">
          <SectionTitle n={4}>{q.clientCosts.title}</SectionTitle>
          <DataTable head={q.clientCosts.head} rows={q.clientCosts.rows} />
        </section>

        {/* 5. monthly */}
        {q.monthly && (
          <section className="mt-7 break-inside-avoid">
            <SectionTitle n={5}>{q.monthly.title}</SectionTitle>
            <DataTable
              head={q.monthly.head}
              rows={q.monthly.rows}
              totalRow={[q.monthly.totalLabel, "", q.monthly.totalValue]}
            />
            <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">{q.monthly.footnote}</p>
          </section>
        )}

        {/* choosing box */}
        {q.choosing && (
          <aside className="mt-6 break-inside-avoid rounded-2xl border border-[#E8862E]/60 bg-[#FFF9F2] px-5 py-4">
            <p className="text-[13.5px] font-bold text-ink">{q.choosing.title}</p>
            <div className="mt-1.5 space-y-1 text-[13px] leading-relaxed text-slate-700">
              {q.choosing.lines.map((line) => (
                <p key={line}>
                  <Rich text={line} />
                </p>
              ))}
            </div>
          </aside>
        )}

        {/* 6. payment */}
        <section className="mt-7 break-inside-avoid">
          <SectionTitle n={6}>{q.payment.title}</SectionTitle>
          <DataTable
            head={q.payment.head}
            rows={q.payment.rows}
            totalRow={q.payment.totalRow}
            lastColAlign="left"
            midWidth="17%"
            lastWidth="40%"
          />
          <div className="mt-2 space-y-0.5 text-[11.5px] leading-relaxed text-slate-500">
            {q.payment.footnotes.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>

          {/* bank box */}
          <div className="mt-4 flex break-inside-avoid items-center gap-4 rounded-2xl border border-slate-200 px-5 py-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-xl border border-[#59328E]/25 bg-[#F4EFFB] text-center">
              <div>
                <p className="text-[15px] font-bold leading-none text-[#59328E]">{q.bank.bankShort}</p>
                <p className="mt-1 text-[8px] leading-none text-[#59328E]/80">{q.bank.bankThai}</p>
              </div>
            </div>
            <div className="space-y-0.5 text-[13px]">
              <p className="text-slate-700">
                ช่องทางชำระเงิน: <strong className="font-bold text-ink">{q.bank.bankLine}</strong>
              </p>
              <p className="text-slate-700">
                เลขที่บัญชี <strong className="text-[17px] font-bold tracking-wide text-[#59328E]">{q.bank.accountNo}</strong>
              </p>
              <p className="text-slate-700">
                ชื่อบัญชี <strong className="font-bold text-ink">{q.bank.accountName}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 7. notes */}
        <section className="mt-7 break-inside-avoid">
          <SectionTitle n={7}>หมายเหตุ</SectionTitle>
          <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-700">
            {q.notes.map((note) => (
              <li key={note}>
                <Rich text={note} />
              </li>
            ))}
          </ul>
        </section>

        {/* signatures */}
        <section className="mt-12 grid break-inside-avoid grid-cols-2 gap-10 pb-6">
          <div className="text-center text-[13px] text-slate-700">
            <div className="mx-auto w-48 border-b border-slate-400" style={{ height: "3.2rem" }} />
            <p className="mt-2">{q.signatures.proposerRole}</p>
            <p className="mt-0.5">{q.signatures.proposerName}</p>
          </div>
          <div className="text-center text-[13px] text-slate-700">
            <div className="mx-auto w-48 border-b border-slate-400" style={{ height: "3.2rem" }} />
            <p className="mt-2">{q.signatures.approverRole}</p>
            <p className="mt-0.5">{q.signatures.approverName}</p>
          </div>
        </section>

        {/* footer — repeats on every printed page */}
        <footer className="quote-footer border-t border-slate-200 bg-white pb-1 pt-2 text-center text-[10.5px] text-slate-500">
          {footerText}
        </footer>
      </main>
    </div>
  );
}
