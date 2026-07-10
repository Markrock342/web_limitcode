import { StayHomePage } from "@/components/demos/staynest/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("hotel-pms")!;

export const metadata = pageMetadata({
  title: `${demo.name} — บอร์ดวันนี้`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบโรงแรม", "PMS", "Housekeeping", demo.name],
});

export default function Page() {
  return <StayHomePage />;
}
