import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell sidebar={<AppSidebar />} header={<span>广莫</span>}>
      {children}
    </AppShell>
  );
}
