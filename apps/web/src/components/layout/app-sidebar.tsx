"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    href: "/",
    label: "对话",
    shortLabel: "聊",
  },
  {
    href: "/projects",
    label: "项目",
    shortLabel: "项",
  },
  {
    href: "/directions",
    label: "发展方向",
    shortLabel: "向",
  },
  {
    href: "/review",
    label: "每周回看",
    shortLabel: "周",
  },
  {
    href: "/memory",
    label: "记忆",
    shortLabel: "忆",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="app-sidebar" aria-label="主导航">
      {navigation.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className="app-sidebar__link"
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            title={item.label}
          >
            <span aria-hidden="true">{item.shortLabel}</span>
          </Link>
        );
      })}
    </nav>
  );
}
