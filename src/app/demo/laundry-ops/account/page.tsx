import { FreshAccountPage } from "@/components/demos/freshfold/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "FreshFold — รายการของฉัน", description: "ติดตามงานซักของสมาชิก FreshFold", path: "/demo/laundry-ops/account" });
export default function Page() { return <FreshAccountPage />; }
