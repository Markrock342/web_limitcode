import { IronClassesPage } from "@/components/demos/ironpulse/pages/ClassesPage";
import { IronStaffOnly } from "@/components/demos/ironpulse/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IronPulse — คลาส",
  description: "ตารางคลาสและจองที่นั่ง",
  path: "/demo/gym-admin/classes",
});

export default function Page() {
  return <IronStaffOnly><IronClassesPage /></IronStaffOnly>;
}
