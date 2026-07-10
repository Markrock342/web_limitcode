import { ShineHomePage } from "@/components/demos/shineauto/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("auto-detail")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบจองคิวล้างรถ", "คาร์แคร์", "ดีเทลลิ่ง", demo.name],
});

export default function Page() {
  return <ShineHomePage />;
}
