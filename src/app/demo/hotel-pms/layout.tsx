import { DemoChrome } from "@/components/DemoChrome";
import { StayNestProvider } from "@/components/demos/staynest/store";
import { StayNestShell } from "@/components/demos/staynest/StayNestShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("hotel-pms")!;

export default function HotelPmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <StayNestProvider>
        <StayNestShell>{children}</StayNestShell>
      </StayNestProvider>
    </DemoChrome>
  );
}
