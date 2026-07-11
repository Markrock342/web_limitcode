import { PawAccountPage } from "@/components/demos/pawcare/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "PawCare — นัดของฉัน", description: "ดูนัดหมายสัตว์เลี้ยงใน PawCare", path: "/demo/pet-clinic/account" });
export default function Page() { return <PawAccountPage />; }
