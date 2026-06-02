import { DemoChrome } from "@/components/DemoChrome";
import { CorporateDemo } from "@/components/demos/CorporateDemo";
import { getDemo } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

const demo = getDemo("corporate")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ตัวอย่างเว็บไซต์บริษัท`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำเว็บไซต์บริษัท", "เว็บองค์กร", "เว็บ B2B", demo.name],
});

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <CorporateDemo />
    </DemoChrome>
  );
}
