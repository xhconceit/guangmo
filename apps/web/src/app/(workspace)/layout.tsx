import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell sidebar={<AppSidebar />}>
      {children}
    </AppShell>
  );
}
