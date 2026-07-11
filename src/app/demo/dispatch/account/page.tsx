import { QuickAccountPage } from "@/components/demos/quickdrop/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "QuickDrop — รายการของฉัน", description: "ติดตามรายการจัดส่งของสมาชิก QuickDrop", path: "/demo/dispatch/account" });
export default function Page() { return <QuickAccountPage />; }
