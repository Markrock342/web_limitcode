import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ErpImportGuideView } from "@/components/guides/ErpImportGuideView";
import { ERP_GUIDE_DATE, ERP_GUIDE_PATH, erpGuideCopy } from "@/lib/erp-guide";
import { ERP_SERVICE_PATH } from "@/lib/erp-service";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const copy = erpGuideCopy.th;
const base = pageMetadata({ title: copy.title, description: copy.description, path: ERP_GUIDE_PATH, keywords: ["ตัวอย่างระบบ ERP", "ERP นำเข้า จัดจำหน่าย", "ERP B2B", "ขั้นตอนพัฒนาระบบ ERP"] });

export const metadata = {
  ...base,
  openGraph: { ...base.openGraph, type: "article" as const, publishedTime: ERP_GUIDE_DATE, images: [{ url: "/guides/erp/sales-order.jpg", alt: copy.salesAlt }] },
};

export default function ErpImportGuidePage() {
  const url = `${SITE_URL}${ERP_GUIDE_PATH}`;
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Article", headline: copy.title, description: copy.description, mainEntityOfPage: { "@type": "WebPage", "@id": url }, url, datePublished: ERP_GUIDE_DATE, dateModified: ERP_GUIDE_DATE, inLanguage: "th-TH", image: [`${SITE_URL}/guides/erp/sales-order.jpg`, `${SITE_URL}/guides/erp/landed-cost.jpg`], author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/company-profile` }, publisher: { "@id": `${SITE_URL}/#organization` } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: copy.service, item: `${SITE_URL}${ERP_SERVICE_PATH}` }, { "@type": "ListItem", position: 3, name: copy.tag, item: url }] },
      ]} />
      <Navbar /><ErpImportGuideView /><Footer />
    </>
  );
}
