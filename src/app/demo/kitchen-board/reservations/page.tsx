import { TableReservationsPage } from "@/components/demos/tableflow/pages/ReservationsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TableFlow — รายการจอง",
  description: "จัดการสถานะการจองโต๊ะ",
  path: "/demo/kitchen-board/reservations",
});

export default function Page() {
  return <TableReservationsPage />;
}
