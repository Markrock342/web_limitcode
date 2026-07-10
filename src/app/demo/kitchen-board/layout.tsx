import { DemoChrome } from "@/components/DemoChrome";
import { TableFlowProvider } from "@/components/demos/tableflow/store";
import { TableFlowShell } from "@/components/demos/tableflow/TableFlowShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("kitchen-board")!;

export default function KitchenBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <TableFlowProvider>
        <TableFlowShell>{children}</TableFlowShell>
      </TableFlowProvider>
    </DemoChrome>
  );
}
