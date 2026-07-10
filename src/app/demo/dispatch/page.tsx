import { QuickHomePage } from "@/components/demos/quickdrop/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("dispatch")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบขนส่ง", "Dispatch", "Courier", demo.name],
});

export default function Page() {
  return <QuickHomePage />;
}
