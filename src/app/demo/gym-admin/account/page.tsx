import { IronAccountPage } from "@/components/demos/ironpulse/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "IronPulse Gym — บัญชีของฉัน", description: "ดูบัญชีสมาชิกและแพ็กเกจ IronPulse Gym", path: "/demo/gym-admin/account" });

export default function Page() {
  return <IronAccountPage />;
}
