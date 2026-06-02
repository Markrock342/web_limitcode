import { DemoChrome } from "@/components/DemoChrome";
import { ShopDemo } from "@/components/demos/ShopDemo";
import { getDemo } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

const demo = getDemo("shop")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ตัวอย่างเว็บขายของออนไลน์`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำเว็บขายของ", "เว็บอีคอมเมิร์ซ", "ร้านค้าออนไลน์", demo.name],
});

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <ShopDemo />
    </DemoChrome>
  );
}
