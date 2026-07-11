import { BrightStudentsPage } from "@/components/demos/brightslot/pages/StudentsPage";
import { BrightStaffOnly } from "@/components/demos/brightslot/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrightSlot Tutor — นักเรียน",
  description: "จัดการรายชื่อนักเรียน",
  path: "/demo/tutor-admin/students",
});

export default function Page() {
  return <BrightStaffOnly><BrightStudentsPage /></BrightStaffOnly>;
}
