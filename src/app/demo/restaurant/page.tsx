import { DemoChrome } from "@/components/DemoChrome";
import { RestaurantDemo } from "@/components/demos/RestaurantDemo";
import { getDemo } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

const demo = getDemo("restaurant")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ตัวอย่างเว็บร้านอาหาร`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำเว็บร้านอาหาร", "เว็บคาเฟ่", "เมนูออนไลน์", "จองโต๊ะ", demo.name],
});

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <RestaurantDemo />
    </DemoChrome>
  );
}
