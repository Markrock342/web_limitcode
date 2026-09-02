"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { QUOTATIONS } from "@/lib/quotations";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function QuotationIndexView() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-xs font-semibold text-brand-600 hover:underline">
            ← limitcode.shop
          </Link>
          <LanguageSwitcher size="compact" />
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink">{t.quote.title}</h1>
        <p className="mt-1 text-sm text-slate-600">{t.quote.hint}</p>
        <div className="mt-6 space-y-3">
          {QUOTATIONS.map((q) => (
            <Link
              key={q.slug}
              href={`/quotation/${q.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <FileText className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-ink">
                  {q.docNo}
                  {q.edition && <span className="ml-2 text-xs font-bold text-[#E8862E]">{q.edition}</span>}
                </span>
                <span className="block truncate text-sm text-slate-600">
                  {q.projectShort} · {q.client}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
