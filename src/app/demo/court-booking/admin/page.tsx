import { SmashAdminPage } from "@/components/demos/smashlane/pages/AdminPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — คิวจัดคอร์ท",
  description: "หลังบ้านจัดคอร์ท",
  path: "/demo/court-booking/admin",
});

export default function Page() {
  return <SmashAdminPage />;
}
