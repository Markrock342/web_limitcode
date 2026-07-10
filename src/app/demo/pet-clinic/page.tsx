import { PawHomePage } from "@/components/demos/pawcare/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("pet-clinic")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบคลินิกสัตว์", "จองคิวสัตวแพทย์", "Admin CMS", demo.name],
});

export default function Page() {
  return <PawHomePage />;
}
