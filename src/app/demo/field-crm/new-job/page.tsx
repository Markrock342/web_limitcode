import { GuardStaffOnly } from "@/components/demos/guardnest/StaffOnly";
import { GuardNewJobPage } from "@/components/demos/guardnest/pages/NewJobPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "GuardNest Field — สร้างงาน", description: "สร้าง Job Order ใหม่สำหรับทีมหน้างาน", path: "/demo/field-crm/new-job" });

export default function Page() {
  return <GuardStaffOnly><GuardNewJobPage /></GuardStaffOnly>;
}
