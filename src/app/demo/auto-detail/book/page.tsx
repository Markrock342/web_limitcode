import { ShineBookPage } from "@/components/demos/shineauto/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ShineAuto Detail — จองคิว",
  description: "เลือกแพ็กเกจ เบย์ และช่วงเวลาจองคิวล้างรถ",
  path: "/demo/auto-detail/book",
});

export default function Page() {
  return <ShineBookPage />;
}
