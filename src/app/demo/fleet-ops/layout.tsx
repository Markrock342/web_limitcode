import { DemoChrome } from "@/components/DemoChrome";
import { BlueRouteProvider } from "@/components/demos/blueroute/store";
import { BlueRouteShell } from "@/components/demos/blueroute/BlueRouteShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("fleet-ops")!;

export default function FleetOpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <BlueRouteProvider>
        <BlueRouteShell>{children}</BlueRouteShell>
      </BlueRouteProvider>
    </DemoChrome>
  );
}
