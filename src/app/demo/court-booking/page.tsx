import { SmashHomePage } from "@/components/demos/smashlane/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("court-booking")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
});

export default function Page() {
  return <SmashHomePage />;
}
