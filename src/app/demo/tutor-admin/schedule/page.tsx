import { BrightSchedulePage } from "@/components/demos/brightslot/pages/SchedulePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrightSlot Tutor — ตารางจอง",
  description: "อนุมัติหรือยกเลิกคำขอจองคาบ",
  path: "/demo/tutor-admin/schedule",
});

export default function Page() {
  return <BrightSchedulePage />;
}
