import { NestConfirmPage } from "@/components/demos/nestdesk/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "NestDesk Cowork — ยืนยันการจอง", description: "ยืนยันการจองพื้นที่ NestDesk Cowork", path: "/demo/cowork-desk/confirm" });
export default function Page() { return <NestConfirmPage />; }
