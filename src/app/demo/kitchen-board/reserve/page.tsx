import { TableReservePage } from "@/components/demos/tableflow/pages/ReservePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TableFlow — จองโต๊ะ",
  description: "จองโต๊ะหน้าร้าน TableFlow Bistro",
  path: "/demo/kitchen-board/reserve",
});

export default function Page() {
  return <TableReservePage />;
}
