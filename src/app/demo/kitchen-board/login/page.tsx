import { TableLoginPage } from "@/components/demos/tableflow/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "TableFlow — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโมร้านอาหาร", path: "/demo/kitchen-board/login" });
export default function Page() { return <TableLoginPage />; }
