import { GuardJobsPage } from "@/components/demos/guardnest/pages/JobsPage";
import { GuardStaffOnly } from "@/components/demos/guardnest/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — งานทั้งหมด",
  description: "รายการงานหน้างาน กรองตามสถานะ",
  path: "/demo/field-crm/jobs",
});

export default function Page() {
  return <GuardStaffOnly><GuardJobsPage /></GuardStaffOnly>;
}
