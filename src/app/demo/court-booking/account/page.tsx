import { SmashAccountPage } from "@/components/demos/smashlane/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — บัญชีของฉัน",
  description: "ดูและจัดการรายการจองคอร์ท",
  path: "/demo/court-booking/account",
});

export default function Page() {
  return <SmashAccountPage />;
}
