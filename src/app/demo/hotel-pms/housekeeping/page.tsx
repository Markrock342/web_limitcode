import { StayHousekeepingPage } from "@/components/demos/staynest/pages/HousekeepingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "StayNest — แม่บ้าน",
  description: "งานแม่บ้านติ๊กเสร็จและอัปเดตสถานะห้อง",
  path: "/demo/hotel-pms/housekeeping",
});

export default function Page() {
  return <StayHousekeepingPage />;
}
