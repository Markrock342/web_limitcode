import { PawBookPage } from "@/components/demos/pawcare/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PawCare Vet — จองคิว",
  description: "เลือกบริการ วัน และช่วงเวลาจองคิวคลินิกสัตว์เลี้ยง",
  path: "/demo/pet-clinic/book",
});

export default function Page() {
  return <PawBookPage />;
}
