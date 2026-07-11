import { IronLoginPage } from "@/components/demos/ironpulse/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "IronPulse Gym — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม IronPulse Gym", path: "/demo/gym-admin/login" });

export default function Page() {
  return <IronLoginPage />;
}
