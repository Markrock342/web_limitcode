import { GuardAccountPage } from "@/components/demos/guardnest/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "GuardNest Field — บัญชีของฉัน", description: "ดูรายละเอียดบัญชีผู้ใช้ GuardNest Field", path: "/demo/field-crm/account" });

export default function Page() {
  return <GuardAccountPage />;
}
