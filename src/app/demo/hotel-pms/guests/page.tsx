import { StayGuestsPage } from "@/components/demos/staynest/pages/GuestsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "StayNest — แขก",
  description: "โปรไฟล์แขกและความชอบ",
  path: "/demo/hotel-pms/guests",
});

export default function Page() {
  return <StayGuestsPage />;
}
