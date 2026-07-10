import { MediAdminPage } from "@/components/demos/medislot/pages/AdminPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — แอดมิน",
  description: "ภาพรวมหลังบ้านคลินิก MediSlot",
  path: "/demo/clinic-admin/admin",
});

export default function Page() {
  return <MediAdminPage />;
}
