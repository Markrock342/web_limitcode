import { NestAdminPage } from "@/components/demos/nestdesk/pages/AdminPage";
import { NestStaffOnly } from "@/components/demos/nestdesk/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NestDesk Cowork — แอดมินวันนี้",
  description: "ภาพรวมการจองและสมาชิกวันนี้",
  path: "/demo/cowork-desk/admin",
});

export default function Page() {
  return <NestStaffOnly><NestAdminPage /></NestStaffOnly>;
}
