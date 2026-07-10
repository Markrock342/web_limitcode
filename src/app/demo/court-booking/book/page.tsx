import { SmashBookPage } from "@/components/demos/smashlane/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — จองคอร์ท",
  description: "เลือกวันและช่วงเวลาจองคอร์ท",
  path: "/demo/court-booking/book",
});

export default function Page() {
  return <SmashBookPage />;
}
