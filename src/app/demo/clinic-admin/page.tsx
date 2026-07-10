import { MediHomePage } from "@/components/demos/medislot/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("clinic-admin")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบนัดหมาย", "คลินิก", "Admin CMS", demo.name],
});

export default function Page() {
  return <MediHomePage />;
}
