import { NovaAccountPage } from "@/components/demos/novaoracle/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "NovaOracle AI — บัญชีของฉัน", description: "ดูบัญชีและสิทธิ์แพ็กเกจ NovaOracle AI", path: "/demo/ai-cms/account" });

export default function Page() {
  return <NovaAccountPage />;
}
