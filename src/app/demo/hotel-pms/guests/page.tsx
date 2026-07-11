import { StayGuestsPage } from "@/components/demos/staynest/pages/GuestsPage";
import { StayStaffOnly } from "@/components/demos/staynest/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "StayNest — แขก",
  description: "โปรไฟล์แขกและความชอบ",
  path: "/demo/hotel-pms/guests",
});

export default function Page() {
  return <StayStaffOnly><StayGuestsPage /></StayStaffOnly>;
}
