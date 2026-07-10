import { FreshCustomersPage } from "@/components/demos/freshfold/pages/CustomersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FreshFold Laundry — ลูกค้า",
  description: "รายชื่อลูกค้าและโน้ตความชอบ",
  path: "/demo/laundry-ops/customers",
});

export default function Page() {
  return <FreshCustomersPage />;
}
