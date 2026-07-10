import { QuickOrdersPage } from "@/components/demos/quickdrop/pages/OrdersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "QuickDrop Logistics — ออเดอร์",
  description: "เลื่อนสถานะและมอบหมายไรเดอร์",
  path: "/demo/dispatch/orders",
});

export default function Page() {
  return <QuickOrdersPage />;
}
