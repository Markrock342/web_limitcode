import { PawPatientsPage } from "@/components/demos/pawcare/pages/PatientsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PawCare Vet — สัตว์เลี้ยง",
  description: "CMS ประวัติสัตว์เลี้ยงและโน้ต",
  path: "/demo/pet-clinic/patients",
});

export default function Page() {
  return <PawPatientsPage />;
}
