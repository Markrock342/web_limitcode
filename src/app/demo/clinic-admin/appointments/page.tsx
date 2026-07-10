import { MediAppointmentsPage } from "@/components/demos/medislot/pages/AppointmentsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — นัดหมาย",
  description: "รายการนัดหมายและอัปเดตสถานะมาแล้ว/ไม่มา",
  path: "/demo/clinic-admin/appointments",
});

export default function Page() {
  return <MediAppointmentsPage />;
}
