import { ShineBaysPage } from "@/components/demos/shineauto/pages/BaysPage";
import { ShineStaffOnly } from "@/components/demos/shineauto/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ShineAuto Detail — ตารางเบย์",
  description: "บอร์ดตารางเบย์ว่างและสล็อตจอง",
  path: "/demo/auto-detail/bays",
});

export default function Page() {
  return <ShineStaffOnly><ShineBaysPage /></ShineStaffOnly>;
}
