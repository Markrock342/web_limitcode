"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon } from "@/components/Icon";
import { erpServiceCopy, ERP_SERVICE_PATH } from "@/lib/erp-service";
import { ERP_GUIDE_PATH } from "@/lib/erp-guide";

export function ErpServiceTeaser() {
  const { locale } = useLocale();
  const copy = erpServiceCopy[locale];
  return (
    <div className="relative mt-12 grid gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-brand-700 to-brand-600 px-6 py-9 text-white shadow-[0_40px_100px_-40px_rgba(109,40,217,0.7)] sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-28 size-80 animate-aurora rounded-full bg-fuchsia-400/40 blur-[90px]" />
        <div className="absolute -bottom-32 right-10 size-80 animate-aurora rounded-full bg-sky-300/40 blur-[90px] [animation-delay:-8s]" />
      </div>
      <div className="relative">
        <h3 className="font-display text-xl font-bold sm:text-2xl">{copy.teaserTitle}</h3>
        <p className="mt-3 max-w-3xl leading-relaxed text-white/80">{copy.teaser}</p>
      </div>
      <div className="relative flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch">
        <Link
          href={ERP_SERVICE_PATH}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-card transition hover:bg-brand-50"
        >
          {copy.readService}
          <Icon name="arrow" className="size-4" />
        </Link>
        <Link
          href={ERP_GUIDE_PATH}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {locale === "th" ? "ดูตัวอย่างขั้นตอน ERP" : locale === "en" ? "See the ERP workflow" : "查看 ERP 流程示例"}
        </Link>
      </div>
    </div>
  );
}
