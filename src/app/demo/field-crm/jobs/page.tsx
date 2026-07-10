import { GuardJobsPage } from "@/components/demos/guardnest/pages/JobsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — งานทั้งหมด",
  description: "รายการงานหน้างาน กรองตามสถานะ",
  path: "/demo/field-crm/jobs",
});

export default function Page() {
  return <GuardJobsPage />;
}
