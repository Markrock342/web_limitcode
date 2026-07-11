import { VenueLoginPage } from "@/components/demos/venuehive/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "VenueHive — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม VenueHive", path: "/demo/venue-booking/login" });
export default function Page() { return <VenueLoginPage />; }
