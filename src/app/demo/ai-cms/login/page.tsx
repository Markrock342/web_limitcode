import { NovaLoginPage } from "@/components/demos/novaoracle/pages/LoginPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "NovaOracle AI — เข้าสู่ระบบ", description: "เข้าสู่ระบบเดโม NovaOracle AI", path: "/demo/ai-cms/login" });

export default function Page() {
  return <NovaLoginPage />;
}
