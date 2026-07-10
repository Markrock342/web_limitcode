import { SmashCheckoutPage } from "@/components/demos/smashlane/pages/CheckoutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — ชำระเงิน",
  description: "ชำระเงินจองคอร์ท",
  path: "/demo/court-booking/checkout",
});

export default function Page() {
  return <SmashCheckoutPage />;
}
