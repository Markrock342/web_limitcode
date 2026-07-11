import { VenueAdminPage } from "@/components/demos/venuehive/pages/AdminPage";
import { VenueStaffOnly } from "@/components/demos/venuehive/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VenueHive — แอดมิน",
  description: "KPI และทางลัดหลังบ้าน VenueHive",
  path: "/demo/venue-booking/admin",
});

export default function Page() {
  return <VenueStaffOnly><VenueAdminPage /></VenueStaffOnly>;
}
