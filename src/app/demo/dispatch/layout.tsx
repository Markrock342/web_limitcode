import { DemoChrome } from "@/components/DemoChrome";
import { QuickDropProvider } from "@/components/demos/quickdrop/store";
import { QuickDropShell } from "@/components/demos/quickdrop/QuickDropShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("dispatch")!;

export default function DispatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <QuickDropProvider>
        <QuickDropShell>{children}</QuickDropShell>
      </QuickDropProvider>
    </DemoChrome>
  );
}
