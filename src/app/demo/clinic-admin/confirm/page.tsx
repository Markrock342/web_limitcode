import { MediConfirmPage } from "@/components/demos/medislot/pages/ConfirmPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — ยืนยันนัด",
  description: "ตรวจสอบและยืนยันการจองคิวคลินิก",
  path: "/demo/clinic-admin/confirm",
});

export default function Page() {
  return <MediConfirmPage />;
}
