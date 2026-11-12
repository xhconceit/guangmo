import type { ReactNode } from "react";

type AppShellProps = {
  sidebar: ReactNode;
  header?: ReactNode;
  children: ReactNode;
};

export function AppShell({ sidebar, header, children }: AppShellProps) {
  return (
    <div
      className="
        grid h-dvh overflow-hidden
        grid-cols-workspace
        gap-panel-gap
        bg-outer
        p-frame-gap max-sm:p-1
        max-sm:[--header-height:48px]
    "
    >
      <aside
        className="
          min-h-0 overflow-y-auto
    rounded-panel bg-surface
    px-1 py-2"
      >
        {sidebar}
      </aside>

      <div
        className="
        flex min-w-0 min-h-0  flex-col
        rounded-panel bg-surface
      "
      >
        {header != null && (
          <header
            className="
          flex min-h-header
          items-center justify-between
          px-page-inset max-sm:px-3
          "
          >
            {header}
          </header>
        )}
        <main
          className="
            m-0 w-full min-h-0 min-w-0 max-w-none flex-1
            overflow-y-auto
            px-page-inset max-sm:px-3
            py-6 max-sm:py-4
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
