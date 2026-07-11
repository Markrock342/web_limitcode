import { BrightAccountPage } from "@/components/demos/brightslot/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "BrightSlot Tutor — บัญชีของฉัน", description: "ดูคำขอจองคาบและสถานะบัญชี", path: "/demo/tutor-admin/account" });

export default function Page() {
  return <BrightAccountPage />;
}
