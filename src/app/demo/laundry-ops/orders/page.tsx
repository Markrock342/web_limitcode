import { FreshOrdersPage } from "@/components/demos/freshfold/pages/OrdersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FreshFold Laundry — บอร์ดงาน",
  description: "บอร์ดสถานะงานซัก เลื่อนรับแล้ว กำลังซัก พร้อมส่ง ส่งแล้ว",
  path: "/demo/laundry-ops/orders",
});

export default function Page() {
  return <FreshOrdersPage />;
}
