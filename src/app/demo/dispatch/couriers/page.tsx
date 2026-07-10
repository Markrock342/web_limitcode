import { QuickCouriersPage } from "@/components/demos/quickdrop/pages/CouriersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "QuickDrop Logistics — พนักงานส่ง",
  description: "สลับออนไลน์และดูงานค้างไรเดอร์",
  path: "/demo/dispatch/couriers",
});

export default function Page() {
  return <QuickCouriersPage />;
}
