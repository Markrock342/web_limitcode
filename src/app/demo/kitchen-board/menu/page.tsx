import { TableMenuPage } from "@/components/demos/tableflow/pages/MenuPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TableFlow — เมนู CMS",
  description: "เปิด/ปิด sold-out และแก้ราคาเมนู",
  path: "/demo/kitchen-board/menu",
});

export default function Page() {
  return <TableMenuPage />;
}
