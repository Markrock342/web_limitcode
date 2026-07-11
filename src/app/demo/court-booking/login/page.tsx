import { SmashLoginPage } from "@/components/demos/smashlane/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — เข้าสู่ระบบ",
  description: "เข้าสู่ระบบเดโม SmashLane Arena",
  path: "/demo/court-booking/login",
});

export default function Page() {
  return <SmashLoginPage />;
}
