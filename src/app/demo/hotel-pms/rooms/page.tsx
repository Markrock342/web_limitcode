import { StayRoomsPage } from "@/components/demos/staynest/pages/RoomsPage";
import { StayStaffOnly } from "@/components/demos/staynest/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "StayNest — ห้องพัก",
  description: "กริดสถานะห้อง ว่าง มีแขก สกปรก ซ่อมบำรุง",
  path: "/demo/hotel-pms/rooms",
});

export default function Page() {
  return <StayStaffOnly><StayRoomsPage /></StayStaffOnly>;
}
