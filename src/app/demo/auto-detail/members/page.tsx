import { ShineMembersPage } from "@/components/demos/shineauto/pages/MembersPage";
import { ShineStaffOnly } from "@/components/demos/shineauto/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ShineAuto Detail — สมาชิก",
  description: "สมาชิกสะสมแต้มและระดับสมาชิก",
  path: "/demo/auto-detail/members",
});

export default function Page() {
  return <ShineStaffOnly><ShineMembersPage /></ShineStaffOnly>;
}
