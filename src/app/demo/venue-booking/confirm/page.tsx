import { VenueConfirmPage } from "@/components/demos/venuehive/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "VenueHive — ยืนยันคำขอ", description: "ยืนยันคำขอจอง VenueHive", path: "/demo/venue-booking/confirm" });
export default function Page() { return <VenueConfirmPage />; }
