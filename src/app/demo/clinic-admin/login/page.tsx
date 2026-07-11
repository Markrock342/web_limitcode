import { MediLoginPage } from "@/components/demos/medislot/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — เข้าสู่ระบบ",
  description: "เข้าสู่ระบบเดโม MediSlot Clinic สำหรับสมาชิกและพนักงาน",
  path: "/demo/clinic-admin/login",
});

export default function Page() {
  return <MediLoginPage />;
}
