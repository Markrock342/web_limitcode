import { TableHomePage } from "@/components/demos/tableflow/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("kitchen-board")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบร้านอาหาร", "จองโต๊ะ", "Kitchen Board", demo.name],
});

export default function Page() {
  return <TableHomePage />;
}
