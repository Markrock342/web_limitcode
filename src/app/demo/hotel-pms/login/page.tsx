import { StayLoginPage } from "@/components/demos/staynest/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "StayNest — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม StayNest Hotel", path: "/demo/hotel-pms/login" });
export default function Page() { return <StayLoginPage />; }
