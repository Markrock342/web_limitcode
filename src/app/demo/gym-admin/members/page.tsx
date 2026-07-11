import { IronMembersPage } from "@/components/demos/ironpulse/pages/MembersPage";
import { IronStaffOnly } from "@/components/demos/ironpulse/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IronPulse — สมาชิก",
  description: "จัดการสมาชิกและต่ออายุแพ็กเกจ",
  path: "/demo/gym-admin/members",
});

export default function Page() {
  return <IronStaffOnly><IronMembersPage /></IronStaffOnly>;
}
