import { ErpSalesDeskDemo } from "@/components/demos/ErpSalesDeskDemo";
import { DemoChrome } from "@/components/DemoChrome";
import { getDemo } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

const demo = getDemo("erp")!;

export const metadata = pageMetadata({
  title: `${demo.name} — Sales Desk`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำ ERP", "ระบบ CRM B2B", "Sales Dashboard", demo.name],
});

export default function Page() {
  return <DemoChrome demo={demo}><ErpSalesDeskDemo /></DemoChrome>;
}
