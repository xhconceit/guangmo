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
        grid min-h-dvh
        grid-cols-[var(--rail-width)_minmax(0,1fr)]
        gap-[var(--panel-gap)]
        bg-[var(--outer)]
        p-[var(--frame-gap)]
        max-sm:[--frame-gap:4px]
        max-sm:[--page-inset:12px]
        max-sm:[--header-height:48px]
    "
    >
      <aside
        className="
    sticky top-[var(--frame-gap)] self-start
    h-[calc(100dvh_-_var(--frame-gap)_*_2)]
    overflow-y-auto
    rounded-[var(--radius-panel)] bg-surface
    px-1 py-2
      "
      >
        {sidebar}
      </aside>

      <div
        className="
        flex min-w-0 flex-col
        rounded-[var(--radius-panel)] bg-surface
      "
      >
        {header != null && (
          <header
            className="
          flex min-h-[var(--header-height)]
          items-center justify-between
          px-[var(--page-inset)]
          "
          >
            {header}
          </header>
        )}
        <main
          className="
            m-0 w-full min-w-0 max-w-none flex-1
            px-[var(--page-inset)] py-6
            max-sm:py-4
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
