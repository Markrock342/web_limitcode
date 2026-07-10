import { FreshPricingPage } from "@/components/demos/freshfold/pages/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FreshFold Laundry — แพ็กเกจ CMS",
  description: "เปิดปิดแพ็กเกจและแก้ราคาบริการซักรีด",
  path: "/demo/laundry-ops/pricing",
});

export default function Page() {
  return <FreshPricingPage />;
}
