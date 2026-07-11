import { BrightAdminPage } from "@/components/demos/brightslot/pages/AdminPage";
import { BrightStaffOnly } from "@/components/demos/brightslot/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrightSlot Tutor — แอดมิน",
  description: "ภาพรวมหลังบ้านกวดวิชา",
  path: "/demo/tutor-admin/admin",
});

export default function Page() {
  return <BrightStaffOnly><BrightAdminPage /></BrightStaffOnly>;
}
