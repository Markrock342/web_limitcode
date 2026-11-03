"use client";

import Image from "next/image";
import Link from "next/link";
import erpPreview from "../../../public/showcase/erp.jpg";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, LineButton, SectionTag } from "@/components/ui";
import { erpServiceCopy } from "@/lib/erp-service";
import { ErpBuyerResources } from "./ErpBuyerResources";

export function ErpServicePageView() {
  const { locale } = useLocale();
  const copy = erpServiceCopy[locale];

  return (
    <main id="main-content" lang={locale === "zh" ? "zh-CN" : locale}>
      <section className="border-b border-slate-200 bg-[#f7f9fc] py-10 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap gap-2 text-sm text-slate-500">
            <Link href="/" className="underline-offset-4 hover:underline">{copy.home}</Link>
            <span aria-hidden>/</span><span aria-current="page">{copy.tag}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionTag>{copy.tag}</SectionTag>
              <h1 className="mt-5 font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] font-bold leading-tight tracking-tight text-ink">
                {copy.heading}<span className="mt-2 block text-brand-700">{copy.headingDetail}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{copy.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <LineButton trackingSource="erp-service">{copy.consult}</LineButton>
                <Link href="/demo/erp" className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4">{copy.demo} →</Link>
              </div>
            </div>
            <figure>
              <Link href="/demo/erp" aria-label={copy.demo} className="block border border-slate-200 bg-white p-2 shadow-sm">
                <Image src={erpPreview} alt={copy.demoAlt} sizes="(max-width:1023px) 100vw, 520px" priority className="h-auto w-full" />
              </Link>
              <figcaption className="mt-3 text-sm text-slate-500">{copy.demoCaption}</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section className="grid gap-8 border-b border-slate-200 pb-14 lg:grid-cols-2">
          <div><h2 className="font-display text-2xl font-bold text-ink">{copy.introTitle}</h2><p className="mt-4 max-w-xl leading-relaxed text-slate-600">{copy.intro}</p></div>
          <div><h2 className="font-display text-xl font-bold text-ink">{copy.fitTitle}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600">{copy.fit.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        <section className="py-14" aria-labelledby="erp-modules">
          <h2 id="erp-modules" className="font-display text-2xl font-bold text-ink">{copy.modulesTitle}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.modulesLead}</p>
          <table className="mt-7 w-full border-collapse text-left text-sm sm:text-base">
            <caption className="sr-only">{copy.modulesTitle}</caption>
            <thead className="bg-slate-50 text-ink"><tr><th scope="col" className="w-[35%] border-y border-slate-200 px-3 py-4 sm:px-5">{copy.moduleColumn}</th><th scope="col" className="border-y border-slate-200 px-3 py-4 sm:px-5">{copy.workflowColumn}</th></tr></thead>
            <tbody>{copy.modules.map((module) => <tr key={module.title}><th scope="row" className="border-b border-slate-200 px-3 py-5 align-top font-semibold text-ink sm:px-5">{module.title}</th><td className="border-b border-slate-200 px-3 py-5 leading-relaxed text-slate-600 sm:px-5">{module.body}</td></tr>)}</tbody>
          </table>
        </section>

        <section className="border-y border-slate-200 py-12">
          <h2 className="font-display text-2xl font-bold text-ink">{copy.approachTitle}</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{copy.steps.map((step, index) => <li key={step.title}><p className="font-mono text-sm text-brand-700">0{index + 1}</p><h3 className="mt-3 font-semibold text-ink">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p></li>)}</ol>
        </section>

        <section className="grid gap-8 py-14 lg:grid-cols-2">
          <div><h2 className="font-display text-2xl font-bold text-ink">{copy.priceTitle}</h2><p className="mt-4 max-w-xl leading-relaxed text-slate-600">{copy.price}</p></div>
          <div><h3 className="text-lg font-semibold text-ink">{copy.prepareTitle}</h3><ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600">{copy.prepare.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        <ErpBuyerResources />
        <section className="border-t border-slate-200 pt-12" aria-labelledby="erp-faq">
          <h2 id="erp-faq" className="font-display text-2xl font-bold text-ink">{copy.faqTitle}</h2>
          <div className="mt-6">{copy.faq.map((item) => <details key={item.q} className="border-b border-slate-200 py-5"><summary className="cursor-pointer font-semibold leading-relaxed text-ink">{item.q}</summary><p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{item.a}</p></details>)}</div>
        </section>
      </Container>

      <section className="border-t border-brand-100 bg-brand-50 py-12 sm:py-16">
        <Container><h2 className="max-w-2xl font-display text-2xl font-bold text-ink">{copy.closingTitle}</h2><p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{copy.closing}</p><div className="mt-6 flex flex-wrap items-center gap-5"><LineButton trackingSource="erp-service-footer">{copy.consult}</LineButton><Link href="/showcase" className="font-semibold text-brand-700 underline underline-offset-4">{copy.works}</Link></div></Container>
      </section>
    </main>
  );
}
