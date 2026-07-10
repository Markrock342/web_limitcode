import { MediBookPage } from "@/components/demos/medislot/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MediSlot — จองคิว",
  description: "เลือกบริการ วัน และช่วงเวลาจองคิวคลินิก",
  path: "/demo/clinic-admin/book",
});

export default function Page() {
  return <MediBookPage />;
}
