import { NestBookPage } from "@/components/demos/nestdesk/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NestDesk Cowork — จองพื้นที่",
  description: "จอง Hot Desk หรือห้องประชุม พร้อมเลือกวันและช่วงเวลา",
  path: "/demo/cowork-desk/book",
});

export default function Page() {
  return <NestBookPage />;
}
