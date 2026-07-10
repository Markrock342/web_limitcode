import { GuardQuotesPage } from "@/components/demos/guardnest/pages/QuotesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — ใบเสนอราคา",
  description: "อนุมัติและเปลี่ยนสถานะใบเสนอราคา",
  path: "/demo/field-crm/quotes",
});

export default function Page() {
  return <GuardQuotesPage />;
}
