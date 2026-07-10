import { PawVetsPage } from "@/components/demos/pawcare/pages/VetsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PawCare Vet — ตารางสัตวแพทย์",
  description: "เปิดปิดรับนัดและบล็อกเวลาสัตวแพทย์",
  path: "/demo/pet-clinic/vets",
});

export default function Page() {
  return <PawVetsPage />;
}
