import { DemoChrome } from "@/components/DemoChrome";
import { IronPulseProvider } from "@/components/demos/ironpulse/store";
import { IronPulseShell } from "@/components/demos/ironpulse/IronPulseShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("gym-admin")!;

export default function GymAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <IronPulseProvider>
        <IronPulseShell>{children}</IronPulseShell>
      </IronPulseProvider>
    </DemoChrome>
  );
}
