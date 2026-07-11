import { IronBookClassPage } from "@/components/demos/ironpulse/pages/BookClassPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "IronPulse Gym — จองคลาส", description: "จองที่นั่งคลาสฟิตเนส IronPulse Gym", path: "/demo/gym-admin/book-class" });

export default function Page() {
  return <IronBookClassPage />;
}
