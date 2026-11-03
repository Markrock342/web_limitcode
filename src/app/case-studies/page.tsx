import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CaseStudyIndexView } from "@/components/case-studies/CaseStudyViews";
import { CASE_STUDIES, CASE_STUDIES_PATH, caseStudyPath, caseStudyLabels } from "@/lib/case-studies";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = pageMetadata({ title: "กรณีศึกษาผลงานจริง — ระบบจอง แพลตฟอร์มบริการ และ AI", description: caseStudyLabels.th.intro, path: CASE_STUDIES_PATH });

export default function CaseStudiesPage() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: caseStudyLabels.th.tag, itemListElement: CASE_STUDIES.map((study, index) => ({ "@type": "ListItem", position: index + 1, name: study.copy.th.title, url: `${SITE_URL}${caseStudyPath(study.slug)}` })) }} /><Navbar /><CaseStudyIndexView /><Footer /></>;
}
