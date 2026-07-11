import { IronCheckinPage } from "@/components/demos/ironpulse/pages/CheckinPage";
import { IronStaffOnly } from "@/components/demos/ironpulse/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IronPulse — Check-in",
  description: "Check-in สมาชิกหน้าร้าน",
  path: "/demo/gym-admin/checkin",
});

export default function Page() {
  return <IronStaffOnly><IronCheckinPage /></IronStaffOnly>;
}
