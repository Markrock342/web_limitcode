import { StayFrontDeskPage } from "@/components/demos/staynest/pages/FrontDeskPage";
import { StayStaffOnly } from "@/components/demos/staynest/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "StayNest — Front Desk",
  description: "เช็คอิน / เช็คเอาท์แขกวันนี้",
  path: "/demo/hotel-pms/front-desk",
});

export default function Page() {
  return <StayStaffOnly><StayFrontDeskPage /></StayStaffOnly>;
}
