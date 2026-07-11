import { BrightTutorsPage } from "@/components/demos/brightslot/pages/TutorsPage";
import { BrightStaffOnly } from "@/components/demos/brightslot/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrightSlot Tutor — ติวเตอร์",
  description: "ดูภาระงานติวเตอร์",
  path: "/demo/tutor-admin/tutors",
});

export default function Page() {
  return <BrightStaffOnly><BrightTutorsPage /></BrightStaffOnly>;
}
