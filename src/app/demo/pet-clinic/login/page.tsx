import { PawLoginPage } from "@/components/demos/pawcare/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "PawCare — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม PawCare Vet Clinic", path: "/demo/pet-clinic/login" });
export default function Page() { return <PawLoginPage />; }
