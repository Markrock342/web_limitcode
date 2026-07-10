import { GuardCustomersPage } from "@/components/demos/guardnest/pages/CustomersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — ลูกค้า",
  description: "โปรไฟล์ลูกค้าและโน้ตหน้างาน",
  path: "/demo/field-crm/customers",
});

export default function Page() {
  return <GuardCustomersPage />;
}
