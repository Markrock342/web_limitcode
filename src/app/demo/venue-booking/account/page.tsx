import { VenueAccountPage } from "@/components/demos/venuehive/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "VenueHive — บัญชีของฉัน", description: "บัญชีผู้ใช้ VenueHive", path: "/demo/venue-booking/account" });
export default function Page() { return <VenueAccountPage />; }
