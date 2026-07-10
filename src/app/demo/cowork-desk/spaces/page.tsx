import { NestSpacesPage } from "@/components/demos/nestdesk/pages/SpacesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NestDesk Cowork — แคตตาล็อกพื้นที่",
  description: "รายการ Hot Desk และห้องประชุม พร้อมความจุและราคา",
  path: "/demo/cowork-desk/spaces",
});

export default function Page() {
  return <NestSpacesPage />;
}
