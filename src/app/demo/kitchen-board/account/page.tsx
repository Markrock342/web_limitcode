import { TableAccountPage } from "@/components/demos/tableflow/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "TableFlow — บัญชีของฉัน", description: "บัญชีสมาชิกและรายการจอง TableFlow", path: "/demo/kitchen-board/account" });
export default function Page() { return <TableAccountPage />; }
