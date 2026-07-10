import { DemoChrome } from "@/components/DemoChrome";
import { ShineAutoProvider } from "@/components/demos/shineauto/store";
import { ShineAutoShell } from "@/components/demos/shineauto/ShineAutoShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("auto-detail")!;

export default function AutoDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <ShineAutoProvider>
        <ShineAutoShell>{children}</ShineAutoShell>
      </ShineAutoProvider>
    </DemoChrome>
  );
}
