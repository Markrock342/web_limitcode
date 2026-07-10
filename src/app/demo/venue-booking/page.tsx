import { VenueHomePage } from "@/components/demos/venuehive/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("venue-booking")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบจองห้องจัดเลี้ยง", "อีเวนต์", "ใบเสนอราคา", demo.name],
});

export default function Page() {
  return <VenueHomePage />;
}
