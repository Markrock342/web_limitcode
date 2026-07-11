import { ShineJobsPage } from "@/components/demos/shineauto/pages/JobsPage";
import { ShineStaffOnly } from "@/components/demos/shineauto/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ShineAuto Detail — งานวันนี้",
  description: "สถานะงาน รอคิว / กำลังทำ / เสร็จ",
  path: "/demo/auto-detail/jobs",
});

export default function Page() {
  return <ShineStaffOnly><ShineJobsPage /></ShineStaffOnly>;
}
