import { NovaPlansPage } from "@/components/demos/novaoracle/pages/PlansPage";
import { NovaStaffOnly } from "@/components/demos/novaoracle/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NovaOracle AI — แพ็กเกจ",
  description: "เปรียบเทียบแพ็กเกจ Free Pro Business",
  path: "/demo/ai-cms/plans",
});

export default function Page() {
  return <NovaStaffOnly><NovaPlansPage /></NovaStaffOnly>;
}
