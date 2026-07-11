import { VenueQuotesPage } from "@/components/demos/venuehive/pages/QuotesPage";
import { VenueStaffOnly } from "@/components/demos/venuehive/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VenueHive — ใบเสนอราคา",
  description: "จัดการสถานะใบเสนอราคา",
  path: "/demo/venue-booking/quotes",
});

export default function Page() {
  return <VenueStaffOnly><VenueQuotesPage /></VenueStaffOnly>;
}
