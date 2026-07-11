import { PawConfirmPage } from "@/components/demos/pawcare/pages/ConfirmPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "PawCare — ยืนยันนัด", description: "ยืนยันการจองคิว PawCare Vet Clinic", path: "/demo/pet-clinic/confirm" });
export default function Page() { return <PawConfirmPage />; }
