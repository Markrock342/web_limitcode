import { SmashSuccessPage } from "@/components/demos/smashlane/pages/SuccessPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — จองสำเร็จ",
  description: "ยืนยันการจองคอร์ท",
  path: "/demo/court-booking/success",
});

export default function Page() {
  return <SmashSuccessPage />;
}
