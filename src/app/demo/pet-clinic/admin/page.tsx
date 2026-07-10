import { PawAdminPage } from "@/components/demos/pawcare/pages/AdminPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PawCare Vet — แอดมิน",
  description: "KPI และทางลัดหลังบ้านคลินิกสัตว์เลี้ยง",
  path: "/demo/pet-clinic/admin",
});

export default function Page() {
  return <PawAdminPage />;
}
