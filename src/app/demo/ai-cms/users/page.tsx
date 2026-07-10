import { NovaUsersPage } from "@/components/demos/novaoracle/pages/UsersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NovaOracle AI — ผู้ใช้",
  description: "จัดการผู้ใช้และเติมเครดิต",
  path: "/demo/ai-cms/users",
});

export default function Page() {
  return <NovaUsersPage />;
}
