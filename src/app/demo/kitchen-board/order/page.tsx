import { TableOrderPage } from "@/components/demos/tableflow/pages/OrderPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "TableFlow — สั่งอาหาร", description: "หน้าสั่งอาหารสำหรับลูกค้าร้าน", path: "/demo/kitchen-board/order" });
export default function Page() { return <TableOrderPage />; }
