import { VenueEventsPage } from "@/components/demos/venuehive/pages/EventsPage";
import { VenueStaffOnly } from "@/components/demos/venuehive/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VenueHive — อีเวนต์",
  description: "อนุมัติ / ปฏิเสธคำขอจองอีเวนต์",
  path: "/demo/venue-booking/events",
});

export default function Page() {
  return <VenueStaffOnly><VenueEventsPage /></VenueStaffOnly>;
}
