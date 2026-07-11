import { GuardLoginPage } from "@/components/demos/guardnest/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "GuardNest Field — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม GuardNest Field", path: "/demo/field-crm/login" });

export default function Page() {
  return <GuardLoginPage />;
}
