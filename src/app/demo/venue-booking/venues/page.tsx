import { VenueVenuesPage } from "@/components/demos/venuehive/pages/VenuesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VenueHive — ห้องจัดเลี้ยง",
  description: "แกลเลอรีฮอลล์ ความจุและราคา",
  path: "/demo/venue-booking/venues",
});

export default function Page() {
  return <VenueVenuesPage />;
}
