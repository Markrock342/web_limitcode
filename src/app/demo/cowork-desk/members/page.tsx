import { NestMembersPage } from "@/components/demos/nestdesk/pages/MembersPage";
import { NestStaffOnly } from "@/components/demos/nestdesk/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NestDesk Cowork — สมาชิก",
  description: "รายชื่อสมาชิก ต่ออายุและดูสถานะแพ็กเกจ",
  path: "/demo/cowork-desk/members",
});

export default function Page() {
  return <NestStaffOnly><NestMembersPage /></NestStaffOnly>;
}
