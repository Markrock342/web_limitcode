import { IronPackagesPage } from "@/components/demos/ironpulse/pages/PackagesPage";
import { IronStaffOnly } from "@/components/demos/ironpulse/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IronPulse — แพ็กเกจ",
  description: "แพ็กเกจ CMS แก้ราคาและโควต้า",
  path: "/demo/gym-admin/packages",
});

export default function Page() {
  return <IronStaffOnly><IronPackagesPage /></IronStaffOnly>;
}
