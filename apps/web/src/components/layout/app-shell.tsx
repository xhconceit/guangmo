import type { ReactNode } from "react";
import styles from "./app-shell.module.css";

type AppShellProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
};

export function AppShell({ sidebar, header, children }: AppShellProps) {
  return (
    <div
      className="
        grid min-h-dvh
        grid-cols-[var(--rail-width)_minmax(0, 1fr)]
        gap-[var(--panel-gap)]
        bg-[var(--outer)]
        p-[var(--frame-gap)]
        max-sm:[--frame-gap:4px]
        max-sm:[--page-inset:16px]
    "
    >
      <aside
        className="
          sticky top-[var(--frame-gap)] self-start
          h-[calc(100dvh_-_var(--frame-gap)_*_2)]
      "
      >
        {sidebar}
      </aside>

      <div className={styles.workspace}>
        <header className={styles.header}>{header}</header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
