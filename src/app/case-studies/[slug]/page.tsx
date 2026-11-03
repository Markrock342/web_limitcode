import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CaseStudyView } from "@/components/case-studies/CaseStudyViews";
import { CASE_STUDIES, CASE_STUDIES_PATH, CASE_STUDY_DATE, caseStudyLabels, caseStudyPath, getCaseStudy } from "@/lib/case-studies";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() { return CASE_STUDIES.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const base = pageMetadata({ title: study.copy.th.title, description: study.copy.th.intro, path: caseStudyPath(slug) });
  return { ...base, openGraph: { ...base.openGraph, type: "article", images: [{ url: study.image, alt: study.copy.th.title }] }, twitter: { ...base.twitter, images: [study.image] } };
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const url = `${SITE_URL}${caseStudyPath(slug)}`;
  return <><JsonLd data={[
    { "@context": "https://schema.org", "@type": "Article", headline: study.copy.th.title, description: study.copy.th.intro, url, mainEntityOfPage: { "@type": "WebPage", "@id": url }, inLanguage: "th-TH", dateModified: CASE_STUDY_DATE, image: `${SITE_URL}${study.image}`, author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/company-profile` }, publisher: { "@id": `${SITE_URL}/#organization` }, about: { "@type": "WebSite", name: study.name, url: study.url } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: caseStudyLabels.th.tag, item: `${SITE_URL}${CASE_STUDIES_PATH}` }, { "@type": "ListItem", position: 3, name: study.name, item: url }] },
  ]} /><Navbar /><CaseStudyView study={study} /><Footer /></>;
}
