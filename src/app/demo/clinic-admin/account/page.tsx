import { MediAccountPage } from "@/components/demos/medislot/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — บัญชีของฉัน",
  description: "ดูนัดหมายของสมาชิก MediSlot Clinic",
  path: "/demo/clinic-admin/account",
});

export default function Page() {
  return <MediAccountPage />;
}
