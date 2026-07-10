import { PawAppointmentsPage } from "@/components/demos/pawcare/pages/AppointmentsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PawCare Vet — นัดหมาย",
  description: "รายการนัดหมาย เช็คมาแล้ว / ไม่มา",
  path: "/demo/pet-clinic/appointments",
});

export default function Page() {
  return <PawAppointmentsPage />;
}
