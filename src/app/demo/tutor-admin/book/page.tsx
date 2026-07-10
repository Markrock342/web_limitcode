import { BrightBookPage } from "@/components/demos/brightslot/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BrightSlot Tutor — จองคาบ",
  description: "ผู้ปกครองเลือกวิชา ติวเตอร์ และช่วงเวลา",
  path: "/demo/tutor-admin/book",
});

export default function Page() {
  return <BrightBookPage />;
}
