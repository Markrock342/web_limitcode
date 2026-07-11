import { GuardQuotesPage } from "@/components/demos/guardnest/pages/QuotesPage";
import { GuardStaffOnly } from "@/components/demos/guardnest/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — ใบเสนอราคา",
  description: "อนุมัติและเปลี่ยนสถานะใบเสนอราคา",
  path: "/demo/field-crm/quotes",
});

export default function Page() {
  return <GuardStaffOnly><GuardQuotesPage /></GuardStaffOnly>;
}
