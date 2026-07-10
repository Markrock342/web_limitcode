import { VenueAdminPage } from "@/components/demos/venuehive/pages/AdminPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VenueHive — แอดมิน",
  description: "KPI และทางลัดหลังบ้าน VenueHive",
  path: "/demo/venue-booking/admin",
});

export default function Page() {
  return <VenueAdminPage />;
}
