import type { ReactNode } from "react";

type AppShellProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
};

export function AppShell({ sidebar, header, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">{sidebar}</aside>

      <div className="app-shell__workspace">
        <header className="app-shell__header">{header}</header>
      </div>

      <main className="app-shell__content">{children}</main>
    </div>
  );
}
