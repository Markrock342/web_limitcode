"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { erpServiceCopy, ERP_SERVICE_PATH } from "@/lib/erp-service";

export function ErpServiceTeaser() {
  const { locale } = useLocale();
  const copy = erpServiceCopy[locale];
  return (
    <div className="mt-10 grid gap-5 border-y border-brand-100 bg-brand-50/60 px-5 py-7 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center">
      <div><h3 className="font-display text-xl font-bold text-ink">{copy.teaserTitle}</h3><p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{copy.teaser}</p></div>
      <Link href={ERP_SERVICE_PATH} className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4">{copy.readService} →</Link>
    </div>
  );
}
