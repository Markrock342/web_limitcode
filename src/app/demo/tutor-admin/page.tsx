import { BrightHomePage } from "@/components/demos/brightslot/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("tutor-admin")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบกวดวิชา", "จองคลาส", "ติวเตอร์", demo.name],
});

export default function Page() {
  return <BrightHomePage />;
}
