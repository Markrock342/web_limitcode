import { NovaCreditsPage } from "@/components/demos/novaoracle/pages/CreditsPage";
import { NovaStaffOnly } from "@/components/demos/novaoracle/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "NovaOracle AI — เครดิต", description: "จัดการและจำลองการใช้เครดิต NovaOracle AI", path: "/demo/ai-cms/credits" });

export default function Page() {
  return <NovaStaffOnly><NovaCreditsPage /></NovaStaffOnly>;
}
