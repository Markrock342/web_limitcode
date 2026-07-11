import { FreshLoginPage } from "@/components/demos/freshfold/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "FreshFold — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม FreshFold Laundry", path: "/demo/laundry-ops/login" });
export default function Page() { return <FreshLoginPage />; }
