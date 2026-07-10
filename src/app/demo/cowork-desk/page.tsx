import { NestHomePage } from "@/components/demos/nestdesk/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("cowork-desk")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบ coworking", "จองโต๊ะ", "Admin CMS", demo.name],
});

export default function Page() {
  return <NestHomePage />;
}
