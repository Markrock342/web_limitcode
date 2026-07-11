import { ShineAccountPage } from "@/components/demos/shineauto/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "ShineAuto Detail — บัญชีของฉัน", description: "บัญชีผู้ใช้ ShineAuto Detail", path: "/demo/auto-detail/account" });
export default function Page() { return <ShineAccountPage />; }
