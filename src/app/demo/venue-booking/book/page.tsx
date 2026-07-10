import { VenueBookPage } from "@/components/demos/venuehive/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VenueHive — ขอจอง",
  description: "เลือกฮอลล์ วัน และส่งคำขอจอง",
  path: "/demo/venue-booking/book",
});

export default function Page() {
  return <VenueBookPage />;
}
