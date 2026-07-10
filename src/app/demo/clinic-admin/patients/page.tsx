import { MediPatientsPage } from "@/components/demos/medislot/pages/PatientsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — ผู้ป่วย",
  description: "CMS รายชื่อผู้ป่วยและโน้ตการรักษา",
  path: "/demo/clinic-admin/patients",
});

export default function Page() {
  return <MediPatientsPage />;
}
