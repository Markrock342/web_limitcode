"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Container, LineButton, SectionTag } from "@/components/ui";
import { CASE_STUDIES, CASE_STUDIES_PATH, CASE_STUDY_DATE, caseStudyLabels, caseStudyPath, type CaseStudy } from "@/lib/case-studies";
import { htmlLang } from "@/lib/i18n/config";

const linkClass = "inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4";

export function CaseStudyIndexView() {
  const { locale } = useLocale();
  const labels = caseStudyLabels[locale];
  return (
    <main id="main-content" lang={htmlLang(locale)}>
      <Container className="py-10 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-9 text-sm text-slate-500"><Link href="/" className={linkClass}>{labels.home}</Link><span aria-hidden className="px-2">/</span><span aria-current="page">{labels.all}</span></nav>
        <header className="max-w-3xl"><SectionTag>{labels.tag}</SectionTag><h1 className="mt-5 font-display text-[clamp(2rem,1.3rem+2.4vw,3rem)] font-bold leading-tight text-ink">{labels.title}</h1><p className="mt-5 text-lg leading-relaxed text-slate-600">{labels.intro}</p></header>
        <div className="mt-12 divide-y divide-slate-200">
          {CASE_STUDIES.map((study, index) => <article key={study.slug} className="grid gap-6 py-9 first:pt-0 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
            <Link href={caseStudyPath(study.slug)} className="relative block aspect-16/10 overflow-hidden border border-slate-200 bg-slate-50"><Image src={study.image} alt={study.copy[locale].title} fill sizes="(max-width:767px) 100vw, 480px" priority={index === 0} className="object-contain object-top" /></Link>
            <div className="self-center"><p className="text-sm font-semibold text-brand-700">{study.name}</p><h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink"><Link href={caseStudyPath(study.slug)}>{study.copy[locale].title}</Link></h2><p className="mt-4 max-w-xl leading-relaxed text-slate-600">{study.copy[locale].intro}</p><Link href={caseStudyPath(study.slug)} className={`${linkClass} mt-4`}>{labels.read} →</Link></div>
          </article>)}
        </div>
        <p className="max-w-3xl border-t border-slate-200 pt-7 text-sm leading-relaxed text-slate-500">{labels.note}</p>
      </Container>
    </main>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const { locale } = useLocale();
  const copy = study.copy[locale];
  const labels = caseStudyLabels[locale];
  return (
    <main id="main-content" lang={htmlLang(locale)}>
      <Container className="py-10 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap items-center gap-2 text-sm text-slate-500"><Link href="/" className={linkClass}>{labels.home}</Link><span aria-hidden>/</span><Link href={CASE_STUDIES_PATH} className={linkClass}>{labels.all}</Link><span aria-hidden>/</span><span aria-current="page">{study.name}</span></nav>
        <article>
          <header className="max-w-4xl"><SectionTag>{labels.tag}</SectionTag><h1 className="mt-5 font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] font-bold leading-tight tracking-tight text-ink">{copy.title}</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{copy.intro}</p><p className="mt-5 text-sm text-slate-500"><Link href="/company-profile" className="underline underline-offset-4">LIMIT CODE STUDIO</Link> · {labels.reviewed} <time dateTime={CASE_STUDY_DATE}>{new Intl.DateTimeFormat(locale === "th" ? "th-TH" : locale === "zh" ? "zh-CN" : "en-GB", { dateStyle: "long", timeZone: "Asia/Bangkok" }).format(new Date(`${CASE_STUDY_DATE}T12:00:00+07:00`))}</time></p><a href={study.url} target="_blank" rel="noopener noreferrer" data-track-event="work_open" data-track-source="case-study" data-track-item={study.slug} data-track-kind="live" className={`${linkClass} mt-4`}>{labels.live} ↗</a></header>
          <figure className="mt-9"><a href={study.image} target="_blank" rel="noopener noreferrer" aria-label={`${labels.captionLink}: ${study.name}`} className="relative block aspect-16/10 overflow-hidden border border-slate-200 bg-slate-50"><Image src={study.image} alt={copy.title} fill priority sizes="(max-width:1152px) 100vw, 1088px" className="object-contain object-top" /></a><figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">{copy.caption}</figcaption></figure>
          <div className="mt-12 grid gap-10 border-y border-slate-200 py-10 lg:grid-cols-2">
            <section><h2 className="font-display text-2xl font-bold text-ink">{labels.need}</h2><p className="mt-4 max-w-xl leading-relaxed text-slate-600">{copy.need}</p></section>
            <section><h2 className="font-display text-2xl font-bold text-ink">{labels.solution}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600">{copy.solution.map(item => <li key={item}>{item}</li>)}</ul></section>
          </div>
          <section className="py-10"><h2 className="font-display text-2xl font-bold text-ink">{labels.flow}</h2><ol className="mt-6 grid gap-6 sm:grid-cols-3">{copy.flow.map((item, index) => <li key={item} className="border-t border-brand-200 pt-4"><span className="text-sm font-semibold text-brand-700">0{index + 1}</span><p className="mt-2 font-semibold leading-relaxed text-ink">{item}</p></li>)}</ol></section>
          <section className="max-w-3xl"><h2 className="font-display text-2xl font-bold text-ink">{labels.outcome}</h2><p className="mt-4 leading-relaxed text-slate-600">{copy.outcome}</p></section>
          <section className="mt-10 max-w-3xl border border-brand-100 bg-brand-50/60 p-6 sm:p-8"><h2 className="font-display text-xl font-bold text-ink">{labels.erp}</h2><p className="mt-4 leading-relaxed text-slate-600">{copy.erp}</p><Link href="/services/erp" className={`${linkClass} mt-4`}>{labels.service} →</Link></section>
          <aside className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-500"><h2 className="font-semibold text-slate-700">{labels.evidence}</h2><p className="mt-2">{labels.note}</p></aside>
        </article>
        <section className="mt-12 border-t border-slate-200 pt-8" aria-labelledby="related-cases"><h2 id="related-cases" className="font-display text-xl font-bold text-ink">{labels.related}</h2><ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">{CASE_STUDIES.filter(item => item.slug !== study.slug).map(item => <li key={item.slug}><Link href={caseStudyPath(item.slug)} className={linkClass}>{item.name} →</Link></li>)}</ul></section>
      </Container>
      <section className="border-t border-brand-100 bg-brand-50 py-12"><Container><h2 className="max-w-2xl font-display text-2xl font-bold text-ink">{labels.cta}</h2><p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{labels.ctaBody}</p><LineButton className="mt-6" trackingSource={`case-study-${study.slug}`}>{labels.consult}</LineButton></Container></section>
    </main>
  );
}
