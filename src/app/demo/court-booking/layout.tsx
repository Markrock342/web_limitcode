import { DemoChrome } from "@/components/DemoChrome";
import { SmashLaneProvider } from "@/components/demos/smashlane/store";
import { SmashLaneShell } from "@/components/demos/smashlane/SmashLaneShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("court-booking")!;

export default function CourtBookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <SmashLaneProvider>
        <SmashLaneShell>{children}</SmashLaneShell>
      </SmashLaneProvider>
    </DemoChrome>
  );
}
