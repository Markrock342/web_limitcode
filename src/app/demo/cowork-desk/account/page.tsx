import { NestAccountPage } from "@/components/demos/nestdesk/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "NestDesk Cowork — บัญชีของฉัน", description: "บัญชีผู้ใช้ NestDesk Cowork", path: "/demo/cowork-desk/account" });
export default function Page() { return <NestAccountPage />; }
