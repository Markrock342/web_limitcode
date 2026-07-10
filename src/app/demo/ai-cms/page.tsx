import { NovaHomePage } from "@/components/demos/novaoracle/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("ai-cms")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบ AI", "Credits", "CMS", demo.name],
});

export default function Page() {
  return <NovaHomePage />;
}
