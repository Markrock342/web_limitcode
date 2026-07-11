import { ShineConfirmPage } from "@/components/demos/shineauto/pages/AuthPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "ShineAuto Detail — ยืนยันการจอง", description: "ยืนยันการจองคิว ShineAuto Detail", path: "/demo/auto-detail/confirm" });
export default function Page() { return <ShineConfirmPage />; }
