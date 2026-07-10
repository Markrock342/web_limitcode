import { TableOrdersPage } from "@/components/demos/tableflow/pages/OrdersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TableFlow — ออเดอร์",
  description: "รายการออเดอร์ทั้งหมดและสถานะ",
  path: "/demo/kitchen-board/orders",
});

export default function Page() {
  return <TableOrdersPage />;
}
