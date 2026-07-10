import { MediSchedulePage } from "@/components/demos/medislot/pages/SchedulePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — ตารางหมอ",
  description: "จัดการบล็อกเวลาและสถานะเปิดรับของแพทย์",
  path: "/demo/clinic-admin/schedule",
});

export default function Page() {
  return <MediSchedulePage />;
}
