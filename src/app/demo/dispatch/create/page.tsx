import { QuickCreatePage } from "@/components/demos/quickdrop/pages/CreatePage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "QuickDrop — สร้างรายการส่ง", description: "สร้างรายการจัดส่งกับ QuickDrop Logistics", path: "/demo/dispatch/create" });
export default function Page() { return <QuickCreatePage />; }
