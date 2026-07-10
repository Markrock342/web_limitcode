import { QuickZonesPage } from "@/components/demos/quickdrop/pages/ZonesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "QuickDrop Logistics — โซน",
  description: "คิวค้างและส่งสำเร็จแยกตามโซน",
  path: "/demo/dispatch/zones",
});

export default function Page() {
  return <QuickZonesPage />;
}
