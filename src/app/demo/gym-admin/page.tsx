import { IronHomePage } from "@/components/demos/ironpulse/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("gym-admin")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ภาพรวม`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบฟิตเนส", "สมาชิก", "Check-in", demo.name],
});

export default function Page() {
  return <IronHomePage />;
}
