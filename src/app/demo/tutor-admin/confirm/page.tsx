import { BrightConfirmPage } from "@/components/demos/brightslot/pages/ConfirmPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "BrightSlot Tutor — ยืนยันการจอง", description: "ตรวจสอบและส่งคำขอจองคาบเรียน", path: "/demo/tutor-admin/confirm" });

export default function Page() {
  return <BrightConfirmPage />;
}
