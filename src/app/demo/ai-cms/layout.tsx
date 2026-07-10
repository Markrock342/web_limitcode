import { DemoChrome } from "@/components/DemoChrome";
import { NovaOracleProvider } from "@/components/demos/novaoracle/store";
import { NovaOracleShell } from "@/components/demos/novaoracle/NovaOracleShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("ai-cms")!;

export default function AiCmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <NovaOracleProvider>
        <NovaOracleShell>{children}</NovaOracleShell>
      </NovaOracleProvider>
    </DemoChrome>
  );
}
