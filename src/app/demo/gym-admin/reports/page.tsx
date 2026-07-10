import { IronReportsPage } from "@/components/demos/ironpulse/pages/ReportsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IronPulse — รายงาน",
  description: "KPI สมาชิก คลาส และแพ็กเกจ",
  path: "/demo/gym-admin/reports",
});

export default function Page() {
  return <IronReportsPage />;
}
