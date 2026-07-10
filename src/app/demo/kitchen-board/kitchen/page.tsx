import { TableKitchenPage } from "@/components/demos/tableflow/pages/KitchenPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TableFlow — Kitchen Board",
  description: "กระดานครัวเลื่อนสถานะออเดอร์",
  path: "/demo/kitchen-board/kitchen",
});

export default function Page() {
  return <TableKitchenPage />;
}
