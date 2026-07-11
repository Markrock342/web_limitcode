import { QuickLoginPage } from "@/components/demos/quickdrop/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "QuickDrop — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม QuickDrop Logistics", path: "/demo/dispatch/login" });
export default function Page() { return <QuickLoginPage />; }
