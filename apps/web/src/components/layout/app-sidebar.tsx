"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChatCircleIcon,
  CirclesFourIcon,
  CompassIcon,
  CheckCircleIcon,
  BrainIcon,
  LinkIcon,
} from "@/components/ui/Icon";
import { IconButton } from "../ui/IconButton";

const navigation = [
  { href: "/", label: "对话", icon: ChatCircleIcon },
  { href: "/projects", label: "项目", icon: CirclesFourIcon },
  { href: "/directions", label: "发展方向", icon: CompassIcon },
  { href: "/review", label: "每周回看", icon: CheckCircleIcon },
  { href: "/memory", label: "记忆", icon: BrainIcon },
];
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col">
      <nav className="flex shrink-0 flex-col" aria-label="主导航">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
            group flex size-11 shrink-0 items-center justify-center
            rounded-[var(--radius-nav)] text-secondary
            focus-visible:outline-2 focus-visible:outline-offset-[-2px]
            focus-visible:outline-focus
            "
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              title={item.label}
            >
              <span
                className={[
                  "flex size-9 items-center justify-center",
                  "rounded-[var(--radius-nav)] transition-colors",
                  active
                    ? "bg-selected text-foreground"
                    : "group-hover:bg-hover group-hover:text-foreground",
                ].join(" ")}
              >
                <Icon
                  size={20}
                  weight={active ? "fill" : "regular"}
                  aria-hidden="true"
                ></Icon>
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex shrink-0 flex-col gap-1 pt-3">
        <IconButton size="md" label="已连接的生活" title="已连接的生活">
          <LinkIcon aria-hidden="true" />
        </IconButton>

        <IconButton size="md" label="账户" title="账户">
          <span
            aria-hidden="true"
            data-corner="round"
            className="
          flex size-7 items-center justify-center
          rounded-full bg-selected text-[11px]
          "
          >
            我
          </span>
        </IconButton>
      </div>
    </div>
  );
}
