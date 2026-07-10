import { FreshPickupPage } from "@/components/demos/freshfold/pages/PickupPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FreshFold Laundry — เรียกรับผ้า",
  description: "ฟอร์มลูกค้าเรียกรับผ้า เลือกแพ็กเกจและวันรับ",
  path: "/demo/laundry-ops/pickup",
});

export default function Page() {
  return <FreshPickupPage />;
}
