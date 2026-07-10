import { QuickSummaryPage } from "@/components/demos/quickdrop/pages/SummaryPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "QuickDrop Logistics — สรุปวัน",
  description: "KPI ประจำวันของคอนโซลจัดส่ง",
  path: "/demo/dispatch/summary",
});

export default function Page() {
  return <QuickSummaryPage />;
}
