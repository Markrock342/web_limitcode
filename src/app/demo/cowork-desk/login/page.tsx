import { NestLoginPage } from "@/components/demos/nestdesk/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "NestDesk Cowork — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม NestDesk Cowork", path: "/demo/cowork-desk/login" });
export default function Page() { return <NestLoginPage />; }
