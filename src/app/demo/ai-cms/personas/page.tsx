import { NovaPersonasPage } from "@/components/demos/novaoracle/pages/PersonasPage";
import { NovaStaffOnly } from "@/components/demos/novaoracle/StaffOnly";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NovaOracle AI — Personas",
  description: "เปิดปิด Persona และแก้ system prompt",
  path: "/demo/ai-cms/personas",
});

export default function Page() {
  return <NovaStaffOnly><NovaPersonasPage /></NovaStaffOnly>;
}
