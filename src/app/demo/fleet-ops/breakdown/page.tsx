import { BlueBreakdownPage } from "@/components/demos/blueroute/pages/BreakdownPage";
import { BlueStaffOnly } from "@/components/demos/blueroute/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BlueRoute Fleet — เสียกลางทาง",
  description: "รายการงานเสียกลางทาง เปิด/ปิดงาน",
  path: "/demo/fleet-ops/breakdown",
});

export default function Page() {
  return <BlueStaffOnly><BlueBreakdownPage /></BlueStaffOnly>;
}
