"use client";

import Image from "next/image";
import Link from "next/link";
import salesOrder from "../../../public/guides/erp/sales-order.jpg";
import landedCost from "../../../public/guides/erp/landed-cost.jpg";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, LineButton, SectionTag } from "@/components/ui";
import { ERP_GUIDE_DATE, erpGuideCopy } from "@/lib/erp-guide";
import { ERP_SERVICE_PATH } from "@/lib/erp-service";
import { ERP_CHECKLIST_PATH } from "@/lib/erp-buyers";

export function ErpImportGuideView() {
  const { locale } = useLocale();
  const copy = erpGuideCopy[locale];
  return (
    <main lang={locale === "zh" ? "zh-CN" : locale} className="py-10 sm:py-16">
      <Container>
        <article className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:underline">{copy.home}</Link><span aria-hidden>/</span><Link href={ERP_SERVICE_PATH} className="hover:underline">{copy.service}</Link><span aria-hidden>/</span><span aria-current="page">{copy.tag}</span>
          </nav>
          <header>
            <SectionTag>{copy.tag}</SectionTag>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,1.3rem+2vw,3rem)] font-bold leading-tight tracking-tight text-ink">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{copy.description}</p>
            <p className="mt-5 text-sm text-slate-500"><Link href="/company-profile" className="underline underline-offset-4">{copy.author}</Link> · <time dateTime={ERP_GUIDE_DATE}>{copy.published}</time></p>
            <p className="mt-7 border border-brand-100 bg-brand-50 px-5 py-4 leading-relaxed text-slate-700">{copy.disclosure}</p>
          </header>

          <section className="mt-12" aria-labelledby="erp-document-flow">
            <h2 id="erp-document-flow" className="font-display text-2xl font-bold text-ink">{copy.flowTitle}</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.flowIntro}</p>
            <ol className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">{copy.steps.map((step, index) => <li key={step.code} className="border-t border-slate-200 pt-5">
              <p className="font-mono text-xs text-brand-700">0{index + 1} · {step.code}</p><h3 className="mt-2 text-lg font-bold text-ink">{step.title}</h3><p className="mt-3 leading-relaxed text-slate-600">{step.body}</p><Link href={step.href} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 underline underline-offset-4">{copy.openStep} →</Link>
            </li>)}</ol>
          </section>

          <section className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="font-display text-2xl font-bold text-ink">{copy.stockTitle}</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.stockBody}</p>
            <figure className="mt-6"><a href="/guides/erp/sales-order.jpg" target="_blank" rel="noopener noreferrer"><Image src={salesOrder} alt={copy.salesAlt} sizes="(max-width:1023px) 100vw, 1024px" className="h-auto w-full border border-slate-200" /></a><figcaption className="mt-3 text-sm leading-relaxed text-slate-500">{copy.salesCaption}</figcaption></figure>
          </section>

          <section className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="font-display text-2xl font-bold text-ink">{copy.costTitle}</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.costBody}</p>
            <figure className="mt-6"><a href="/guides/erp/landed-cost.jpg" target="_blank" rel="noopener noreferrer"><Image src={landedCost} alt={copy.costAlt} sizes="(max-width:1023px) 100vw, 1024px" className="h-auto w-full border border-slate-200" /></a><figcaption className="mt-3 text-sm leading-relaxed text-slate-500">{copy.costCaption}</figcaption></figure>
          </section>

          <section className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="font-display text-2xl font-bold text-ink">{copy.checksTitle}</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-slate-600">{copy.checks.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-5 text-sm leading-relaxed text-slate-500">{copy.limitation}</p>
          </section>

          <section className="mt-12 border border-brand-100 bg-brand-50 p-5 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">{copy.prepareTitle}</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.prepareBody}</p><a href={ERP_CHECKLIST_PATH} download className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4">{copy.download} ↓</a><div className="mt-5 flex flex-wrap items-center gap-5"><LineButton trackingSource="erp-guide">{copy.consult}</LineButton><Link href={ERP_SERVICE_PATH} className="font-semibold text-brand-700 underline underline-offset-4">{copy.serviceLink}</Link></div>
          </section>
        </article>
      </Container>
    </main>
  );
}
