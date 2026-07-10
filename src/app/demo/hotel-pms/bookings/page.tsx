import { StayBookingsPage } from "@/components/demos/staynest/pages/BookingsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "StayNest — การจอง",
  description: "รายการจองและสถานะชำระเงิน",
  path: "/demo/hotel-pms/bookings",
});

export default function Page() {
  return <StayBookingsPage />;
}
