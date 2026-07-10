import { BlueLoginPage } from "@/components/demos/blueroute/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BlueRoute Fleet — เข้าสู่ระบบ",
  description: "ล็อกอินเดโมระบบงานซ่อมบำรุงรถ",
  path: "/demo/fleet-ops/login",
});

export default function Page() {
  return <BlueLoginPage />;
}
