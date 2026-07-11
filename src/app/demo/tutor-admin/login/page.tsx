import { BrightLoginPage } from "@/components/demos/brightslot/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "BrightSlot Tutor — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม BrightSlot Tutor", path: "/demo/tutor-admin/login" });

export default function Page() {
  return <BrightLoginPage />;
}
