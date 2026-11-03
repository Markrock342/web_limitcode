"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ERP_CHECKLIST_PATH, erpBuyerCopy } from "@/lib/erp-buyers";
import { ERP_GUIDE_PATH } from "@/lib/erp-guide";

export function ErpBuyerResources() {
  const { locale } = useLocale();
  const copy = erpBuyerCopy[locale];
  return (
    <section id="erp-planning" className="border-t border-slate-200 py-14" aria-labelledby="erp-choice">
      <h2 id="erp-choice" className="font-display text-2xl font-bold text-ink">{copy.title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.intro}</p>
      <table className="mt-7 w-full table-fixed border-collapse text-left text-sm sm:text-base">
        <caption className="sr-only">{copy.title}</caption>
        <thead className="bg-slate-50 text-ink"><tr>
          <th scope="col" className="w-1/4 border-y border-slate-200 px-2 py-4 sm:px-4">{copy.criterion}</th>
          <th scope="col" className="border-y border-slate-200 px-2 py-4 sm:px-4">{copy.packaged}</th>
          <th scope="col" className="border-y border-slate-200 px-2 py-4 sm:px-4">{copy.custom}</th>
        </tr></thead>
        <tbody>{copy.rows.map((row) => <tr key={row.criterion}>
          <th scope="row" className="border-b border-slate-200 px-2 py-4 align-top font-semibold text-ink sm:px-4">{row.criterion}</th>
          <td className="border-b border-slate-200 px-2 py-4 align-top leading-relaxed text-slate-600 sm:px-4">{row.packaged}</td>
          <td className="border-b border-slate-200 px-2 py-4 align-top leading-relaxed text-slate-600 sm:px-4">{row.custom}</td>
        </tr>)}</tbody>
      </table>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div><h3 className="font-display text-xl font-bold text-ink">{copy.costsTitle}</h3><ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600">{copy.costs.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-4 text-sm leading-relaxed text-slate-500">{copy.note}</p></div>
        <div><h3 className="font-display text-xl font-bold text-ink">{copy.checklistTitle}</h3><p className="mt-4 leading-relaxed text-slate-600">{copy.checklistBody}</p><a href={ERP_CHECKLIST_PATH} download className="mt-5 inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4">{copy.download} ↓</a><p className="mt-3 text-sm leading-relaxed text-slate-500">{copy.privacy}</p></div>
      </div>
      <div className="mt-10 border border-brand-100 bg-brand-50/60 p-5 sm:p-7">
        <h3 className="font-display text-xl font-bold text-ink">{copy.guideTitle}</h3><p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{copy.guideBody}</p><Link href={ERP_GUIDE_PATH} className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4">{copy.guideLink} →</Link>
      </div>
    </section>
  );
}
