import { ShineLoginPage } from "@/components/demos/shineauto/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "ShineAuto Detail — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม ShineAuto Detail", path: "/demo/auto-detail/login" });
export default function Page() { return <ShineLoginPage />; }
