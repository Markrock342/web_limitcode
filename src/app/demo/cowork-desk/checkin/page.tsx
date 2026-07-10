import { NestCheckinPage } from "@/components/demos/nestdesk/pages/CheckinPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NestDesk Cowork — Check-in",
  description: "ค้นหาสมาชิกและเช็คอินวันนี้",
  path: "/demo/cowork-desk/checkin",
});

export default function Page() {
  return <NestCheckinPage />;
}
