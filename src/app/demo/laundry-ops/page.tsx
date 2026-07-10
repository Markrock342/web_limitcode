import { FreshHomePage } from "@/components/demos/freshfold/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("laundry-ops")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบซักรีด", "เรียกรับผ้า", "Admin CMS", demo.name],
});

export default function Page() {
  return <FreshHomePage />;
}
