import { BrightSchedulePage } from "@/components/demos/brightslot/pages/SchedulePage";
import { BrightStaffOnly } from "@/components/demos/brightslot/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrightSlot Tutor — ตารางจอง",
  description: "อนุมัติหรือยกเลิกคำขอจองคาบ",
  path: "/demo/tutor-admin/schedule",
});

export default function Page() {
  return <BrightStaffOnly><BrightSchedulePage /></BrightStaffOnly>;
}
