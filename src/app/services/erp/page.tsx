import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ErpServicePageView } from "@/components/services/ErpServicePageView";
import { erpServiceCopy, ERP_SERVICE_PATH } from "@/lib/erp-service";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const copy = erpServiceCopy.th;

export const metadata = pageMetadata({
  title: copy.title,
  description: "รับพัฒนาระบบ ERP สำหรับธุรกิจนำเข้าและจัดจำหน่าย B2B เชื่อมงานขาย จัดซื้อ คลังสินค้า และข้อมูลการเงิน ดูโมดูล เดโม และวิธีประเมินราคากับ LIMIT CODE STUDIO",
  path: ERP_SERVICE_PATH,
  keywords: ["รับทำ ERP", "รับพัฒนาระบบ ERP", "ERP สำหรับธุรกิจนำเข้า", "ERP จัดจำหน่าย B2B", "พัฒนาระบบ ERP ตามความต้องการ"],
});

export default function ErpServicePage() {
  const url = `${SITE_URL}${ERP_SERVICE_PATH}`;
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: copy.title, description: copy.description, url, serviceType: "Custom ERP Development", provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "Country", name: "Thailand" } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: copy.tag, item: url }] },
      ]} />
      <Navbar />
      <ErpServicePageView />
      <Footer />
    </>
  );
}
